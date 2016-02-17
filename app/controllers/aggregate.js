import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'geoJSON'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,
  geoJSON: null,

  // TODO: DRY index and aggregate controllers by sharing submit action
  actions: {
    submit: function(params) {
      console.log(params);
      this.transitionToRoute('aggregate', {queryParams: params});
    },
    reset: function () {
      this.transitionToRoute('index');
    }
  }
});
