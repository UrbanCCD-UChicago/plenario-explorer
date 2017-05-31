import Ember from 'ember';

export function pluralize(params/* , hash*/) {
  const noun = params[0];
  const len = params[1];
  if (len === 1) {
    return noun;
  }

  return `${noun}s`;
}

export default Ember.Helper.helper(pluralize);
