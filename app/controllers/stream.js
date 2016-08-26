import Ember from 'ember';

export default Ember.Controller.extend({
  selectedNode: '00A',

  actions: {
    onSelect(nodeId) {
      this.set('selectedNode', nodeId);
    }
  }
});
