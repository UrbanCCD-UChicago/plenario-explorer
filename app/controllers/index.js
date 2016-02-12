import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToAggregate: function(geoJSON, startDate, endDate, agg) {
      this.transitionToRoute('aggregate/${geoJSON}', {queryParams:
        {obs_date__ge: startDate,
         obs_date__le: endDate,
         agg: agg}
      });
    },
    reset: function() {
      this.transitionToRoute('index');
    }
  }
});
