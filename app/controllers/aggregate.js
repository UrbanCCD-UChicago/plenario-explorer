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
    console.log(model);
    model.pointDatasets.forEach((d)=>{
      let datasetName = d.get('datasetName');
      let queryProps = this.getProperties(this.get('queryParams'));
      queryProps['dataset_name'] = datasetName;
      console.log(queryProps);
      //queryProps[]
    });
  }

});
