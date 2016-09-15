import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({
  modelArrived: Ember.observer('model', function() {
    const nodeList = this.get('model.nodes');
    const nodeTuples = nodeList.map(node => {
      return [node.properties.id, node.properties];
    });
    const nodeMap = new Map(nodeTuples);
    this.set('nodeMap', nodeMap);
    // TODO: Move magic node id to environment config
    this.set('selectedNode', nodeMap.get(ENV.defaultNode));
  }),

  actions: {
    onSelect(nodeId) {
      const newNode = this.get('nodeMap').get(nodeId);
      this.set('selectedNode', newNode);
    }
  }
});
