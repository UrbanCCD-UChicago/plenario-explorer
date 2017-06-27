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
    this.set('transition', transition); // Cache the transition object for later
    this.controllerFor('search.results-loading').set(
      'shouldSmoothScroll',
      this.get('transition.isCausedByInitialTransition') !== undefined
    );
  },

  model(params, transition) {
    // // Ensure this takes at least 750ms, to allow our fancy-pants scroll animation to finish
    // const pauser = new Ember.RSVP.Promise((resolve) => {
    //   Ember.run.later(() => {
    //     resolve({ msg: 'Hold Your Horses' });
    //   }, 750);
    // });

    const queryParamsToApiParamsMap = this.get('queryParamsToApiParamsMap');
    const routeQueryParams = transition.queryParams;
    const apiParams = { simple_bbox: true };
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
          hash[key] = hash[key].value; // eslint-disable-line no-param-reassign
        } else {
          hash[key] = []; // eslint-disable-line no-param-reassign
        }
      });
      return hash;
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set(
      'shouldSmoothScroll',
      this.get('transition.isCausedByInitialTransition') !== undefined
    );
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  },

});
