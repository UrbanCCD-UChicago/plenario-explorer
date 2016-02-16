import Ember from 'ember';

/*
 Expects default date string in YYYY-MM-DD format
 and reports back pickedString in YYYY-MM-DD format (what the API wants)
 Displays in MM/DD/YYYY format.
 */

export default Ember.Component.extend({
  didReceiveAttrs() {
    // Make a copy of the date string that was passed in
    let placeholder = this.get('pickedString');
    console.log(placeholder)
    const copy = this.dateFormat(placeholder.slice(0), 'display');
    this.set('_placeholder', copy);
    this.setDefaultString();
  },

  // Need a private '_pickedString' so that the `pickedString` value passed in
  // doesn't overwrite the computed property.
  // `pickedString` without an underscore is the value we mutate
  // to report back to the containing component.
  _pickedString: Ember.computed('_pickedDate', function() {
    const pickedDate = this.get('_pickedDate');
    console.log('pickedDate');
    if (!pickedDate) {
      var pickedString = this.setDefaultString();
    }
    else {
      pickedString = this.dateFormat(pickedDate);
      this.set('pickedString', pickedString);
    }
    return pickedString;
  }),

  setDefaultString() {
    const defaultDate = this.get('_placeholder');
    const pickedString = this.dateFormat(defaultDate);
    this.set('pickedString', pickedString);
    return pickedString;
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
