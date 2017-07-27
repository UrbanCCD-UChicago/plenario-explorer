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
    const { startDate, endDate, withinArea } = params;
    const useSimpleBbox = true;

    return Ember.RSVP.hash({
      events:
        api.fetch.core.metadata.events(undefined, startDate, endDate, withinArea, useSimpleBbox),
      shapes:
        api.fetch.core.metadata.shapes(undefined, withinArea, useSimpleBbox),
      features:
        api.fetch.networks.metadata.features('array_of_things_chicago', withinArea),
    });
  },

  afterModel(resolvedModel, transition) {
    const { queryParams } = transition;
    if (this.get('isUrlNav') && queryParams.withinArea) {
      // This JSON.parse should be safe, since a malformed shape query would have already triggered
      // the model hook's error handling and shipped the user to a relevant error route
      this.controllerFor('search').set('urlQueryShape', JSON.parse(queryParams.withinArea));
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('shouldSmoothScroll', !this.get('isUrlNav'));
    controller.set('tableSelectedDatasets', {});
  },

});
