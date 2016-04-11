import Ember from 'ember';
import moment from 'moment';

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
  query: Ember.inject.service(),


  model(params, transition) {
    let qParams = transition.queryParams;
    // Normalize column filters
    const filterJSON = this.extractFilters(qParams);
    if (filterJSON) {
      qParams['filters'] = filterJSON;
    }
    // Fetch data
    const name = qParams.dataset_name;
    const qService = this.get('query');
    return Ember.RSVP.hash({
      metadata: qService.eventMetadata(name),
      timeseries: qService.timeseries(name, qParams),
      grid: qService.grid(name, qParams)
    });
  },

  /**
   * Because filter parameters can have arbitrary names,
     we need to do some pre-processing here so w e can pass a parameter named
     'filters' to the controller.
     It will be stringified JSON where each filter is an object
     with the schema {name: '', op: '', val: ''}
   * @param queryParams
   * @returns {null}
     */
  extractFilters(queryParams) {
    let filters = [];
    const skipKeys = ['obs_date__le', 'obs_date__ge', 'location_geom__within'];

    for (const key in queryParams) {
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
