import Ember from 'ember';
import moment from 'moment';
import URI from 'npm:urijs';
import ENV from 'plenario-explorer/config/environment';
import Node from '../models/node';
import { sensorData, mockNetwork } from '../mirage/sensor-data';

/**
 * Grabs and caches all dataset metadata.
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  io: Ember.inject.service('socket-io'),
  notify: Ember.inject.service(),

  queryRoot: Ember.computed('ajax', function () {
    return this.get('ajax').host;
  }),

  /**
   * For when we want to redirect the user
   * to download the data directly
   * rather than use it in the application
   */
  openInNewTab(endpoint, params) {
    const qString = URI('').addQuery(params).toString();
    window.open(`${this.get('queryRoot')}/v1/api${endpoint}${qString}`);
  },

  camelizeHash(hash) {
    const normalized = {};
    for (const key of Object.keys(hash)) {
      const normalizedKey = Ember.String.underscore(key).camelize();
      normalized[normalizedKey] = hash[key];
    }
    return normalized;
  },

  // Kludge for enabling right-click
  injectExplorerData(route, params, obj) {
    Ember.assign(obj, { explorerData: { route, queryParams: params } });
    return obj;
  },

  init() {
    this._super(...arguments);
    this.set('events', this.get('ajax').request('/datasets'));
    this.set('shapes', this.get('ajax').request('/shapes'));
    // this.set('nodes', this.get('ajax').request('/sensor-networks/ArrayOfThings/nodes'));
  },

  _getMetadata(type) {
    const camelizeHash = this.camelizeHash;
    const injectExplorerData = this.injectExplorerData;
    let route = 'event';
    if (type === 'events') {
      route = 'event';
    } else if (type === 'shapes') {
      route = 'shape';
    }
    return this.get(type).then(doc =>
      doc.objects.map(v =>
        injectExplorerData(
          route,
          undefined,
          camelizeHash(v))),
          function (reason) {
            this.get('notify').error(`Failed to load ${type}. Reason: ${reason}.`);
          }
    );
  },

  /**
   * Return all event metadata objects
   * in the cache.
   * @returns {*}
   */
  allEventMetadata() {
    return this._getMetadata('events');
  },

  /**
   * Return all shape metadata objects
   * in the cache.
   * @returns {*}
   */
  allShapeMetadata() {
    return this._getMetadata('shapes');
  },

  /**
   * Look through metadata cache
   * and return metadata of event dataset with given name
   * if available. Else return null.
   *
   * @param name
   * @returns {*}
   */
  eventMetadata(name) {
    const allEventDatasets = this._getMetadata('events');
    return this._findDataset(name, allEventDatasets);
  },

  /**
   * Look through metadata cache
   * and return metadata of shape dataset with given name
   * if available. Else return null.
   *
   * @param name
   * @returns {*}
   */
  shapeMetadata(name) {
    const allEventDatasets = this._getMetadata('shapes');
    return this._findDataset(name, allEventDatasets);
  },

  allNodeMetadata() {
    const qString = `/sensor-networks/${ENV.networkId}/nodes`;
    return this.get('ajax').request(qString).then((nodeMeta) => {
      nodeMeta.data.map(
        nodeRecord => Node.create({ nodeGeoJSON: nodeRecord })
      );
    });
  },

  getSocketForNode(networkId, nodeId, sensorList) {
    if (ENV['ember-cli-mirage'].enabled) {
      return mockNetwork.getMockSocket(nodeId);
    }
    const io = this.get('io');
    const host = 'ws://streaming.plenar.io';
    const connString = URI(host).addQuery({
      network: networkId,
      nodes: nodeId,
      sensors: sensorList.join(','),
    }).toString();
    return io.socketFor(connString);
  },

  getHistoryFor(nodeId, sensorName, type) {
    const ajax = this.get('ajax');
    const aWeekAgo = moment().subtract(7, 'days').utc().format();
    // Could already be a string.
    // If it's not, we want it to be a comma delimited list
    const typeString = type.toString();

    const params = {
      data: {
        sensors: sensorName,
        node: nodeId,
        feature: typeString,
        function: 'avg',
        start_datetime: aWeekAgo,
      },
    };
    const path = `/sensor-networks/${ENV.networkId}/aggregate`;
    return ajax.request(path, params).then(response => Ember.RSVP.resolve(response.data));
  },

  getSensorObservations(nodeId, networkId, feature, sensor) {
    const params = {
      data: {
        feature,
        nodes: nodeId,
        start_datetime: moment().utc().subtract(1, 'hours').format(),
        end_datetime: moment().utc().format(),
      },
    };
    if (sensor) { params.data.sensors = sensor; }
    const path = `/sensor-networks/${networkId}/query`;
    return this.get('ajax').request(path, params).then(response => response.data);
  },

  getCurationFor(networkId) {
    if (ENV['ember-cli-mirage'].enabled) {
      return sensorData.curation;
    }

    const url = `http://sensor-curation.s3-website-us-east-1.amazonaws.com/${networkId}.json`;
    return this.get('ajax').request(url).then(response => response);
  },

  _findDataset(name, datasets) {
    return datasets.then((dsets) => {
      for (const key of Object.keys(dsets)) {
        const dset = dsets[key];
        if (dset.datasetName === name) {
          return dset;
        }
      }
      return null;
    });
  },

  /**
   * Return timeseries array
   * embedded within event metadata object.
   *
   * @param params
   * @param newTab
   */
  timeseries(params, newTab = false) {
    let paramsCopy = Ember.copy(params);
    paramsCopy = this._translateFilters(paramsCopy);
    const endpoint = '/detail-aggregate';

    if (newTab) {
      this.openInNewTab(endpoint, paramsCopy);
      return undefined;
    }
    const ts = this.get('ajax').request(endpoint, { data: paramsCopy });
    return ts.then(payload => ({
      series: this.prepTimeseries(payload.objects),
      count: payload.count,
    }), (reason) => {
      this.get('notify').error(reason);
      return { error: reason };
    });
  },

  /**
   Takes array of objects of the form [{count: 3, datetime: '2016-12-06'}...]
   Returns array of arrays of the form [[momentJSObject, integer]]
   */
  prepTimeseries(timeseries) {
    const formattedSeries = timeseries.map(ts => [moment(ts.datetime).valueOf(), ts.count]);
    // The chart expects a list of series objects,
    // each with a data attribute that actually holds the timeseries.
    // So construct a list of one such object.
    // NB: name: 'Count' determines chart tooltip.
    // Easy to override if desired.
    return [{ data: formattedSeries, name: 'Count' }];
  },

  /**
   * Return grid response geoJSON.
   *
   * @param params
   * @param newTab
   */
  grid(params, newTab = false) {
    let paramsCopy = Ember.copy(params);
    paramsCopy = this._translateFilters(paramsCopy);
    const endpoint = '/grid';
    if (newTab) {
      this.openInNewTab(endpoint, paramsCopy);
      return undefined;
    }
    const grid = this.get('ajax').request(endpoint, { data: paramsCopy });
    return grid.then(payload => payload, (reason) => {
      this.get('notify').error(reason);
    });
  },

  _translateFilters(params) {
    const paramsCopy = Ember.copy(params);
    if (!paramsCopy.filters) {
      // No filters to transform.
      return paramsCopy;
    }
    const filterAPIFormatted = {};
    const filterHashes = JSON.parse(paramsCopy.filters);
    for (const filter of filterHashes) {
      if (filter.op === '=') {
        filterAPIFormatted[filter.field] = filter.val;
      } else {
        const APIOperator = this.get('operatorMap')[filter.op];
        filterAPIFormatted[`${filter.field}__${APIOperator}`] = filter.val;
      }
    }
    delete paramsCopy.filters;
    Ember.assign(paramsCopy, filterAPIFormatted);
    return paramsCopy;
  },

  operatorMap: {
    '=': 'eq',
    '>': 'gt',
    '>=': 'ge',
    '<': 'lt',
    '<=': 'le',
    '!=': 'ne',
    LIKE: 'ilike',
    IN: 'in',
  },

  /**
   * Return list of event metadata objects
   * that are within the given time and space bounding box.
   * @param params
   */
  eventCandidates(params) {
    const candidates = this.get('ajax').request('/datasets', { data: params });
    return candidates.then(doc => doc.objects.map(v => this.injectExplorerData('event', params, this.camelizeHash(v))), (reason) => {
      this.get('notify').error(`Event candidate query failed: ${reason}`);
      return { error: reason };
    });
  },

  /**
   * Return list of shape metadata objects
   * that are within the given space bounding box.
   * @param params
   */
  shapeSubsets(params) {
    const subsets = this.get('ajax').request('/shapes', { data: params });
    return subsets.then(doc => doc.objects.map(v => this.injectExplorerData('shape', params, this.camelizeHash(v))), (reason) => {
      this.get('notify').error(`Shape subset query failed: ${reason}`);
      return { error: reason };
    });
  },

  /**
   * return geoJSON of shape dataset
   * @param name
   * @param params
   * @param newTab
   */
  rawShape(name, params, newTab = false) {
    const endpoint = `/shapes/${name}`;
    if (newTab) {
      this.openInNewTab(endpoint, params);
      return undefined;
    }
    const shape = this.get('ajax').request(endpoint, { data: params });
    return shape.then(payload => payload, (reason) => {
      this.get('notify').error(reason);
    });
  },

  /**
   * Return CSV or GeoJSON of events
   *
   * @param params
   * @param newTab
   */
  rawEvents(params, newTab = false) {
    let paramsCopy = Ember.copy(params);
    paramsCopy = this._translateFilters(paramsCopy);
    const endpoint = '/detail';

    if (newTab) {
      this.openInNewTab(endpoint, paramsCopy);
      return undefined;
    }
    const events = this.get('ajax').request(endpoint, { data: paramsCopy });
    return events.then(payload =>
      // Don't currently call this from any route.
      // Would be useful for putting markers on a map.
       payload, (reason) => {
      this.get('notify').error(reason);
    });
  },

  /**
   * Create a job for a large CSV or GeoJSON download of events
   *
   * @param params
   * @param newTab
   */
  dataDump(params, newTab = false) {
    let paramsCopy = Ember.copy(params);
    paramsCopy = this._translateFilters(paramsCopy);
    const endpoint = '/datadump';

    if (newTab) {
      this.openInNewTab(endpoint, paramsCopy);
      return undefined;
    }
    return this.get('ajax').request(endpoint, { data: paramsCopy });
  },

  /**
   * Analogue of dataDump for sensor data.
   *
   */
  sensorDownload(params) {
    // networkId, nodeId, features, startDatetime, endDatetime
    const endpoint = `${ENV.host}/v1/api/sensor-networks/${params.networkId}/download`;
    const queryParams = {
      nodes: params.nodes,
      features: params.features.join(','),
      start_datetime: params.startDatetime,
      end_datetime: params.endDatetime,
    };

    // Remove empty keys to prevent the creation of malformed query strings
    for (const key of Object.keys(queryParams)) {
      if (!queryParams[key]) {
        delete queryParams[key];
      }
    }

    const query = endpoint + URI('').addQuery(queryParams).toString();
    this.get('notify').info(`[services.query] sensorDownload.query: ${query}`);
    return window.open(query);
  },

  /**
   * Fetch the large CSV or GeoJSON download of events
   *
   * @param ticket
   */
  getDataDump(ticket) {
    const endpoint = `http://plenar.io/v1/api/datadump/${ticket}`;
    window.open(endpoint);
  },

  /**
   * Return job information
   *
   * @param ticket
   */
  job(ticket) {
    const endpoint = `http://plenar.io/v1/api/jobs/${ticket}`;
    return this.get('ajax').request(endpoint);
  },

});
