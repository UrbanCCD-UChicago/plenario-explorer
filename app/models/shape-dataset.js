import DS from 'ember-data';

export default DS.Model.extend({
  humanName: DS.attr('string'),
  dateAdded: DS.attr('date'),
  viewURL: DS.attr('string'),
  sourceURL: DS.attr('string'),
  numShapes: DS.attr('number'),
  updateFreq: DS.attr('string')
});
