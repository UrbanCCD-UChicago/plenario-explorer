import Ember from "ember";

export default Ember.Controller.extend({
  queryParams: ['viewType', 'nodeId'],
  query: Ember.inject.service(),
  viewType: 'live',
  notify: Ember.inject.service(),
  refreshNodeChart: false,

  modelArrived: Ember.observer('model', function() {
    const nodeList = this.get('model.nodes');
    const nodeTuples = nodeList.map(node => {
      return [node.properties.id, node.properties];
    });
    const nodeMap = new Map(nodeTuples);
    this.set('nodeMap', nodeMap);
    if (!this.get('nodeId')) {
      this.set('nodeId', nodeList[2].properties.id); // TODO: stop using node at index 2 once [0] stops timing out
    }
  }),

  selectedNodeMeta: Ember.computed('nodeId', function() {
    const nodeMap = this.get('nodeMap');
    return nodeMap.get(this.get('nodeId'));
  }),

  actions: {
    onSelect(nodeId) {
      this.set('nodeId', nodeId);
      this.toggleProperty('refreshNodeChart');
    },
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
