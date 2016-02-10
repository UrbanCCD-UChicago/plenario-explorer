import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectAgg(agg) {
      this.set('agg', agg);
    }
  }
});
