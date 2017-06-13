import Ember from 'ember';
import moment from 'npm:moment';

export default Ember.Component.extend({


  aggregationOptions: ['hour', 'day', 'week'],

  startDateAsString: Ember.computed('startDate', {
    get(key) {
      return this.get('startDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value);
      if (momentDate.isValid()) {
        this.set('startDate', momentDate);
        return value;
      }
      return false;
    }
  }),

  endDateAsString: Ember.computed('endDate', {
    get(key) {
      return this.get('endDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value);
      if (momentDate.isValid()) {
        this.set('endDate', momentDate);
        return value;
      }
      return false;
    }
  }),

  actions: {
    resetForm() {
      this.setupInitialValues();
    }
  },

  init() {
    this._super(...arguments);
    this.setupInitialValues();
  },

  setupInitialValues() {
    this.set('startDate', moment().subtract(7, 'days').startOf('day'));
    this.set('endDate', moment().endOf('day'));
    this.set('aggregateBy', 'day');
  },

});
