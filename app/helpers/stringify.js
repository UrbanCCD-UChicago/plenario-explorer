import Ember from 'ember';

export function stringify(layer) {
  // Quack quack
  if (layer.toGeoJSON) {
    return JSON.stringify(layer.toGeoJSON());
  }
  return JSON.stringify(layer);
}

export default Ember.Helper.helper(stringify);
