import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  viewType: 'live',
  notify: Ember.inject.service(),
  refreshNodeChart: false,

  mapTileUrl: ENV.baseMapTileUrl,

  modelArrived: Ember.observer('model', function () {
    // When requesting a single node the API still returns a list (of length 1)
    const nodeList = this.get('model.nodes');
    const node = nodeList[0];
    this.set('node', node);
    this.set('nodeMeta', node.properties);
    this.set('center', node.geometry.coordinates.slice().reverse());
  }),

  actions: {
    download(params) {
      this.get('query').sensorDownload(params).then((resp) => {
        this.transitionToRoute('datadump.download', resp.ticket, { queryParams: { data_type: 'json' } });
      }).catch((error) => {
        Ember.Logger.log(error);
        this.get('notify').error('Could not process request. ' +
            'Try double-checking your request, and email plenario@uchicago.edu if the problem persists.');
      }
      );
    },
    exit() {
      this.transitionToRoute('index');
    },
  },
});
