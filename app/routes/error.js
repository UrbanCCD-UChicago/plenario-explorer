import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    if(params.error_message) {
      return params.error_message;
    } else {
      return "Unknown Error.";
    }
  },
  afterModel(){
    Ember.run.later(this, function(){
      this.transitionTo('index');
    }, 1500);
  }
});
