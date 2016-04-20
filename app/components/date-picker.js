import Ember from 'ember';
import dateFormat from '../utils/date-format';

/*
 Displays in MM/DD/YYYY format.
 Mutates passed in "date" when the user makes a selection.
 Always places date in ISO 8601 format.
 */

export default Ember.Component.extend({
  didInsertElement() {
    const self = this;
    this.$('input').datepicker({
      keyboardNavigation: false
    }).on('changeDate', function(e) {
      self.set('date', dateFormat(e.date));
    });
  },

  didReceiveAttrs() {
    this.setText();
  },

  setText() {
    const date = this.get('date');
    this.set('_placeholder', dateFormat(date, 'display'));
  }
});
