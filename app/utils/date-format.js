import Ember from 'ember';
import moment from 'moment';

export default function dateFormat(dt, type) {
  let date = moment();

  const formats = [
    moment.ISO_8601,
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'DD/MM/YYYY',
  ];

  if (dt instanceof Date) {
    date = moment(dt);
  } else if (moment(dt, formats, true).isValid()) {
    date = moment(dt, formats, true);
  } else {
    Ember.Logger.warn(`FIXME: Using an unsupported format in dateFormat: "${dt}". Falling back to Date(<<anything>>), which is unpredictable at best.`);
    date = moment(new Date(dt));
  }

  if (type === 'display') {
    return date.format('MM/DD/YYYY');
  }

  return date.format('YYYY-MM-DD');
}
