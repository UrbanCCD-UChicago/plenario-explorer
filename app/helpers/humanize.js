import Ember from 'ember';
import humanizeName from '../utils/humanize-name';

export function humanize(params/*, hash*/) {
  return humanizeName(params[0]);
}

export default Ember.Helper.helper(humanize);
