import Ember from 'ember';

export default Ember.Component.extend({

  // Whenever the user selects a different node,
  streams: Ember.computed('node', function() {
    const nodeId = this.get('node.id');
    // TODO: Stream manager is really more a service than a model...
    const coll = Ember.getOwner(this).lookup('model:stream-collection');
    // Fetch a new set of streams for that node.
    return coll.createFor(nodeId);
  })
});
