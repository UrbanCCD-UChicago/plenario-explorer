import Ember from 'ember';
import QueryParamsResetRouteMixin from 'ember-query-params-reset/mixins/query-params-reset-route';

export default Ember.Route.extend(QueryParamsResetRouteMixin, {

  api: Ember.inject.service('plenario-api'),

  queryParams: {
    startDate: { refreshModel: true },
    endDate: { refreshModel: true },
    aggregateBy: { refreshModel: true },
    withinArea: { refreshModel: true },
  },

  beforeModel(transition) {
    // If there are no query parameters, redirect to the search route
    const { queryParams } = transition;
    if (Object.keys(queryParams).length === 0) {
      this.transitionTo('search');
    }

    // Only smooth scroll to the results if we're coming from a search, otherwise just jump there
    this.set('isUrlNav', transition.isCausedByInitialTransition === undefined);
    this.controllerFor('search.results-loading').set('shouldSmoothScroll', !this.get('isUrlNav'));
  },

  model(params) {
    const api = this.get('api');

    return Ember.RSVP.hash({
      events: api.fetch.core.events(Object.assign({ useSimpleBbox: true }, params)),
      shapes: api.fetch.core.shapes(Object.assign({ useSimpleBbox: true }, params)),
      features: api.fetch.networks.features('array_of_things_chicago', params),
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
