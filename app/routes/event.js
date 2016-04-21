import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

export default Ember.Route.extend({

  query: Ember.inject.service(),
  
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
  
  model(_, transition) {
    let qParams = transition.queryParams;
    const qService = this.get('query');
    const name = qParams.dataset_name;
    
    // If start and end dates weren't explicitly specified,
    // we need to pick reasonable defaults.
    if (!(Boolean(qParams.obs_date__ge) && Boolean(qParams.obs_date__le))) {
      // Fetch metadata first to find out date range.
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
    }
    else {
      //console.log('Specified!');
      return Ember.RSVP.hash({
        metadata: qService.eventMetadata(name),
        timeseries: qService.timeseries(name, qParams),
        grid: qService.grid(name, qParams)
      });
    }

  }
});
