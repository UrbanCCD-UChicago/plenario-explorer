import Ember from 'ember';
import QueryParamsResetRouteMixin from 'ember-query-params-reset/mixins/query-params-reset-route';

export default Ember.Route.extend(QueryParamsResetRouteMixin, {

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

    this.set('isUrlNav', transition.isCausedByInitialTransition === undefined);
    this.controllerFor('search.results-loading').set('shouldSmoothScroll', !this.get('isUrlNav'));
  },

  model(params) {
    const queryParamsToApiParamsMap = this.get('queryParamsToApiParamsMap');
    const apiParams = { simple_bbox: true };
    Object.keys(params).forEach((qp) => {
      if (queryParamsToApiParamsMap[qp]) {
        apiParams[queryParamsToApiParamsMap[qp]] = params[qp];
      }
    });
    const apiParamsForFeatureQueries = { geom: params.withinArea };
    return Ember.RSVP.hashSettled({
      events: this.request('datasets', apiParams).then(response => response.objects),
      shapes: this.request('shapes', apiParams).then(response => response.objects),
      features: this.request('sensor-networks/array_of_things_chicago/features', apiParamsForFeatureQueries).then(response => response.data),
    }).then((hash) => {
      Object.keys(hash).forEach((key) => {
        if (hash[key].state === 'fulfilled') {
          hash[key] = hash[key].value; // eslint-disable-line no-param-reassign
        } else {
          hash[key] = []; // eslint-disable-line no-param-reassign
        }
      });
      return hash;
    });
  },

  afterModel(resolvedModel, transition) {
    if (this.get('isUrlNav') && transition.queryParams.withinArea) {
      // This JSON.parse should be safe, since a malformed shape query would have already triggered
      // the model hook's error handling and shipped the user to a relevant error route
      this.controllerFor('search').set(
        'urlQueryShape',
        JSON.parse(transition.queryParams.withinArea)
      );
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('shouldSmoothScroll', !this.get('isUrlNav'));
    controller.set('tableSelectedDatasets', {});
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  },

});
