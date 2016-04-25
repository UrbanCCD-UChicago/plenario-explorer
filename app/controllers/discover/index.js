import Ember from 'ember';

export default Ember.Controller.extend({
  //discoverController: Ember.inject.controller('discover'),
  query: Ember.inject.service(),
  //params: Ember.computed.reads('discover.queryParamsHash'),

  // _detailTransition(pageName, datasetName) {
  //   //const parent = this.get('discoverController');
  //   //console.log(this.get('params'));
  //   //let params = parent.get('queryParamsHash');
  //   //console.log(parent.get('queryParamsHash'));
  //   //parent.set('obs_date__le', null);
  //   //parent.set('obs_date__ge', null);
  //
  //   //let params = this.get('params');
  //   //params['dataset_name'] = datasetName;
  //   this.transitionToRoute(pageName, {queryParams: {dataset_name: datasetName}});
  // },

  actions: {
    navigateToShape: function(name) {
      this.transitionToRoute(`/shape/${name}`);
    },
    navigateToPoint: function(name) {
      this.transitionToRoute(`/event/${name}`);
    },
    downloadShape: function(name, fileType) {
      this.get('query').rawShape(name, {data_type: fileType}, true);
    }
  }
});

