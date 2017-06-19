import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel(transition) {
    // If there are any query parameters, redirect to the results route
    const { queryParams } = transition;
    if (Object.keys(queryParams).length > 0) {
      this.transitionTo('search.results', { queryParams });
    }
  },

});
