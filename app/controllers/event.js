import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),
  discoverController: Ember.inject.controller('discover'),
  datadumpIndexController: Ember.inject.controller('datadump.index'),

  queryParams: ['filters', 'agg', 'resolution',
                'obs_date__le', 'obs_date__ge', 'location_geom__within'],
  filters: '[]',
  agg: 'week',
  resolution: '500',
  obs_date__le: null,
  obs_date__ge: null,
  location_geom__within: null,

  queryParamsHash: Ember.computed('filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      params['dataset_name'] = this.get('model').datasetName;
      for (const key of Object.keys(params)) {
        if (!params[key]) {
          delete params[key];
        }
      }
      return params;
    }
  ),

  queryParamsClone() {
    return Ember.copy(this.get('queryParamsHash'));
  },

  //These centralized options are stored in the discover root controller
  aggOptions: Ember.computed('discoverController', function() {
    return this.get('discoverController').get('aggOptions');
  }),

  resOptions: Ember.computed('discoverController', function() {
    return this.get('discoverController').get('resOptions');
  }),

  /*
   The model we get from the route is just
   the metadata.
   We need to launch the appropriate calls
   to grab the widgets' data from here.
   */
  modelArrived: Ember.observer('model', function() {
    this.set('loading', true);
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
    const qParams = this.queryParamsClone();
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
      let qParams = this.queryParamsClone();
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
        case 'csvPointsDump':
          let queryCSV = Ember.copy(qParams);
          Ember.assign(queryCSV, {data_type: "csv"});
          // Reload to force-drop ongoing aggregate queries, allowing dataDump to start.
          this.get('datadumpIndexController').set('reload', true);
          this.transitionToRoute('datadump', {queryParams: queryCSV});
          break;
        case 'geoJSONPointsDump':
          let queryJSON = Ember.copy(qParams);
          Ember.assign(queryJSON, {data_type: "json"});
          // Reload to force-drop ongoing aggregate queries, allowing dataDump to start.
          this.get('datadumpIndexController').set('reload', true);
          this.transitionToRoute('datadump', {queryParams: queryJSON});
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
      const params = this.queryParamsClone();
      if (this.get('location_geom__within')) {
        this.transitionToRoute('discover.aggregate', {queryParams: params});
      } else {
        this.transitionToRoute('discover.index', {queryParams: params});
      }
    }
  }
});
