import moment from 'moment';

export default function prepTimeseries(ts) {
  /*
   Takes array of objects of the form [{count: 3, datetime: '2016-12-06'}...]
   Returns array of arrays of the form [[momentJSObject, integer]]
   */
  const formattedSeries = ts.map(function(timeSlice) {
    // Why exactly does `moment(timeSlice.datetime + "+0000").valueOf()` work
    // to let Highcharts accept datetimes on the x axis?
    // I don't know. Don't question it.
    return [moment(timeSlice.datetime + "+0000").valueOf(), timeSlice.count];
  });
  // The chart expects a list of series objects,
  // each with a data attribute that actually holds the timeseries.
  // So construct a list of one such object.
  return [{data: formattedSeries, name: 'Count'}];
}
