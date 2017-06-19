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
    // If there are no query parameters, redirect to the results route
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
    return Ember.RSVP.hash({
      events: this.request('datasets', apiParams).then(response => response.objects),
      shapes: this.request('shapes', apiParams).then(response => response.objects),
    });
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  }

});
