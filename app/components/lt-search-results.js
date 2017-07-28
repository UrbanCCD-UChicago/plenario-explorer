import Ember from 'ember';
import _ from 'npm:lodash';
import Table from 'ember-light-table';

const LightTableSearchResults = Ember.Component.extend({

  sortBy: undefined,
  sortDir: 'asc',
  filterBy: '',

  table: Ember.computed('rowsWithIndexStr.[]', 'columns', function () {
    return new Table(
      this.get('columns'),
      this.get('rowsWithIndexStr')
    );
  }),

  rowsWithIndexStr: Ember.computed('rows.[]', 'columns', function () {
    const rows = this.get('rows');
    const cols = _.filter(this.get('columns'), 'valuePath');
    _.forEach(rows, (row) => {
      let indexStr = '';
      _.forEach(cols, (col) => {
        const cellRawValue = row[col.valuePath];
        const cellFormatFunc = col.format;
        const cellValue = cellFormatFunc ? cellFormatFunc(cellRawValue) : cellRawValue;
        indexStr += `${cellValue.toString()}¶`;
      });
      indexStr = _.lowerCase(indexStr);
      Ember.set(row, 'indexStr', indexStr);
    });
    return rows;
  }),

  selectionChanged: Ember.observer('table.selectedRows.[]', function () {
    this.sendAction('onSelectionChanged',
      this.get('elementId'),
      this.get('table.selectedRows')
    );
  }),

  sortChanged: Ember.observer('sortBy', 'sortDir', function () {
    Ember.run.once(this, 'applySort');
  }),

  filterChanged: Ember.observer('filterBy', function () {
    Ember.run.once(this, 'applyFilter');
  }),

  applyFilter() {
    const filterBy = _.lowerCase(this.get('filterBy'));
    const rows = this.get('table.rows');
    _.forEach(rows, (row) => {
      const isMatch = _.includes(row.content.indexStr, filterBy);
      Ember.set(row, 'hidden', !isMatch);
    });
  },

  applySort() {
    const sortBy = this.get('sortBy');
    if (!sortBy) {
      return;
    }
    // TODO: use Lodash for this
    const sortedRows = this.get('table.rows').sortBy(`content.${sortBy}`);
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

LightTableSearchResults.reopenClass({
  positionalParams: ['rows'],
});

export default LightTableSearchResults;
