import Ember from 'ember';

export default Ember.Route.extend({

  query: Ember.inject.service(),

  /**
   * Handles setting defaults for dates and agg units
   * so that model() can always expect those
   * to be present.
   *
   * @param transition
   */
  beforeModel(transition){
    let qParams = transition.queryParams;

    // Set defaults
    if (!qParams.filters) {
      qParams.filters = '[]';
    }
    if (!qParams.agg) {
      qParams.agg = 'week';
    }
    if (!qParams.resolution) {
      qParams.resolution = 500;
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('loading', true);
  },

  actions: {
    reload: function() {
      this.refresh();
    }
  },

  model(_, transition) {
    const name = transition.queryParams.dataset_name;
    return this.get('query').eventMetadata(name).then(meta => {
      return meta;
    });
  }
});
