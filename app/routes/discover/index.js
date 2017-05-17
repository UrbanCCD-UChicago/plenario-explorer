import Ember from "ember";

export default Ember.Route.extend({
  query: Ember.inject.service('query'),
  model() {
    return Ember.RSVP.hash({
      nodes: this.get('query').allNodeMetadata(),
      sensorMetadata: this.get('query').allSensorMetadata(),
      pointDatasets: this.get('query').allEventMetadata(),
      shapeDatasets: this.get('query').allShapeMetadata()
    });
  },

  afterModel(){
    //Stop the spinner once loaded.
    this.controllerFor('discover').set('loadingMeta', false);
  }
});
