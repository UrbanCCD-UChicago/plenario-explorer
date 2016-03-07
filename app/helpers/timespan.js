import Ember from 'ember';
import moment from 'moment';

export function timespan(params/*, hash*/) {
  let start = params[0], end = params[1];
  // true parameter is saying,
  // don't say "5 days ago". Just say "5 days"
  return moment(start).from(moment(end), true);
}

export default Ember.Helper.helper(timespan);
