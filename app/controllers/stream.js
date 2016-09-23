import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['viewType', 'nodeId'],

  viewType: 'live',

  modelArrived: Ember.observer('model', function() {
    const nodeList = this.get('model.nodes');
    const nodeTuples = nodeList.map(node => {
      return [node.properties.id, node.properties];
    });
    const nodeMap = new Map(nodeTuples);
    this.set('nodeMap', nodeMap);
    this.set('nodeId', nodeList[0].properties.id);
  }),

  selectedNodeMeta: Ember.computed('nodeId', function() {
    const nodeMap = this.get('nodeMap');
    return nodeMap.get(this.get('nodeId'));
  }),

  actions: {
    onSelect(nodeId) {
      this.set('nodeId', nodeId);
    }
  }
});
