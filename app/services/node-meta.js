import Ember from 'ember';

export default Ember.Service.extend({
    selectedNodes: Ember.A([]),
    
    select(node) {
        var selectedNodes = this.get('selectedNodes');
        if (selectedNodes.contains(node)) 
            selectedNodes.removeObject(node);
        else
            selectedNodes.push(node);
    }
});