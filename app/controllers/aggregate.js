import Ember from 'ember';
import QueryConverter from '../utils/query-converter';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'geoJSON'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,
  geoJSON: null,
  queryHash: Ember.computed('obs_date__le', 'obs_date__ge', 'agg', 'geoJSON', function() {
    return {
      obs_date__le: this.get('obs_date__le'),
      obs_date__ge: this.get('obs_date__ge'),
      agg: this.get('agg'),
      geoJSON: this.get('geoJSON')
    };
  }),
  zoom: false,
  timeseriesList: [],

  actions: {
    submit: function(params) {
      console.log(params);
      this.transitionToRoute('aggregate', {queryParams: params});
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
    this.launchTimeseriesQueries();
  }),

  launchTimeseriesQueries() {
    let model = this.get('model');
    let arrivalOrder = 1;

    model.pointDatasets.forEach((d)=>{
      // Generate the id of the timeseries we want
      let datasetName = d.get('datasetName');
      let queryProps = this.getProperties(this.get('queryParams'));
      queryProps['dataset_name'] = datasetName;
      let id = new QueryConverter().fromHash(queryProps).toId();
      // Then launch the query
      let tsPromise = this.store.findRecord('timeseries', id);
      var self = this;

      tsPromise.then(function(value){
        console.log(value);
        d.set('series', value.get('series'));
        d.set('arrivalOrder', arrivalOrder);
        arrivalOrder++;
        self.get('timeseriesList').pushObject(d);
        let tsl = self.get('timeseriesList');
        console.log(tsl.get('firstObject').get('datasetName'),
                    tsl.get('lastObject').get('datasetName'));
      }, function(reason){
        console.log(reason);
        window.r = reason;
      });

    });
  }

});
