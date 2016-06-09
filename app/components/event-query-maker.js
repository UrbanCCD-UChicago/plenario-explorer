import Ember from 'ember';

export default Ember.Component.extend({
  // I'm gonna start out by duplicating a lot from aggregate-query-maker
  // then try to circle back and find the right abstraction.

  _startDate: null,
  _endDate: null,
  _agg: null,
  _resolution: null,
  _filters: null

});
