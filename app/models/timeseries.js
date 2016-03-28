import DS from 'ember-data';

export default DS.Model.extend({
  // Array of objects {datetime: 'YYYY-MM-DD', count: number}
  series: DS.attr(),
  // Count across all time slices
  count: DS.attr('number')
});
