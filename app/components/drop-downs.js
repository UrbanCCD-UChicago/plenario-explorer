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

  aggOptions: ([
    {id: 'day', label: 'day'},
    {id: 'week', label: 'week'},
    {id: 'month', label: 'month'},
    {id: 'quarter', label: 'quarter'},
    {id: 'year', label: 'year'}
  ]),

  resOptions: ([
    {id: '100', label: '100 meters'},
    {id: '200', label: '200 meters'},
    {id: '300', label: '300 meters'},
    {id: '400', label: '400 meters'},
    {id: '500', label: '500 meters'},
    {id: '1000', label: '1 kilometer'}
  ]),

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
