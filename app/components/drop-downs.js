import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const agg = this.get('agg');
    const res = this.get('res');
    const optionState = Ember.Object.create({
      agg: agg,
      res: res
    });
    this.set('optionState', optionState);
  },

  aggOptions: [],

  resoptions: [],

  didUpdateAttrs() {
    this.set('optionState.agg', this.get('agg'));
    this.set('optionState.res', this.get('res'));
  },

  changedAgg: Ember.observer('optionState.agg', function() {
    const newAgg = this.get('optionState.agg');
    this.set('agg', newAgg);
  }),

  changedRes: Ember.observer('optionState.res', function() {
    const newRes = this.get('optionState.res');
    this.set('res', newRes);
  })

});
