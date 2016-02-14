import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,

  // TODO: DRY index and aggregate controllers by sharing submit action
  actions: {
    submit: function(params) {
      const geoJSON = params.geom;
      delete params.geom;
      this.transitionToRoute('aggregate', geoJSON, {queryParams: params});
    },
    reset: function () {
      this.transitionToRoute('index');
    }
  }
});
