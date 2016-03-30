import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectAgg(newAgg) {
      // Report up when it changes
      this.get('changedAgg')(newAgg);
    }
  },
  aggOptions: ['day', 'week', 'quarter', 'month', 'year']
});
