import Ember from 'ember';

export default Ember.Route.extend({

  query: Ember.inject.service(),

  actions: {
    reload() {
      this.refresh();
    },
  },

  model(params) {
    return this.get('query').eventMetadata(params.dataset_name).then(meta => meta);
  },
});
