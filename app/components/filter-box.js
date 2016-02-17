import Ember from 'ember';

export default Ember.Component.extend({
  // Internal state of filter box
  _startDate: null,
  _endDate: null,
  _agg: null,

  didUpdateAttrs() {
    this.get('submit') ({
      startDate: this.get('_startDate'),
      endDate: this.get('_endDate'),
      agg: this.get('_agg'),
    })
  },

  aggOptions: ['day', 'week', 'quarter', 'month', 'year'],
  actions: {
    selectAgg(agg) {
      this.set('agg', agg);
    },
    changedStartDate(date){
      console.log('Filter box got the start change.');
      this.set('_startDate', date);
    },
    changedEndDate(date){
      console.log('Filter box got the end change.');
      this.set('_endDate', date);
    }
  }
});
