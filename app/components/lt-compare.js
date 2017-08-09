import Ember from 'ember';
import _ from 'npm:lodash';
import Table from 'ember-light-table';

const LightTableCompare = Ember.Component.extend({

  sortBy: undefined,
  sortDir: 'asc',

  firstNSelectedByDefault: 5,

  init(...args) {
    this._super(...args);
    this.get('table.selectedRows'); // <-- This
    // is necessary because Ember is too focused on "being clever" to be functional in the real
    // world. If you don't ever call "get('thing')", changes to 'thing' won't fire observers
    // because Ember assumes (and makes an ass out of itself because it's stupid) you can't
    // possibly be depending on it for anything. Meanwhile it enforce data-down-actions-up, which
    // means you are almost guaranteed to waste time on dealing with what the Ember team themselves
    // call a "gotcha"
  },

  table: Ember.computed('rows.[]', 'columns', function () {
    return new Table(
      this.get('columns'),
      this.get('rows')
    );
  }),

  selectionChanged: Ember.observer('table.selectedRows.[]', function () {
    this.sendAction('onSelectionChanged', this.get('table.selectedRows'));
  }),

  sortChanged: Ember.observer('sortBy', 'sortDir', function () {
    Ember.run.once(this, 'applySort');
  }),

  applySort() {
    const sortBy = this.get('sortBy');
    if (!sortBy) {
      return;
    }
    const sortedRows = _.sortBy(this.get('table.rows'), `content.${sortBy}`);
    if (this.get('sortDir') === 'desc') {
      sortedRows.reverse();
    }
    this.set('table.rows', sortedRows);
  },

  actions: {
    onColumnClick(column) {
      if (column.sortable) {
        this.setProperties({
          sortBy: column.get('valuePath'),
          sortDir: column.get('ascending') ? 'asc' : 'desc',
        });
      }
    },
  },

});

LightTableCompare.reopenClass({
  positionalParams: ['rows'],
});

export default LightTableCompare;
