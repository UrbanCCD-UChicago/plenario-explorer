import Ember from 'ember';

/*
 Expects default date string in MM/DD/YYYY format.
 Displays in MM/DD/YYYY format.
 Reports back pickedString in YYYY-MM-DD format (what the API wants)
 */

export default Ember.Component.extend({
  pickedDate: null,

  didReceiveAttrs() {
    this.setDefaultString();
  },

  _pickedString: Ember.computed('pickedDate', function() {
    const pickedDate = this.get('pickedDate');
    if (!pickedDate) {
      var _pickedString = this.setDefaultString();
    }
    else {
      _pickedString = this.dashFormat(pickedDate);
      this.set('pickedString', _pickedString);
    }
    return _pickedString;
  }),

  setDefaultString() {
    const defaultDate = this.get('default');
    const _pickedString = this.dashFormat(defaultDate);
    this.set('pickedString', _pickedString)
    return _pickedString;
  },

  dashFormat(dt) {
    const date = new Date(dt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
  }

});
