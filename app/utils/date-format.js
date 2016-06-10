import moment from 'moment';

export default function dateFormat(dt, type) {
  const date = moment(new Date(dt));
  if (type === 'display') {
    return date.format('MM/DD/YYYY');
  }
  else {
    return date.format('YYYY-MM-DD');
  }

}
