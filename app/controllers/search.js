import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    doSearch(queryParams) {
      this.transitionToRoute('search.results', { queryParams });
    },
    resetSearch() {
      this.transitionToRoute('search');
    },
  },

});
