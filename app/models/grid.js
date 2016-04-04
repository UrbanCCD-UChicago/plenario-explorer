import DS from 'ember-data';

export default DS.Model.extend({
  // A GeoJSON feature collection,
  // with one feature representing a square in the grid tessellation
  // of the heatmap.
  squares: DS.attr()
});
