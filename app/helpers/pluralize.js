import Ember from 'ember';

export function pluralize(params/*, hash*/) {
  let noun = params[0];
  let len = params[1];
  if (len === 1) {
    return noun;
  }
  else {
    return noun + 's';
  }
}

export default Ember.Helper.helper(pluralize);
