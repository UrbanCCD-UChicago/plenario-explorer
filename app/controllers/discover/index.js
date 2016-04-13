import Ember from 'ember';

export default Ember.Controller.extend({
  discoverController: Ember.inject.controller('discover'),
  params: Ember.computed.reads('discover.queryParams'),
  
  _detailTransition(pageName, datasetName) {
    let params = this.get('queryParams');
    delete params['obs_date__le'];
    delete params['obs_date__ge'];
    params['dataset_name'] = datasetName;
    this.transitionToRoute(pageName, {queryParams: params});
  },
  
  actions: {
    navigateToShape: function(name) {
      this._detailTransition('shape', name);
    },
    navigateToPoint: function(name) {
      this._detailTransition('event', name);
    },
    downloadShape: function(name, fileType) {
      // Open new tab with raw download link.
      window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
    }
  }
});

