import Ember from 'ember';
import moment from 'npm:moment';

export function formatDate(params, hash) {
  const formatStr = hash.format || 'l';
  return params
    .map(dateStr => moment(dateStr).format(formatStr))
    .join('\u2009–\u2009');
}

export default Ember.Helper.helper(formatDate);
