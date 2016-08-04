import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return params;
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('ticket', "");
      controller.set('worker', null);
      controller.set('link', "");
      controller.set('started', false);
      controller.set('complete', false);
      controller.set('failed', false);
      controller.set('progress', 0);
      controller.set('parts', 0);
      controller.set('total', Infinity);
      controller.set('dowork', false);
      controller.set('queueTime', undefined);
      controller.set('startTime', undefined);
      controller.set('elapsed', "0s");
      controller.set('remaining', "calculating...");
    }
  }
});
