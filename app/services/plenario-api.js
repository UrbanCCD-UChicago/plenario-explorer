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
            return Ember.RSVP.all(
              dsNames.map(name => this.singleDatasetEndpoint('grid', name, appQueryParams))
            );
          },

          shapes(appQueryParams) {
            const dsNames = appQueryParams.datasetNames.split(',');
            return Ember.RSVP.all(
              dsNames.map(name => this.singleDatasetEndpoint('shapes', name, appQueryParams))
            );
          },

        }; }()),
      }; }()),

      networks: (function () { return {

        metadata: (function () { return {

          features(network, appQueryParams) {
            const qp = service.adapter.appParamsToNetworkApiParams(appQueryParams);
            return ajax.request(`/sensor-networks/${network}/features`, { data: qp })
              .then(service.handle.networks.fulfilled, service.handle.networks.rejected);
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
          reason.payload.error.toString().match(/^No \w+ found within {"crs":/)) {
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

    appParamsToNetworkApiParams(appParams) {
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
