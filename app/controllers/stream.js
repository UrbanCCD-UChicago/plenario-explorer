import Ember from 'ember';

export default Ember.Controller.extend({
  selectedNode: null,

  actions: {
    onClick(event) {
      let {lat, lng} = event.latlng;
      const coordinatesKey = JSON.stringify([lng, lat]);
      this.set('selectedNode',
        this.get('coordinatesToNodeId').get(coordinatesKey)
      );
    }
  },

  // Need to create lookup table from lon-lat to node ids
  modelArrived: Ember.observer('model', function() {
    const nodeMapping = this.createNodeMapping(this.get('model').nodes);
    this.set('coordinatesToNodeId', nodeMapping);
  }),

  createNodeMapping(nodes) {
    const coordsToNodes = nodes.map(node => {
        const {geometry: {coordinates: coordinates}} = node;
        return [JSON.stringify(coordinates), node];
      });
    return new Map(coordsToNodes);
  }

});
