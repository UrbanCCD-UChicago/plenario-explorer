import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    madeSelection: function (fieldName, value) {
      this.set(fieldName, value);
    }
  }
});
