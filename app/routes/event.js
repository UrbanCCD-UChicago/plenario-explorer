import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

export default Ember.Route.extend({

  query: Ember.inject.service(),
  notify: Ember.inject.service('notify'),

  /**
   * Handles setting defaults for dates and agg units
   * so that model() can always expect those
   * to be present.
   *
   * @param transition
   */
  beforeModel(transition){
    let qParams = transition.queryParams;

    // Set defaults
    if (!qParams.filters) {
      qParams.filters = '[]';
    }
    if (!qParams.agg) {
      qParams.agg = 'week';
    }
    if (!qParams.resolution) {
      qParams.resolution = 500;
    }
  },

  actions: {
    reload: function() {
      this.refresh();
    }
  },

  defaultQuery(qParams) {
    const qService = this.get('query');
    const name = qParams.dataset_name;
    return qService.eventMetadata(name).then(function(meta) {
      qParams['obs_date__le'] = dateFormat(meta.obsTo);
      qParams['obs_date__ge'] = dateFormat(moment(meta.obsTo).subtract(90, 'days'));
      return Ember.RSVP.hash({
        metadata: meta,
        timeseries: qService.timeseries(name, qParams),
        grid: qService.grid(name, qParams)
      });
    }, function(reason) {
      console.log(reason);
    });
  },

  specifiedQuery(qParams) {
    const notifyService = this.get('notify');
    const qService = this.get('query');
    const name = qParams['dataset_name'];
    const fallback = this.defaultQuery.bind(this);

    return Ember.RSVP.hashSettled({
      metadata: qService.eventMetadata(name),
      timeseries: qService.timeseries(name, qParams),
      grid: qService.grid(name, qParams)
    }).then(function(result) {
      for (const key of Object.keys(result)) {
        if (result[key].value === undefined) {
          const message = `
          Could not process your query.
          Please edit your filters and try again.
          `;
          notifyService.error(message);
          // Reset query params to empty list.
          qParams['filters'] = '[]';
          return fallback(qParams);
        }
      }
      return {
        metadata: result.metadata.value,
        timeseries: result.timeseries.value,
        grid: result.grid.value
      };
    });
  },

  model(_, transition) {
    const qParams = transition.queryParams;
    // If start and end dates weren't explicitly specified,
    // we need to pick reasonable defaults.
    if (!(Boolean(qParams.obs_date__ge) && Boolean(qParams.obs_date__le))) {
      return this.defaultQuery(qParams);
    }
    else {
      return this.specifiedQuery(qParams);
    }

  }
});
