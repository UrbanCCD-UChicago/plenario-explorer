import moment from 'moment';

export default function dateFormat(dt, type) {
  let date = moment();

  let formats = [
    moment.ISO_8601,
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'YYYY/MM/DD',
    'DD/MM/YYYY',
  ];

  if(dt instanceof Date){
    date = moment(dt);
  } else if(moment(dt, formats, true).isValid()){
    date = moment(dt, formats, true);
  } else {
    console.warn("FIXME: Using an unsupported format in dateFormat: "+String(dt)+". Falling back to moment(<<anything>>), which is going to be deprecated.");
    date = moment(dt);
  }

  if (type === 'display') {
    return date.format('MM/DD/YYYY');
  }
  else {
    return date.format('YYYY-MM-DD');
  }

}
