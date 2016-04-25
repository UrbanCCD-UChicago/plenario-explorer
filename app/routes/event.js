import Ember from 'ember';

export default Ember.Route.extend({

  query: Ember.inject.service(),

  actions: {
    reload: function() {
      this.refresh();
    }
  },

  beforeModel(transition) {
    window.trans = transition;
    console.log(transition);
  },

  model(params, transition) {
    console.log(params);
    console.log(transition.queryParams);
    return this.get('query').eventMetadata(params.dataset_name).then(meta => {
      return meta;
    });
  }
});
