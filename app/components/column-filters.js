import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    this.resetActiveFilter();
  },

  fieldOptions: ([
    {computer_name: 'foo', human_name: 'Foo'},
    {computer_name: 'bar_baz', human_name: 'Bar Baz'},
    {computer_name: 'gorp', human_name: 'Gorp'}
  ]),

  operatorOptions: ([
    {operator_name: 'foo', operator_symbol: '!='},
    {operator_name: 'bar_baz', operator_symbol: '>'},
    {operator_name: 'gorp', operator_symbol: '<'}
  ]),

  notComplete: Ember.computed('activeFilter.field',
                              'activeFilter.operator',
                              'activeFilter.value',
                              function() {
    const filter = this.get('activeFilter');
    return !Boolean(filter.field && filter.operator && filter.value);
  }),

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
