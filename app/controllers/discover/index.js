import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),

  actions: {
    navigateToShape: function(name) {
      this.transitionToRoute(`/shape/${name}`);
    },
    navigateToPoint: function(name) {
      this.transitionToRoute(`/event/${name}`);
    },
    downloadShape: function(name, fileType) {
      this.get('query').rawShape(name, {data_type: fileType}, true);
    }
  }
});

