import Ember from "ember";

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  viewType: 'live',
  notify: Ember.inject.service(),
  refreshNodeChart: false,

  modelArrived: Ember.observer('model', function() {
    // When requesting a single node the API still returns a list (of length 1)
    const nodeList = this.get('model.nodes');
    this.set('node', nodeList[0]);
    this.set('nodeMeta', nodeList[0].properties);
  }),

  actions: {
    download(params) {
      this.get('query').sensorDownload(params).then(resp => {
        this.transitionToRoute('datadump.download', resp.ticket, {queryParams: {data_type: 'json'}});
      }).catch((error) => {
          console.log(error);
          this.get('notify').error('Could not process request. ' +
            'Try double-checking your request, and email plenario@uchicago.edu if the problem persists.');
        }
      );
    }
  }
});
