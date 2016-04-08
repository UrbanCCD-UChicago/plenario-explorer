import Ember from 'ember';
import moment from 'moment';

/*
 Expects default date string in YYYY-MM-DD format (ISO 8601)
 and reports back pickedString in YYYY-MM-DD format (what the API wants)
 Displays in MM/DD/YYYY format.
 */

export default Ember.Component.extend({
  // Default API string passed in as param. REQUIRED
  placeholder: null,
  // Default display string, derived from param
  _placeholderDisplay: Ember.computed('placeholder', function() {
    return this.dateFormat(this.get('placeholder'), 'display');
  }),

  // API-formatted string ready to send up.
  _picked: Ember.observer('_pickedDate', function() {
    const pickedDate = this.get('_pickedDate');

    var apiFormatted = null;
    // If the user has cleared the box,
    if (!pickedDate) {
      // Report the default.
      apiFormatted = this.get('placeholder');
    }
    else {
      // Convert from Bootstrap format to Plenario format.
      apiFormatted = this.dateFormat(pickedDate);
    }
    // Report up to containing component
    this.get('changed')(apiFormatted);
  }),

  didReceiveAttrs() {
    // On init and when dateString changes,
    // enforce that the date is formatted correctly up the chain.
    this._super(...arguments);
    const placeholder = this.get('placeholder');
    const apiFormatted = this.dateFormat(placeholder);
    this.get('changed')(apiFormatted);
  },

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
