import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    dismissIntro() {
      $('#collapse-intro').collapse('hide');
    },
  },
});
