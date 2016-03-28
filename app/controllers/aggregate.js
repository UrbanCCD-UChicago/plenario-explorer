import Ember from 'ember';
import QueryConverter from '../utils/query-converter';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,
  location_geom__within: null,
  queryHash: Ember.computed('obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within', function() {
    return {
      obs_date__le: this.get('obs_date__le'),
      obs_date__ge: this.get('obs_date__ge'),
      agg: this.get('agg'),
      location_geom__within: this.get('location_geom__within')
    };
  }),
  zoom: false,
  timeseriesList: [],

  actions: {
    submit: function(params) {
      // Re-set the query params
      // and trigger a model reload if any have changed.
      this.setProperties(params);

      // We need to nudge leaflet to zoom in on
      // the shape the user has drawn.
      this.set('zoom', true);
      const self = this;
      Ember.run.next(() => {
        self.set('zoom', false);
      });
    },
    reset: function () {
      this.transitionToRoute('index');
    },
    navigateToShape: function(name) {
      alert(`Imagine you just transitioned to ${name} shape detail page.`);
    },
    navigateToPoint: function(name) {
      alert(`Imagine you just transitioned to ${name} point detail page.`);
    },
    downloadShape: function(name, fileType) {
      alert(`Downloading shape dataset ${name} as file type ${fileType}.`);
    },
    downloadPoint: function(name, fileType) {
      alert(`Downloading point dataset ${name} as file type ${fileType}.`);
    }
  },

  modelArrived: Ember.observer('model', function() {
    // Clear the old set of timeseries derived from
    // the dataset candidates.
    this.get('timeseriesList').clear();
    // Launch a new set of timeseries queries from the new candidates.
    this.launchTimeseriesQueries();
  }),
  
  /**
   * For each candidate dataset,
   * query the matching timeseries
   * and push datasets with nonempty timeseries onto
   * the timeseriesList to display.
   */
  launchTimeseriesQueries() {
    let model = this.get('model');
    let arrivalOrder = 1;
    model.pointDatasets.forEach((d)=>{
      // Generate the id of the timeseries we want
      let datasetName = d.get('datasetName');
      let queryProps = this.getProperties(this.get('queryParams'));
      queryProps['dataset_name'] = datasetName;
      let id = new QueryConverter().fromHash(queryProps).toId();

      // Then launch the query.
      let tsPromise = this.store.findRecord('timeseries', id);
      let timeseriesList = this.get('timeseriesList');
      tsPromise.then(function(value){
        const count = value.get('count');
        if (count === 0) {
          // Empty timeseries. Don't display it.
          return;
        }
        d.set('count', count);
        d.set('series', value.get('series'));
        d.set('arrivalOrder', arrivalOrder);
        arrivalOrder++;
        timeseriesList.pushObject(d);
      }, function(reason){
        // Maybe think on a better way to handle failures
        console.log(reason);
      });

    });
  }

});
