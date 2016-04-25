import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),

  queryParams: ['filters', 'agg', 'resolution',
                'obs_date__le', 'obs_date__ge', 'location_geom__within'],
  filters: '[]',
  agg: 'week',
  resolution: '500',
  obs_date__le: null,
  obs_date__ge: null,
  location_geom__within: null,

  loading: true,

  queryParamsHash: Ember.computed('filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      console.log(params);
      params['dataset_name'] = this.get('model').datasetName;
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
    console.log('In event');

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
    console.log(qParams);
    const nService = this.get('notify');

    Ember.RSVP.hash({
      timeseries: qService.timeseries(qParams),
      grid: qService.grid(qParams)
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

    /**
     * We expect 'type' to be one of the following strings:
     * 'csvPoints': raw data, as CSV
     * 'geoJSONPoints': raw data, as geoJSON
     * 'grid': grid aggregation geoJSON
     * 'timeseries' timeseries aggregation CSV
     *
     * @param type
       */
    download(type) {
      let qParams = this.get('queryParamsHash');
      qParams['dataset_name'] = this.get('model').datasetName;
      const qService = this.get('query');

      switch (type) {
        case 'csvPoints':
          qParams['data_type'] = 'csv';
          qService.rawEvents(qParams, true);
          break;
        case 'geoJSONPoints':
          qParams['data_type'] = 'geojson';
          qService.rawEvents(qParams, true);
          break;
        case 'grid':
          qService.grid(qParams, true);
          break;
        case 'timeseries':
          qService.timeseries(qParams, true);
          break;
      }
    },

    exit() {
      const params = this.get('queryParams');
      if (this.get('location_geom__within')) {
        this.transitionToRoute('discover.aggregate', {queryParams: params});
      } else {
        this.transitionToRoute('discover.index', {queryParams: params});
      }
    }
  }
});
