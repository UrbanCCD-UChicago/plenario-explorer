import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return params;
  },

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('ticket', "");
      controller.set('link', "");
      controller.set('started', false);
      controller.set('complere', false);
      controller.set('failed', false);
      controller.set('progress', 0);
      controller.set('parts', 0);
      controller.set('total', Infinity);
      controller.set('dowork', false);
    }
  }
});
