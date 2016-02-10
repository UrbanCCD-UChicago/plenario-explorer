import Ember from 'ember';

export function stringify(layer) {
  return JSON.stringify(layer);
}

export default Ember.Helper.helper(stringify);
