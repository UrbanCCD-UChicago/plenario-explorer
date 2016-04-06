import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  // I'm gonna start out by duplicating a lot from aggregate-query-maker
  // then try to circle back and find the right abstraction.
  _startDate: null,
  _endDate: null,
  _agg: null,
  _resolution: null,
  _filters: null,

  defaults: {
    'startDate': moment().subtract(90, 'days').toString(),
    'endDate': moment().toString(),
    'agg': 'week',
    'resolution': 500
  },

  setDefaults() {
    let defaults = this.defaults;
    for (let attr in defaults) {
      if (attr === "filters") {
        // "filters" needs special treatment.
        continue;
      }
      let val = this.get(attr);
      if (!val) {
        val = defaults[attr];
      }
      this.set('_' + attr, val);
    }
    // Perform special treatment of "filters" here.
    
  },

});
