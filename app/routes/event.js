import Ember from 'ember';
import moment from 'moment';
import QueryConverter from '../utils/query-converter';

export default Ember.Route.extend({

  /**
   * Handles setting defaults for dates and agg units
   * so that model() can always expect those
   * to be present.
   *
   * @param transition
   */
  beforeModel(transition){
    let params = transition.queryParams;
    //if (params)

    for (const key in this.defaults) {
      if (params[key] === undefined) {
        params[key] = this.defaults[key];
      }
    }
  },

  defaults: {
    'agg': 'week',
    'obs_date__le': moment().toString(),
    'obs_date__ge': moment().subtract(90, 'days').toString(),
    'resolution': 500
  },

  model(params, transition) {
    // Later: provide an option for displaying
    // a points view instead.

    // Because filter parameters can have arbitrary names,
    // we need to do some pre-processing here so we can pass a parameter named
    // 'filters' to the controller.
    // It will be stringified JSON where each filter is an object
    // with the schema {name: '', op: '', val: ''}
    const filterJSON = this.extractFilters(transition.queryParams);
    if (filterJSON) {
      transition.queryParams['filters'] = filterJSON;
    }

    // We only need the point dataset name to grab its metadata.
    const name = params.dataset_name;
    // For the grid and timeseries, we need all the params to ID it.
    const id = new QueryConverter().fromHash(transition.queryParams).toId();

    return Ember.RSVP.hash({
      metadata: this.store.findRecord('point-dataset', name),
      timeseries: this.store.findRecord('timeseries', id),
      grid: this.store.findRecord('grid', id)
    });
    // But we need to package it into a "filters" param
    // to pass it down to the controller.
    // Maybe process it, marshal to JSON and unmarshal in the controller.
  },

  extractFilters(queryParams) {
    let filters = [];
    const skipKeys = ['obs_date__le', 'obs_date__ge', 'location_geom__within'];

    console.log(queryParams);
    for (const key in queryParams) {
      console.log(key);
      // Not one of the "standard" filters.
      if (skipKeys.indexOf(key) > -1) {
        continue;
      }
      // Expected form of filter params is name__op
      if (!key.includes('__')) {
        continue;
      }
      let split = key.split('__');
      if (split.length !== 2) {
        continue;
      }

      const [field, op] = split;
      const val = queryParams[key];
      filters.push({
        field: field,
        operator: op,
        value: val
      });
    }
    if (filters.length > 0) {
      return JSON.stringify(filters);
    }
    else {
      return null;
    }
  }
});
