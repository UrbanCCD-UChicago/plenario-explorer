import Ember from 'ember';
import moment from 'moment';

/**
 * Grabs and caches all dataset metadata.
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),

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

  init() {
    this._super(...arguments);
    const eventParams = {
      data: {include_columns: true}
    };
    this.set('events', this.get('ajax').request('/datasets', eventParams));
    this.set('shapes', this.get('ajax').request('/shapes'));
  },

  _getMetadata(type) {
    const camelizeHash = this.camelizeHash;
    return this.get(type).then(function(doc) {
      return doc.objects.map(camelizeHash);
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
     */
  timeseries(name, params) {
    params = Ember.copy(params);
    params['dataset_name'] = name;
    params = this._translateFilters(params);
    const ts = this.get('ajax').request('/detail-aggregate', {data: params});
    const prepTimeseries = this.prepTimeseries;
    return ts.then(function(payload) {
      return {
        series: prepTimeseries(payload.objects),
        count: payload.count
      };
    }, function(reason) {
      console.log(reason);
    });
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
     */
  grid(name, params) {
    params = Ember.copy(params);
    params['dataset_name'] = name;
    params = this._translateFilters(params);
    const grid = this.get('ajax').request('/grid', {data: params});
    return grid.then(function(payload) {
      return payload;
    }, function(reason) {
      console.log(reason);
    });
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
    return Ember.merge(params, filterAPIFormatted);
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

  // /**
  //  * Because filter parameters can have arbitrary names,
  //    we need to do some pre-processing here so w e can pass a parameter named
  //    'filters' to the controller.
  //    It will be stringified JSON where each filter is an object
  //    with the schema {field: '', op: '', val: ''}
  //  * @param queryParams
  //  * @returns {null}
  //    */
  // extractFilters(queryParams) {
  //   let filters = [];
  //   const skipKeys = ['obs_date__le', 'obs_date__ge', 'location_geom__within'];
  //
  //   for (const key in queryParams) {
  //     // Not one of the "standard" filters.
  //     if (skipKeys.indexOf(key) > -1) {
  //       continue;
  //     }
  //     // Expected form of filter params is name__op
  //     if (!key.includes('__')) {
  //       continue;
  //     }
  //     let split = key.split('__');
  //     if (split.length !== 2) {
  //       continue;
  //     }
  //
  //     const [field, op] = split;
  //     const val = queryParams[key];
  //     filters.push({
  //       field: field,
  //       operator: op,
  //       value: val
  //     });
  //   }
  //   if (filters.length > 0) {
  //     return JSON.stringify(filters);
  //   }
  //   else {
  //     // An empty array
  //     return '[]';
  //   }
  // }

  /**
   * Return list of event metadata objects
   * that are within the given time and space bounding box.
   * @param params
     */
  eventCandidates(params) {

    const camelizeHash = this.camelizeHash;
    const candidates = this.get('ajax').request('/datasets', {data: params});
    return candidates.then(function(doc) {
      return doc.objects.map(camelizeHash);
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
    const self = this;
    const subsets = this.get('ajax').request('/shapes', {data: params});
    return subsets.then(function(doc) {
      return doc.objects.map(self.camelizeHash);
    }, function(reason) {
      console.log(`Shape subset query failed: ${reason}`);
    });
  },

  /**
   * return geoJSON of shape dataset
   * @param name
     */
  rawShape(name) {
  }
});
