import Ember from 'ember';

const LightTableSearchResults = Ember.Component.extend({

  sortBy: undefined,
  sortDir: 'asc',
  filterBy: '',

  sortRows: Ember.observer('sortBy', 'sortDir', function () {
    Ember.run.once(this, 'applySort');
  }),

  filterChanged: Ember.observer('filterBy', function () {
    Ember.run.once(this, 'applyFilter');
  }),

  applyFilter() {
    // TODO: index properties so searching is faster
    const filterBy = this.get('filterBy').toLowerCase();
    const rows = this.get('table.rows');
    const cols = this.get('table.columns').filter(col => col.valuePath !== null);
    rows.forEach((row) => {
      const isMatch = cols.some((col) => {
        const cellRawValue = row.content[col.valuePath];
        const cellFormatFunc = col.format;
        const cellValue = cellFormatFunc ? cellFormatFunc(cellRawValue) : cellRawValue;
        return cellValue.toString().toLowerCase().includes(filterBy);
      });
      Ember.set(row, 'hidden', !isMatch);
    });
  },

  applySort() {
    const sortBy = this.get('sortBy');
    if (!sortBy) {
      return;
    }
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
  positionalParams: ['table'],
});

export default LightTableSearchResults;
