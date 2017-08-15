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

    // We're grabbing these again, because we don't want to use simple_bbox (we need to know
    // how many shape items are within the search, not just the total in the intersecting dataset)
    const metadata = Ember.RSVP.hash({
      events:
        api.fetch.core.metadata.events(datasetNames, startDate, endDate, withinArea),
      shapes:
        api.fetch.core.metadata.shapes(datasetNames, withinArea),
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
