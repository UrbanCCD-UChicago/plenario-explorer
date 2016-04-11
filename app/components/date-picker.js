import Ember from 'ember';
import dateFormat from '../utils/date-format';
import moment from 'moment';

/*
 Expects default date string in YYYY-MM-DD format (ISO 8601)
 and reports back pickedString in YYYY-MM-DD format (what the API wants)
 Displays in MM/DD/YYYY format.
 */

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const date = this.get('date');
    this.set('_placeholder', dateFormat(date, 'display'));
  },

  dateChanged: Ember.observer('_date', function() {
    // Mutate the passed in date
    // as the user changes her selection.
    const _date = this.get('_date');
    this.set('date', dateFormat(_date));
  }),

  dateFormat(dt, type) {
    const date = moment(dt);
    if (type === 'display') {
      return date.format('MM/DD/YYYY');
    }
    else {
      return date.format('YYYY-MM-DD');
    }
  }
});
