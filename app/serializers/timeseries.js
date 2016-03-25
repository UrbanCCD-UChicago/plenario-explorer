import DS from 'ember-data';
import moment from 'moment';


//Timeseries endpoint has structure of
/*{
   meta: {
      status: "ok",
      query: {},
      message: [ ]
   },
   objects: [
     {
       count: 44,
       datetime: "2015-11-09"
     },
     {
       count: 104,
       datetime: "2015-11-16"
     },
   ]
 }*/

export default DS.JSONSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    //console.log(payload);
    return {
      "data": {
        "type": "timeseries",
        "id": id,
        "attributes": {
          "series": this.prepTimeseries(payload.objects)
        }
      }
    };
  },
  prepTimeseries(ts) {
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
  // NB: name: 'Count' determines chart tooltip.
  // Easy to override in application if desired
  return [{data: formattedSeries, name: 'Count'}];
}
});
