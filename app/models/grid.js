import DS from 'ember-data';

export default DS.Model.extend({
  // Array of GeoJSON documents,
  // one for each square in the grid,
  // each with a count of records found within.
  gridSquares: DS.attr()
});
