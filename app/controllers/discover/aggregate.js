import Ember from 'ember';
import QueryConverter from '../../utils/query-converter';

export default Ember.Controller.extend({
  postController: Ember.inject.controller('discover'),
  //queryParams: Ember.computed.reads('discover.queryParams'),
  //queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within'],

  timeseriesList: [],

  _detailTransition(pageName, datasetName) {
    let params = this.get('queryParams');
    params['dataset_name'] = datasetName;
    this.transitionToRoute(pageName, {queryParams: params});
  },

  actions: {
    submit: function() {
      this.send("reload");
    },
    navigateToShape: function(name) {
      this._detailTransition('shape', name);
    },
    navigateToPoint: function(name) {
      this._detailTransition('event', name);
    },
    downloadShape: function(name, fileType) {
      const qHash = this.getProperties(this.get('queryParams'));
      qHash['data_type'] = fileType;
      const qString = new QueryConverter().fromHash(qHash).toQueryString();
      window.open(`http://plenar.io/v1/api/shapes/${name}${qString}`);
    },
    downloadPoint: function(name, fileType) {
      const qHash = this.getProperties(this.get('queryParams'));
      qHash['dataset_name'] = name;
      qHash['data_type'] = fileType;
      const qString = new QueryConverter().fromHash(qHash).toQueryString();
      window.open(`http://plenar.io/v1/api/detail${qString}`);
    }
  },

  modelArrived: Ember.observer('model', function() {
    // Clear the old set of timeseries derived from
    // the dataset candidates.
    this.get('timeseriesList').clear();
    // Launch a new set of timeseries queries from the new candidates.
    this.launchTimeseriesQueries();
  }),

  query: Ember.inject.service(),

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
      const datasetName = d.datasetName;
      const queryProps = this.getProperties(this.get('queryParams'));
      const tsPromise = this.get('query').timeseries(datasetName, queryProps);
      let timeseriesList = this.get('timeseriesList');

      tsPromise.then(function(value){
        if (value.count === 0) {
          return;  // Empty timeseries. Don't display it.
        }
        d['count'] = value.count;
        d['series'] = value.series;
        d['arrivalOrder'] = arrivalOrder;
        arrivalOrder++;
        timeseriesList.pushObject(d);
      }, function(reason){
        console.log(reason);
      });
    });
  }
});
