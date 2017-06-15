import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    doSearch(searchParams) {
      console.log(searchParams);
    },
  },

});
