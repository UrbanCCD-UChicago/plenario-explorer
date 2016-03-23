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
  timeseriesList: [{
    attribution: "City of Chicago",
    description: "All open graffiti removal requests made to 311 and all requests completed since January 1, 2011. The Department of Streets & Sanitation's Graffiti Blasters crews offer a vandalism removal service to private property owners. Graffiti Blasters employ blast trucks that use baking soda under high water pressure to erase painted graffiti from brick, stone and other mineral surfaces. They also use paint trucks to cover graffiti on the remaining surfaces. Organizations and residents may report graffiti and request its removal. 311 sometimes receives duplicate requests for graffiti removal. Requests that have been labeled as Duplicates are in the same geographic area and have been entered into 311’s Customer Service Requests (CSR) system at around the same time as a previous request. Duplicate reports/requests are labeled as such in the Status field,",
    view_url: "http://data.cityofchicago.org/api/views/hec5-y4x5/rows",
    source_url: "http://data.cityofchicago.org/api/views/hec5-y4x5/rows.csv?accessType=DOWNLOAD",
    bbox: {
      type: "Polygon",
      coordinates: [
        [
          [
            -87.9201468772724,
            41.6446953564915
          ],
          [
            -87.9201468772724,
            42.0226602680775
          ],
          [
            -87.5243810071102,
            42.0226602680775
          ],
          [
            -87.5243810071102,
            41.6446953564915
          ],
          [
            -87.9201468772724,
            41.6446953564915
          ]
        ]
      ]
    }
  }],

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
    //console.log(model);
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
        self.get('timeseriesList').pushObject(value);
      }, function(reason){
        console.log(reason);
        window.r = reason;
      });

    });
  }

});
