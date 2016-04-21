import Ember from 'ember';

export default Ember.Component.extend({



  init() {
    this._super(...arguments);
    this.resetActiveFilter();
    this.populateFields();
    this.populateOperators();
  },

  // Initialize options for the dropdown menus

  populateOperators() {
    const options = this.get('operators').map(op => {
      return {operator: op};
    });
    this.set('operatorOptions', options);
  },

  populateFields() {
    const meta = this.get('metadata');
    const fieldOptions = meta.columns.map(col => {
      const name = col.field_name;
      return {computerName: name, humanName: this.humanizeName(name)};
    });
    this.set('fieldOptions', fieldOptions);
  },

  operators: ['=', '>', '>=','<','<=','!=', 'LIKE','IN'],

  // operatorMap: {
  //   'eq': '=',
  //   'gt': '>',
  //   'ge': '>=',
  //   'lt': '<',
  //   'le': '<=',
  //   'ne': '!=',
  //   'ilike': 'LIKE',
  //   'in': 'IN'
  // },

  notComplete: Ember.computed('activeFilter.field',
                              'activeFilter.operator',
                              'activeFilter.value',
                              function() {
    const filter = this.get('activeFilter');
    return !Boolean(filter.field && filter.operator && filter.value);
  }),



  humanizeName(name) {
    return name.replace(/_/g, ' ')
      .replace(/(\w+)/g, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1);
      });
  },

  actions: {
    submit: function() {
      this.get('filters').pushObject(this.get('activeFilter'));
      this.resetActiveFilter();
    },
    removeFilter: function(index) {
      this.set('filters', this.get('filters').removeAt(index));
    }
  },

  makeNewFilter() {
    return Ember.Object.create({
      field: null,
      operator: null,
      value: null
    });
  },

  resetActiveFilter() {
    this.set('activeFilter', this.makeNewFilter());
  },

  activeFilterChanged: Ember.observer('activeFilter', function() {
    console.log(this.get('activeFilter'));
  })

});
