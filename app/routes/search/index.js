import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(transition) {
    // If there are any query parameters, redirect to the results route
    const { queryParams } = transition;
    if (Object.keys(queryParams).length > 0) {
      Ember.Logger.debug('Accessed search with existing params, transitioning to results route');
      this.transitionTo('search.results', { queryParams });
    }
  },

});
