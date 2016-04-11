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
    let qParams = transition.queryParams;

    // Normalize column filters
    const filterJSON = this.extractFilters(qParams);
    if (filterJSON) {
      qParams['filters'] = filterJSON;
    }

    // Set defaults
    if (qParams['agg'] === undefined) {
      qParams['agg'] = 'week';
    }
    if (qParams['resolution'] === undefined) {
      qParams['resolution'] = 500;
    }

  },

  query: Ember.inject.service(),


  model(_, transition) {
    let qParams = transition.queryParams;
    const qService = this.get('query');
    const name = qParams.dataset_name;
    // If start and end dates weren't explicitly specified,
    // we need to pick reasonable defaults.
    if (!(qParams.obs_date__ge && qParams.obs_date__le)) {
      // Fetch metadata first to find out date range.
      return qService.eventMetadata(name).then(function(meta) {
        qParams['obs_date__le'] = moment(meta.obsTo).toString();
        qParams['obs_date__ge'] = moment(meta.obsTo).subtract(90, 'days').toString();
        return Ember.RSVP.hash({
          metadata: meta,
          timeseries: qService.timeseries(name, qParams),
          grid: qService.grid(name, qParams)
        });
      }, function(reason) {
        console.log(reason);
      });
    }
    else {
      return Ember.RSVP.hash({
        metadata: qService.eventMetadata(name),
        timeseries: qService.timeseries(name, qParams),
        grid: qService.grid(name, qParams)
      });
    }

  },

  modelWithSelectedDates(qParams) {
    const qService = this.get('query');
    const name = qParams.dataset_name;
    return Ember.RSVP.hash({
      metadata: qService.eventMetadata(name),
      timeseries: qService.timeseries(name, qParams),
      grid: qService.grid(name, qParams)
    });
  },

  modelWithDefaultDates(qParams) {
    const name = qParams.dataset_name;
    const qService = this.get('query');
    // We need to know the date range of this dataset
    // to pick a decent default.
    qService.eventMetadata(name).then(function(meta) {
      const endDate = moment(meta.obsTo).toString();
      const startDate = moment(meta.obsTo).subtract(90, 'days').toString();
      return Ember.RSVP.hash({

      });
    }, function(reason) {
      console.log(reason);
    })
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
