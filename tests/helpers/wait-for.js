import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitFor', (app, ms) => {
  Ember.run.later(() => {}, ms);
  return app.testHelpers.wait();
});
