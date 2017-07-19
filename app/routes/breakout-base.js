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
    let possibleDatasetsByType = this.modelFor('search.results');
    if (!possibleDatasetsByType) {
      possibleDatasetsByType = this.getPossibleDatasets(params);
    } else {
      possibleDatasetsByType = _.mapValues(possibleDatasetsByType, datasetArray =>
        datasetArray.map(dataset =>
          (dataset.dataset_name ? dataset.dataset_name : dataset.name)
        )
      );
    }

    const targetDatasetsByType = this.divideAndValidateDatasetNamesByType(possibleDatasetsByType, params);

    // TODO: get and return sensor data
    const data = targetDatasetsByType.then(tdsbt => Ember.RSVP.hash({
      timeseries: api.fetch.core.data.timeseries(
        Object.assign({}, params, { datasetNames: tdsbt.events.join(',') })
      ),
      grids: api.fetch.core.data.grids(
        Object.assign({}, params, { datasetNames: tdsbt.events.join(',') })
      ),
      shapes: api.fetch.core.data.shapes(
        Object.assign({}, params, { datasetNames: tdsbt.shapes.join(',') })
      ),
    }));

    return Ember.RSVP.hash({ requestedDatasets: possibleDatasetsByType, data });
  },

  getPossibleDatasets(params) {
    const api = this.get('api');
    return Ember.RSVP.hash({
      events: api.fetch.core.metadata.events(Object.assign({ useSimpleBbox: true }, params)),
      shapes: api.fetch.core.metadata.shapes(Object.assign({ useSimpleBbox: true }, params)),
    });
  },

  divideAndValidateDatasetNamesByType(hashOfDatasetNamesByType, params) {
    // We might be getting a promise, or not, so we ask Ember to resolve it for us if it exists
    // FIXME: not handling nav from search and straight from URL the same == breakage
    return Ember.RSVP.Promise.resolve(hashOfDatasetNamesByType).then(hash => ({
      events: _.intersection(hash.events, params.datasetNames.split(',')),
      shapes: _.intersection(hash.shapes, params.datasetNames.split(',')),
    }));
  },

  request(endpoint, queryParams) {
    return this.get('ajax').request(endpoint, { data: queryParams });
  },

});
