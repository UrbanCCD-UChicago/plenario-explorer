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

  model(params) {
    const api = this.get('api');

    const metadata = Ember.RSVP.hash({
      events: api.fetch.core.events(Object.assign({ useSimpleBbox: true }, params)),
      shapes: api.fetch.core.shapes(Object.assign({ useSimpleBbox: true }, params)),
      features: api.fetch.networks.features('array_of_things_chicago', params),
    });
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  },

});
