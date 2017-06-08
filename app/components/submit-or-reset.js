import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submitQuery() {
      this.get('submit')();
      return true;
    },
    resetQuery() {
      this.get('reset')();
      return true;
    },
  },
});
