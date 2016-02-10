import Ember from 'ember';

export function stringify(pojo) {
  return JSON.stringify(pojo);
}

export default Ember.Helper.helper(stringify);
