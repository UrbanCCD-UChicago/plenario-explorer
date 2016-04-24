import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  discoverController: Ember.inject.controller('discover'),
  qHash: Ember.computed.reads('discoverController.queryParamsHash'),

  timeseriesList: [],

  _detailTransition(pageName, datasetName) {
    let params = this.get('qHash');
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
      let params = this.get('qHash');
      params['data_type'] = fileType;
      console.log(params);
      this.get('query').rawShape(name, params, true);
    },

    downloadPoint: function(name, fileType) {
      let params = this.get('qHash');
      params['dataset_name'] = name;
      params['data_type'] = fileType;
      this.get('query').rawEvents(params, true);
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
    let timeseriesList = this.get('timeseriesList');
    let arrivalOrder = 1;

    this.get('model').pointDatasets.forEach((d)=> {
      let params = this.get('qHash');
      Ember.assign(params, {dataset_name: d.datasetName});
      const tsPromise = this.get('query').timeseries(params);

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
