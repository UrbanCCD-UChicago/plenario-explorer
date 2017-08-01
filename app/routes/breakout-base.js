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
    const { startDate, endDate, withinArea, aggregateBy } = params;

    const datasetNames = params.datasetNames ? params.datasetNames.split(',') : [];
    console.log(params);

    // TODO: grab and filter existing metadata if we came from a search, instead of fetching again
    const metadata = Ember.RSVP.hash({
      events:
        api.fetch.core.metadata.events(datasetNames, startDate, endDate, withinArea, true),
      shapes:
        api.fetch.core.metadata.shapes(datasetNames, withinArea, true),
      features:
        api.fetch.networks.metadata.features('array_of_things_chicago', withinArea),
    });

    return metadata.then(md => Ember.RSVP.hash({
      events:
        api.fetch.core.data.timeseriesFor(md.events, startDate, endDate, aggregateBy, withinArea)
          .then(() =>
            api.fetch.core.data.gridsFor(md.events, startDate, endDate, aggregateBy, withinArea)
          ),
      shapes:
        api.fetch.core.data.shapesFor(md.shapes, withinArea),
      features:
        undefined,
    }));
  },

});
