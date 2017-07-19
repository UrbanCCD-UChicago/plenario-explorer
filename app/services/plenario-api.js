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
    this.handle = this.handle();
  },

  fetch(self) {
    const ajax = self.get('ajax');
    return {

      core: (function () {
        return {

          dataset(endpoint, appQueryParams) {
            const qp = self.translateAppParamsToApiParams(appQueryParams);
            return ajax.request(endpoint, { data: qp })
              .then(self.handle.core.fulfilled, self.handle.core.rejected);
          },

          events(appQueryParams) {
            return this.dataset('datasets', appQueryParams);
          },

          shapes(appQueryParams) {
            return this.dataset('shapes', appQueryParams);
          },

        };
      }()),

      networks: (function () {
        return {

          features(network, appQueryParams) {
            const qp =
              self.fixSensorNetworkParams(self.translateAppParamsToApiParams(appQueryParams));
            return ajax.request(`/sensor-networks/${network}/features`, { data: qp })
              .then(self.handle.networks.fulfilled, self.handle.networks.rejected);
          },

        };
      }()),

    };
  },

  handle() {
    return {

      core: (function () {
        return {

          fulfilled(response) {
            return response.objects;
          },

          rejected(reason) {
            return reason;
          },

        };
      }()),

      networks: (function () {
        return {

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

        };
      }()),

    };
  },

  translateAppParamsToApiParams(appParams) {
    const apiParams = _.mapKeys(appParams, (value, key) => this.appParamsToApiParamsMap[key]);
    if (Array.isArray(apiParams.dataset_name__in)) {
      apiParams.dataset_name__in = apiParams.dataset_name__in.join(',');
    }
    return apiParams;
  },

  fixSensorNetworkParams(apiParams) {
    const qp = _.cloneDeep(apiParams);
    if (qp.location_geom__within) {
      qp.geom = qp.location_geom__within;
      delete qp.location_geom__within;
    }
    return qp;
  },

});
