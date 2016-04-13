import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    navigateToShape: function(name) {
      this._detailTransition('shape', name);
    },
    navigateToPoint: function(name) {
      this._detailTransition('event', name);
    },
    downloadShape: function(name, fileType) {
      // Open new tab with raw download link.
      window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
    }
  }
});

