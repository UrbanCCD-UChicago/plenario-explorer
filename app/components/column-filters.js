import Ember from 'ember';

export default Ember.Component.extend({

  fieldOptions: ([
    {computer_name: 'foo', human_name: 'Foo'},
    {computer_name: 'bar_baz', human_name: 'Bar Baz Bar Baz Bar Baz Bar Baz Bar Baz'},
    {computer_name: 'gorp', human_name: 'Gorp'}
  ]),

  operatorOptions: ([
    {operator_name: 'foo', operator_symbol: '!='},
    {operator_name: 'bar_baz', operator_symbol: '>'},
    {operator_name: 'gorp', operator_symbol: '<'}
  ]),

  operator: null,
  field: null,

  actions: {
    submit: function() {
      console.log(this.get('activeFilter'));
    },
    removeFilter: function(index) {
      alert('Remove ' + index.toString());
    }
  },

  activeFilter: {
    field: null,
    operator: null,
    value: null
  }

  //arbitraryList: ['foo', 'bar', 'baz']

});
