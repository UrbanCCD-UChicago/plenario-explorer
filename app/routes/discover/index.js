import Ember from 'ember';

export default Ember.Route.extend({
  query: Ember.inject.service('query'),
  model() {
    console.log('Grabbing models!');
    return Ember.RSVP.hash({
      pointDatasets: this.get('query').allEventMetadata(),
      shapeDatasets: this.get('query').allShapeMetadata()
    });
  }
});
