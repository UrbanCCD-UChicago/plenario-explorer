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
      keyboardNavigation: true,
    }).on('changeDate', (e) => {
      self.set('date', dateFormat(e.date));
    });
  },

  init() {
    this._super(...arguments);
    this.setText();
  },

  setText() {
    const date = this.get('date');
    this.set('_placeholder', dateFormat(date, 'display'));
  },
});
