import moment from 'moment';

export default function dateFormat(dt, type) {
  let date = moment();
  if(typeof dt === "string"){
    if(dt.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)){
      date = moment(dt, 'YYYY-MM-DD');
    } else if(dt.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)){
      date = moment(dt, 'MM/DD/YYYY');
    } else if(dt.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/)){
      date = moment(dt, 'YYYY/MM/DD');
    }
  } else if(dt instanceof Date){
    date = moment(dt);
  }
  if (type === 'display') {
    return date.format('MM/DD/YYYY');
  }
  else {
    return date.format('YYYY-MM-DD');
  }

}
