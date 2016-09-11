import Ember from 'ember';

export default Ember.Component.extend({
  curation: Ember.inject.service(),

  // Whenever the user selects a different node,
  streams: Ember.computed('node', function() {
    const nodeId = this.get('node.id');
    // TODO: Stream manager is really more a service than a model...
    const coll = Ember.getOwner(this).lookup('model:stream-collection');
    // Fetch a new set of streams for that node.
    const streams = coll.createFor(nodeId);
    const obsProps = this.get('curation').observedPropertiesFor('array_of_things');
    // Insert all streams into the right observed property object.
    const propMap = {};
    for (let prop of obsProps) {
      // Assign
      prop.stream = streams[prop.id];
      propMap[prop.id] = prop;
      // obsProps[prop].stream = streams[prop];
    }
    console.log(propMap);
    return propMap;

    // return coll.createFor(nodeId);
  })
});
