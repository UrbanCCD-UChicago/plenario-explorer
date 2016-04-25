import Ember from 'ember';

export default Ember.Route.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),
  
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('loading', true);
  },

  model(params) {
    const datasetName = params.dataset_name;
    const meta = this.get('query').shapeMetadata(datasetName);
    return meta.then(payload => {
      if (!payload) {
        this.transitionTo('index');
        this.get('notify').error(`Could not find dataset named ${datasetName}.`);
      }
      // Let controller fetch map data asynchronously.
      return payload;
    }, reason => {
      this.transitionTo('index');
      this.get('notify').error(`Data error: ${reason}`);
    });
  }
});
