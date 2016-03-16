import DS from 'ember-data';

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
    var doc = {
      "data": {
        "type": "timeseries",
        "attributes": {
          "series": payload.objects
        }
      }
    };

    return doc;
  }
});
