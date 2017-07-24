import Ember from 'ember';
import _ from 'npm:lodash';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  appParamsToApiParamsMap: {
    datasetNames: 'dataset_name__in',
    startDate: 'obs_date__ge',
    endDate: 'obs_date__le',
    aggregateBy: 'agg',
    withinArea: 'location_geom__within',
    useSimpleBbox: 'simple_bbox',
  },

  init() {
    this.fetch = this.fetch(this);
    this.handle = this.handle(this);
    this.adapter = this.adapter(this);
  },

  /* eslint-disable brace-style */
  fetch(service) {
    const ajax = service.get('ajax');
    return {

      core: (function () { return {
        metadata: (function () { return {

          datasets(endpoint, appQueryParams) {
            const qp = service.adapter.appParamsToApiParams(appQueryParams);
            return ajax.request(endpoint, { data: qp })
              .then(service.handle.core.fulfilled, service.handle.core.rejected);
          },

          events(appQueryParams) {
            return this.datasets('datasets', appQueryParams);
          },

          shapes(appQueryParams) {
            return this.datasets('shapes', appQueryParams);
          },

        }; }()),

        data: (function () { return {

          timeseries(appQueryParams) {
            const qp = service.adapter.appParamsToApiParams(appQueryParams);
            return ajax.request('timeseries', { data: qp })
              .then(service.handle.core.fulfilled, service.handle.core.rejected);
          },

          singleDatasetEndpoint(endpoint, datasetName, appQueryParams) {
            const qp = service.adapter.appParamsToApiParams(appQueryParams);
            delete qp.dataset_name__in;
            qp.dataset_name = datasetName;
            return ajax.request(endpoint, { data: qp });
          },

          grids(appQueryParams) {
            const dsNames = appQueryParams.datasetNames.split(',');
            if (dsNames.length === 1 && dsNames[0] === '') return [];
            return Ember.RSVP.all(
              dsNames.map((name) => {
                return this.singleDatasetEndpoint('grid', name, appQueryParams);
              })
            ).then(result => _.filter(result, grid => grid.features.length > 0));
          },

          shapes(appQueryParams) {
            const dsNames = appQueryParams.datasetNames.split(',');
            if (dsNames.length === 1 && dsNames[0] === '') return [];
            return Ember.RSVP.all(
              dsNames.map(name =>
                this.singleDatasetEndpoint('shapes', name, appQueryParams)
                  .then(service.handle.core.fulfilled, service.handle.core.rejected)
              )
            );
          },

        }; }()),
      }; }()),

      networks: (function () { return {

        metadata: (function () { return {

          nodes(network, appQueryParams) {
            const qp = service.adapter.appParamsToNetworkMetadataApiParams(appQueryParams);
            console.log('qp: ', qp);
            return ajax.request(`/sensor-networks/${network}/nodes`, { data: qp })
              .then(service.handle.networks.fulfilled, service.handle.networks.rejected);
          },

          features(network, appQueryParams) {
            const qp = service.adapter.appParamsToNetworkMetadataApiParams(appQueryParams);
            return ajax.request(`/sensor-networks/${network}/features`, { data: qp })
              .then(service.handle.networks.fulfilled, service.handle.networks.rejected);
          },

        }; }()),

        data: (function () { return {

          rawObservations(network, featureNames, appQueryParams) {
            return Ember.RSVP.all(
              featureNames.map((name) => {
                const qp = {
                  feature: name,
                  start_datetime: appQueryParams.startDate,
                  end_datetime: appQueryParams.endDate,
                };
                return ajax.request(`/sensor-networks/${network}/query`, { data: qp })
                  .then(service.handle.networks.fulfilled, service.handle.networks.rejected)
                  .then(observations => ({ dataset_name: name, observations }));
              })
            );
          },

        }; }()),

      }; }()),
    };
  },
  /* eslint-enable brace-style */

  /* eslint-disable brace-style */
  handle(/* self */) { return {

    core: (function () { return {

      fulfilled(response) {
        return response.objects;
      },

      rejected(reason) {
        return reason;
      },

    }; }()),

    networks: (function () { return {

      fulfilled(response) {
        return response.data;
      },

      rejected(reason) {
        if (reason.message === 'Request was formatted incorrectly.' &&
          reason.payload.error.toString().match(/^No \w+ found within {/)) {
          // Ignore the API's incorrect usage of 400. It's just an empty list of results,
          // not actually a bad request
          Ember.Logger.info('Ignoring 400 Bad Request');
          return [];
        }
        return reason;
      },

    }; }()),
  }; },
  /* eslint-enable brace-style */

  /* eslint-disable brace-style */
  adapter(service) { return {

    appParamsToApiParams(appParams) {
      const apiParams = _.mapKeys(appParams, (value, key) => service.appParamsToApiParamsMap[key]);
      if (Array.isArray(apiParams.dataset_name__in)) {
        apiParams.dataset_name__in = apiParams.dataset_name__in.join(',');
      }
      return apiParams;
    },

    appParamsToNetworkMetadataApiParams(appParams) {
      const apiParams = this.appParamsToApiParams(appParams);
      if (apiParams.location_geom__within) {
        apiParams.geom = apiParams.location_geom__within;
        delete apiParams.location_geom__within;
      }
      return apiParams;
    },

  }; },
  /* eslint-enable brace-style */

});
