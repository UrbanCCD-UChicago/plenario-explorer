import Ember from 'ember';
import moment from 'moment';

export function timespan(params) {
  const [start, end] = params;
  // true parameter sets return format to
  // "5 days" instead of "5 days ago"
  return moment(start).from(moment(end), true);
}

export default Ember.Helper.helper(timespan);
