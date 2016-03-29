import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),
  model() {
    return {
      pointDatasets: this.store.findAll('pointDataset'),
      shapeDatasets: this.store.findAll('shapeDataset')
    };
  },
  willTransition() {
    
  }
  //afterModel() {
  //  this.get('notify').info('Hello there!');
  //}
});
