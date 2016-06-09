import Ember from 'ember';
import moment from 'moment';
/* global URI */

/**
 * Grabs and caches all dataset metadata.
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  /**
   * For when we want to redirect the user
   * to download the data directly
   * rather than use it in the application
   */
  openInNewTab(endpoint, params) {
    const qString = URI('').addQuery(params).toString();
    window.open(`http://plenar.io/v1/api${endpoint}${qString}`);
  },

  camelizeHash: function(hash) {
    let normalized = {};
    for(let key in hash) {
      if(hash.hasOwnProperty(key)) {
        const normalizedKey = Ember.String.underscore(key).camelize();
        normalized[normalizedKey] = hash[key];
      }
    }
    return normalized;
  },


  injectExplorerData: function(route, params, obj) {
    Ember.assign(obj, {'explorerData': {'route': route, 'queryParams': params}});
    return obj;
  },

  init() {
    this._super(...arguments);
    const eventParams = {
      data: {include_columns: true} //TODO: remove this parameter
    };
    this.set('events', this.get('ajax').request('/datasets', eventParams));
    this.set('shapes', this.get('ajax').request('/shapes'));
  },

  _getMetadata(type) {
    const camelizeHash = this.camelizeHash;
    const injectExplorerData = this.injectExplorerData;
    let route = "event";
    if (type === "events") {
      route = "event";
    }
    else if (type === "shapes"){
      route = "shape";
    }
    return this.get(type).then(function(doc) {
      return doc.objects.map(v => injectExplorerData(route, undefined, camelizeHash(v)));
    },function(reason) {
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

  _findDataset(name, datasets) {
    return datasets.then(function(dsets) {
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
  timeseries(params, newTab=false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/detail-aggregate';

    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const ts = this.get('ajax').request(endpoint, {data: params});
      return ts.then(payload => {
        return {
          series: this.prepTimeseries(payload.objects),
          count: payload.count
        };
      }, function(reason) {
        console.log(reason);
      });
    }
  },

  /**
   Takes array of objects of the form [{count: 3, datetime: '2016-12-06'}...]
   Returns array of arrays of the form [[momentJSObject, integer]]
   */
  prepTimeseries(ts) {
    const formattedSeries = ts.map(function(timeSlice) {
      // Why exactly does `moment(timeSlice.datetime + "+0000").valueOf()` work
      // to let Highcharts accept datetimes on the x axis?
      // I don't know. Don't question it.
      return [moment(timeSlice.datetime + "+0000").valueOf(), timeSlice.count];
    });
    // The chart expects a list of series objects,
    // each with a data attribute that actually holds the timeseries.
    // So construct a list of one such object.
    // NB: name: 'Count' determines chart tooltip.
    // Easy to override if desired.
    return [{data: formattedSeries, name: 'Count'}];
  },

  /**
   * Return grid response geoJSON.
   *
   * @param name
   * @param params
   * @param newTab
     */
  grid(params, newTab=false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/grid';
    if (newTab) {
      this.openInNewTab(endpoint, params);
    }
    else {
      const grid = this.get('ajax').request(endpoint, {data: params});
      return grid.then(function(payload) {
        return payload;
      }, function(reason) {
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
    let filterAPIFormatted = {};
    const filterHashes = JSON.parse(params.filters);
    for (const filter of filterHashes) {
      if (filter.op === '=') {
        filterAPIFormatted[filter.field] = filter.val;
      }
      else {
        const APIOperator = this.get('operatorMap')[filter.op];
        filterAPIFormatted[`${filter.field}__${APIOperator}`] = filter.val;
      }
    }
    delete params['filters'];
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
    'LIKE': 'ilike',
    'IN': 'in'
  },

  /**
   * Return list of event metadata objects
   * that are within the given time and space bounding box.
   * @param params
     */
  eventCandidates(params) {
    const candidates = this.get('ajax').request('/datasets', {data: params});
    return candidates.then(doc => {
      return doc.objects.map(v => {
        return this.injectExplorerData("event", params, this.camelizeHash(v));
      });
    }, function(reason) {
      console.log(`Event candidate query failed: ${reason}`);
    });
  },

  /**
   * Return list of shape metadata objects
   * that are within the given space bounding box.
   * @param params
     */
  shapeSubsets(params) {
    const subsets = this.get('ajax').request('/shapes', {data: params});
    return subsets.then(doc => {
      return doc.objects.map(v => {
        return this.injectExplorerData("shape", params, this.camelizeHash(v));
      });
    }, function(reason) {
      console.log(`Shape subset query failed: ${reason}`);
    });
  },

  /**
   * return geoJSON of shape dataset
   * @param name
   * @param params
   * @param newTab
     */
  rawShape(name, params, newTab=false) {
    const endpoint = `/shapes/${name}`;
    if (newTab) {
      this.openInNewTab(endpoint, params);
    }
    else {
      const shape = this.get('ajax').request(endpoint, {data: params});
      return shape.then(payload => {
        return payload;
      }, reason => {
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
  rawEvents(params, newTab=false) {
    params = Ember.copy(params);
    params = this._translateFilters(params);
    const endpoint = '/detail';

    if (newTab) {
      this.openInNewTab(endpoint, params);
    } else {
      const events = this.get('ajax').request(endpoint, {data: params});
      return events.then(payload => {
        // Don't currently call this from any route.
        // Would be useful for putting markers on a map.
        return payload;
      }, function(reason) {
        console.log(reason);
      });
    }
  },
});
