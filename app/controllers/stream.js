import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onClick(marker) {
      console.log(marker);
    }
  }
});
