import Ember from 'ember';

export default Ember.Route.extend({

  ajax: Ember.inject.service(),

  queryParams: {
    startDate: { refreshModel: true },
    endDate: { refreshModel: true },
    aggregateBy: { refreshModel: true },
    withinArea: { refreshModel: true },
  },

  queryParamsToApiParamsMap: {
    startDate: 'obs_date__ge',
    endDate: 'obs_date__le',
    aggregateBy: 'agg',
    withinArea: 'location_geom__within',
  },

  beforeModel(transition) {
    // If there are no query parameters, redirect to the search route
    const { queryParams } = transition;
    if (Object.keys(queryParams).length === 0) {
      this.transitionTo('search');
    }
  },

  model(params, transition) {
    const queryParamsToApiParamsMap = this.get('queryParamsToApiParamsMap');
    const routeQueryParams = transition.queryParams;
    const apiParams = {};
    Object.keys(routeQueryParams).forEach((qp) => {
      if (queryParamsToApiParamsMap[qp]) {
        apiParams[queryParamsToApiParamsMap[qp]] = routeQueryParams[qp];
      }
    });
    const apiParamsForFeatureQueries = { geom: routeQueryParams.withinArea };
    return Ember.RSVP.hashSettled({
      events: this.request('datasets', apiParams).then(response => response.objects),
      shapes: this.request('shapes', apiParams).then(response => response.objects),
      features: this.request('sensor-networks/array_of_things_chicago/features', apiParamsForFeatureQueries).then(response => response.data),
    }).then((hash) => {
      Object.keys(hash).forEach((key) => {
        if (hash[key].state === 'fulfilled') {
          hash[key] = hash[key].value;
        } else {
          hash[key] = [];
        }
      });
      return hash;
    });
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  },

});
