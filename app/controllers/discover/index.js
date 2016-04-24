import Ember from 'ember';

export default Ember.Controller.extend({
  discoverController: Ember.inject.controller('discover'),
  query: Ember.inject.service(),
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
      this.get('query').rawShape(name, {file_type: fileType}, true);
    }
  }
});

