import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      pointDatasets: this.store.findAll('pointDataset'),
      shapeDatasets: this.store.findAll('shapeDataset')
    };
  }
});
