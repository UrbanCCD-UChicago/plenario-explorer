import Ember from 'ember';
import _ from 'npm:lodash';
import Table from 'ember-light-table';

const LightTableCompare = Ember.Component.extend({

  classNames: ['lt-compare'],

  sortBy: undefined,
  sortDir: 'asc',

  firstNSelectedByDefault: 5,

  init(...args) {
    this._super(...args);
    this.get('table.selectedRows'); // <-- This
    // is necessary because changes to an object won't fire observers unless the object is directly
    // consumed at least once

    _.forEach(this.get('table.rows'), (row) => {
      if (row.content.isTooLarge) {
        // eslint-disable-next-line no-param-reassign
        row.classNames = 'is-disabled text-muted';
      }
    });
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
