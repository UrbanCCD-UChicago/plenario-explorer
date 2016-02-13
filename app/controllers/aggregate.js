import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,

  // TODO: DRY controllers by making base controller
  // with these actions for /aggregate and /index
  actions: {
    submit: function (geoJSON, startDate, endDate, agg) {
      this.transitionToRoute('aggregate/${geoJSON}', {
        queryParams: {
          obs_date__ge: startDate,
          obs_date__le: endDate,
          agg: agg
        }
      });
    },
    reset: function () {
      this.transitionToRoute('index');
    }
  }
});
