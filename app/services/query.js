import Ember from 'ember';
import moment from 'moment';
import Node from '../models/node';
import ENV from 'plenario-explorer/config/environment';
// import MockNetwork from '../mirage/mock-network'
import { mockNetwork, sensorData } from '../mirage/sensor-data';
/* global URI */
// const network = new MockNetwork(sensorData.curation, sensorData.nodes.data);
/**
 * Grabs and caches all dataset metadata.
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  io: Ember.inject.service('socket-io'),

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
    for (const key in hash) {
      if (hash.hasOwnProperty(key)) {
        const normalizedKey = Ember.String.underscore(key).camelize();
        normalized[normalizedKey] = hash[key];
      }
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
    return this.get(type).then(doc => doc.objects.map(v => injectExplorerData(route, undefined, camelizeHash(v))), (reason) => {
      console.log(`Failed to load ${type}. Reason: ${reason}.`);
    });
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
    return this.get('ajax').request(qString)
    .then(nodeMeta => nodeMeta.data.map(
          nodeRecord => Node.create({ nodeGeoJSON: nodeRecord })
        )
    );
  },

  nodeMetadata(nodeId) {
    const qString = `/sensor-networks/${ENV.networkId}/nodes/${nodeId}`;
    return this.get('ajax').request(qString)
      .then(nodeMeta => nodeMeta.data.map(
            nodeRecord => Node.create({ nodeGeoJSON: nodeRecord })
          )
      );
  },

  allSensorMetadata() {
    const qString = `/sensor-networks/${ENV.networkId}/sensors`;
    return this.get('ajax').request(qString).then(sensorMeta => sensorMeta.data.map((sensorRecord) => {
      const props = sensorRecord.properties;
      const feats = props.map(prop => prop.split('.')[0]);
      return { name: sensorRecord.name, features: feats };
    }));
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
    type = type.toString();

    const params = {
      data: {
        sensors: sensorName,
        node: nodeId,
        feature: type,
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

    const url = `${ENV.curationHost}/${networkId}.json`;
    return this.get('ajax').request(url).then(response => response);
  },

  _findDataset(name, datasets) {
    return datasets.then((dsets) => {
      for (const key in dsets) {
        if (dsets.hasOwnProperty(key)) {
          const dset = dsets[key];
          if (dset.datasetName === name) {
            return dset;
          }
        }
      }
    });
  },

  /**
   * Return timeseries array
   * embedded within event metadata object.
   *
   * @param name
   * @param params
   * @param newTab
   */
  timeseries(params, newTab = false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/detail-aggregate';

    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const ts = this.get('ajax').request(endpoint, { data: params });
      return ts.then(payload => ({
        series: this.prepTimeseries(payload.objects),
        count: payload.count,
      }), (reason) => {
        console.log(reason);
        return { error: reason };
      });
    }
  },

  /**
   Takes array of objects of the form [{count: 3, datetime: '2016-12-06'}...]
   Returns array of arrays of the form [[momentJSObject, integer]]
   */
  prepTimeseries(ts) {
    const formattedSeries = ts.map(timeSlice =>
      // Why exactly does `moment(timeSlice.datetime + "+0000").valueOf()` work
      // to let Highcharts accept datetimes on the x axis?
      // I don't know. Don't question it.
       [moment(`${timeSlice.datetime}+0000`).valueOf(), timeSlice.count]);
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
   * @param name
   * @param params
   * @param newTab
   */
  grid(params, newTab = false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/grid';
    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const grid = this.get('ajax').request(endpoint, { data: params });
      return grid.then(payload => payload, (reason) => {
        console.log(reason);
      });
    }
  },

  _translateFilters(params) {
    params = Ember.copy(params);
    if (!params.filters) {
      // No filters to transform.
      return params;
    }
    const filterAPIFormatted = {};
    const filterHashes = JSON.parse(params.filters);
    for (const filter of filterHashes) {
      if (filter.op === '=') {
        filterAPIFormatted[filter.field] = filter.val;
      } else {
        const APIOperator = this.get('operatorMap')[filter.op];
        filterAPIFormatted[`${filter.field}__${APIOperator}`] = filter.val;
      }
    }
    delete params.filters;
    Ember.assign(params, filterAPIFormatted);
    return params;
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
      console.log(`Event candidate query failed: ${reason}`);
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
      console.log(`Shape subset query failed: ${reason}`);
      return { error: reason };
    });
  },

  /**
   * Return list of sensor nodes that are
   * within the given space bounding box.
   * @param params
   */
  nodeSubset(params) {
    params.geom = params.location_geom__within; // Because the nodes endpoint uses different parameters
    const subset = this.get('ajax').request(`/sensor-networks/${ENV.networkId}/nodes`, { data: params });
    return subset.then(nodeMeta => nodeMeta.data.map(
        nodeRecord => Node.create({ nodeGeoJSON: nodeRecord })
      ));
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
    } else {
      const shape = this.get('ajax').request(endpoint, { data: params });
      return shape.then(payload => payload, (reason) => {
        console.log(reason);
      });
    }
  },

  /**
   * Return CSV or GeoJSON of events
   *
   * @param name
   * @param params
   * @param newTab
   */
  rawEvents(params, newTab = false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/detail';

    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const events = this.get('ajax').request(endpoint, { data: params });
      return events.then(payload =>
        // Don't currently call this from any route.
        // Would be useful for putting markers on a map.
         payload, (reason) => {
        console.log(reason);
      });
    }
  },

  /**
   * Create a job for a large CSV or GeoJSON download of events
   *
   * @param name
   * @param params
   * @param newTab
   */
  dataDump(params, newTab = false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/datadump';

    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const events = this.get('ajax').request(endpoint, { data: params });
      return events;
    }
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
    return window.open(query);
  },

  /**
   * Fetch the large CSV or GeoJSON download of events
   *
   * @param name
   * @param params
   * @param newTab
   */
  getDataDump(ticket) {
    const endpoint = `${ENV.host}/v1/api/datadump/${ticket}`;
    window.open(endpoint);
  },

  /**
   * Return job information
   *
   * @param ticket
   */
  job(ticket) {
    const endpoint = `${ENV.host}/v1/api/jobs/${ticket}`;
    const job = this.get('ajax').request(endpoint);
    return job;
  },

});
