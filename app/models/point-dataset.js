import DS from 'ember-data';

export default DS.Model.extend({
  attribution: DS.attr('string'),
  description: DS.attr('string'),
  sourceURL: DS.attr('string'),
  obsFrom: DS.attr('date'),
  obsTo: DS.attr('date'),
  humanName: DS.attr('string'),
  updateFreq: DS.attr('string')
});
