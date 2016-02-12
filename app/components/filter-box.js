import Ember from 'ember';

export default Ember.Component.extend({
  aggOptions: ['day', 'week', 'quarter', 'month', 'year'],
  actions: {
    selectAgg(agg) {
      this.set('agg', agg);
    }
  }
});
