import Ember from 'ember';

/*
 Expects default date string in YYYY-MM-DD format
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
    console.log('In pick listener');

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

  didUpdateAttrs() {
    this._super(...arguments);
    console.log('Updated datepicker')
  },

  didReceiveAttrs() {
    this._super(...arguments);
    // On init and when dateString changes.
    // Make a copy of the date string that was passed in
    let placeholder = this.get('placeholder');
    this.set('_placeholderDisplay', this.dateFormat(placeholder));
  },

  // Not using moment library here
  // Because bootstrap datepicker returns non-standard date format.
  dateFormat(dt, type) {
    const date = new Date(dt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (type === 'display') {
      return m + '/' + d + '/' + y;
    }
    else {
      return y + '-' + m + '-' + d;
    }
  }

});
