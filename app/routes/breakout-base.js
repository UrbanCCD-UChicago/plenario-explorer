import Ember from 'ember';
import _ from 'npm:lodash';
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

    // The Plenario API returns an error if dataset names for the wrong kind of dataset are passed
    // to an endpoint in `dataset_name__in`, so we have to make several extra requests and do a
    // whole lot of frontend trickery to figure out what we can ask of which API endpoint
    // If we came from a search, just grab this list from that route. Otherwise, go fetch it.
    let validDatasetsMetadata = this.modelFor('search.results');
    if (!validDatasetsMetadata) {
      validDatasetsMetadata = this.getSearchDatasetsForQuery(params);
    }

    const validDatasetNames = this.getDatasetNamesByType(validDatasetsMetadata);

    const targetDatasetNames = this.divideAndValidateBy(params.datasetNames.split(','), validDatasetNames);

    // TODO: get and return sensor data
    return targetDatasetNames.then(td => Ember.RSVP.hash({
      timeseries: api.fetch.core.data.timeseries(
        Object.assign({}, params, { datasetNames: td.events.join(',') })
      ),
      grids: api.fetch.core.data.grids(
        Object.assign({}, params, { datasetNames: td.events.join(',') })
      ),
      shapes: api.fetch.core.data.shapes(
        Object.assign({}, params, { datasetNames: td.shapes.join(',') })
      ),
      features: api.fetch.networks.data.rawObservations(
        'array_of_things_chicago', td.features, params
      ),
    }));
  },

  getSearchDatasetsForQuery(params) {
    const api = this.get('api');
    return Ember.RSVP.hash({
      events: api.fetch.core.metadata.events(Object.assign({ useSimpleBbox: true }, params)),
      shapes: api.fetch.core.metadata.shapes(Object.assign({ useSimpleBbox: true }, params)),
      features: api.fetch.networks.metadata.features('array_of_things_chicago', params),
    });
  },

  getDatasetNamesByType(searchMetadata) {
    return Ember.RSVP.Promise.resolve(searchMetadata).then(metadata =>
      _.mapValues(metadata, datasetList =>
        datasetList.map(dataset =>
          (dataset.dataset_name ? dataset.dataset_name : dataset.name)
        )
      )
    );
  },

  divideAndValidateBy(requestedDatasetNames, validDatasetNames) {
    return Ember.RSVP.Promise.resolve(validDatasetNames).then(vds =>
      _.mapValues(vds, value => _.intersection(value, requestedDatasetNames))
    );
  },

});
