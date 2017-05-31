import Ember from 'ember';
import humanizeName from '../utils/humanize-name';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    this.renderFilters();
    this.resetActiveFilter();
    this.populateFields();
    this.populateOperators();
  },

  // Initialize options for the dropdown menus

  populateOperators() {
    const options = this.get('operators').map(op => ({ operator: op }));
    this.set('operatorOptions', options);
  },

  populateFields() {
    const meta = this.get('metadata');
    const fieldOptions = meta.columns.map((col) => {
      const name = col.field_name;
      return { computerName: name, humanName: humanizeName(name) };
    });
    this.set('fieldOptions', fieldOptions);
  },

  operators: ['=', '>', '>=', '<', '<=', '!=', 'LIKE', 'IN'],

  // Take in filters as JSON
  // And operate on them internally as JS objects.
  // When user adds or removes a filter,
  // mutate the passed in JSON accordingly.

  filtersChanged: Ember.observer('filters', function () {
    this.renderFilters();
  }),

  renderFilters() {
    const filterJSON = this.get('filters');
    this.set('filterHashes', JSON.parse(filterJSON));
  },

  mutateFilterJSON() {
    const hashes = this.get('filterHashes');
    this.set('filters', JSON.stringify(hashes));
  },

  actions: {
    madeSelection(fieldName, value) {
      this.set(fieldName, value);
    },
    submit() {
      this.get('filterHashes').pushObject(this.get('activeFilter'));
      this.mutateFilterJSON();
      this.resetActiveFilter();
    },
    removeFilter(index) {
      this.set('filterHashes', this.get('filterHashes').removeAt(index));
      this.mutateFilterJSON();
    },
  },

  // Manage the filter the user is currently editing

  notComplete: Ember.computed('activeFilter.field',
                              'activeFilter.op',
                              'activeFilter.val',
    function () {
      const filter = this.get('activeFilter');
      return !(filter.field && filter.op && filter.val);
    }),

  makeNewFilter() {
    return Ember.Object.create({
      field: null,
      op: null,
      val: null,
    });
  },

  resetActiveFilter() {
    this.set('activeFilter', this.makeNewFilter());
  },

});
