import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    Ember.run.later(this, function () {
      this.transitionTo('index');
    }, 1500);
  },
});
