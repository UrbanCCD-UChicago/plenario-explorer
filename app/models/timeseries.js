import DS from 'ember-data';

export default DS.Model.extend({
  // Array of objects {datetime: 'YYYY-MM-DD'}
  series: DS.attr()
  // Readonly Nested data instead of explicit relationship to a PointDataset model
  // until the plenar.io API gets a more powerful point dataset index endpoint.
  // https://guides.emberjs.com/v2.4.0/models/relationships/#toc_readonly-nested-data
  //dataset: DS.attr()
});
