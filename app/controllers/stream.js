import Ember from 'ember';
// import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({
  modelArrived: Ember.observer('model', function() {
    const nodeList = this.get('model.nodes');
    const nodeTuples = nodeList.map(node => {
      return [node.properties.id, node.properties];
    });
    const nodeMap = new Map(nodeTuples);
    this.set('nodeMap', nodeMap);
    this.set('selectedNode', nodeList[0].properties);
  }),

  actions: {
    onSelect(nodeId) {
      const newNode = this.get('nodeMap').get(nodeId);
      this.set('selectedNode', newNode);
    }
  }
});
