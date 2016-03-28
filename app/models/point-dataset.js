import DS from 'ember-data';

export default DS.Model.extend({
  // Attributes from the /datasets endpoint
  attribution: DS.attr('string'),
  description: DS.attr('string'),
  sourceURL: DS.attr('string'),
  obsFrom: DS.attr('date'),
  obsTo: DS.attr('date'),
  datasetName: DS.attr('string'),
  humanName: DS.attr('string'),
  updateFreq: DS.attr('string'),

  // The series and count attributes more properly belong
  // to a timeseries model.
  // The trouble is that in order to do a proper relationship,
  // we'd need to generate many possible IDs for each point dataset,
  // such that a dataset is actually a dataset associated with a set of filters.
  // Maybe it's possible to fetch a relationship with parameters?
  // Doing it "right" seemed like too much work.
  series: DS.attr(),
  count: DS.attr('number'),

  // A metadata attribute used to maintain ordering
  // in the point-aggregate-listing component.
  arrivalOrder: DS.attr('number')
});
