import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),

  queryParams: [
    'dataset_name',
    'filters',
    'agg',
    'resolution',
    'obs_date__le',
    'obs_date__ge',
    'location_geom__within'
  ],

  loading: true,
  agg: null,
  obs_date__le: null,
  obs_date__ge: null,
  resolution: null,
  location_geom__within: null,
  filters: null,

  queryParamsHash: Ember.computed('obs_date__le', 'obs_date__ge',
    'agg', 'location_geom__within', 'filters',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      for (const key of Object.keys(params)) {
        if (!params[key]) {
          delete params[key];
        }
      }
      return params;
    }
  ),

  /*
   The model we get from the route is just
   the metadata.
   We need to launch the appropriate calls
   to grab the widgets' data from here.

   */
  modelArrived: Ember.observer('model', function() {
    this.adjustDateRange();
    this.launchWidgetQueries();
  }),

  resetParams() {
    this.set('filters', '[]');
  },

  adjustDateRange() {
    // If the user did not explicitly specify start and end dates,
    // use the model's available range to pick a good default.
    const obs_date__le = this.get('obs_date__le');
    const obs_date__ge = this.get('obs_date__ge');
    const isSpecified = Boolean(obs_date__ge) && Boolean(obs_date__le);
    if (!isSpecified) {
      const model = this.get('model');
      this.set('obs_date__le', dateFormat(model.obsTo));
      this.set('obs_date__ge', dateFormat(moment(model.obsTo).subtract(90, 'days')));
    }
  },

  launchWidgetQueries(shouldRetry = true) {
    const qService = this.get('query');
    const qParams = this.get('queryParamsHash');
    const nService = this.get('notify');
    const name = qParams.dataset_name;

    Ember.RSVP.hash({
      timeseries: qService.timeseries(name, qParams),
      grid: qService.grid(name, qParams)
    }).then(result => {
      if (result.grid === undefined || result.timeseries === undefined) {
        if (shouldRetry) {
          this.resetParams();
          nService.error("Plenario couldn't interpret your query. Filters reset.");
          this.launchWidgetQueries(false);
          return;
        }
        else {
          nService.error('Unexpected state. Returning to the home page');
          this.transitionToRoute('discover');
        }
      }
      this.set('timeseries', result.timeseries);
      this.set('grid', result.grid);
      this.set('loading', false);
    });
  },

  actions: {
    refine() {
      this.set('loading', true);
      this.send('reload');
    },

    download(params, type) {
      // Open a download in a new tab.
    },

    exit(params) {
      // Go back to the discover
      // Unless geojson has been specified,
      // in which case go back to aggregate route.
    }
  }
});
