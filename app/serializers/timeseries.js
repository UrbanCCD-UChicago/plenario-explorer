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
    payload.data = {
      'id': JSON.stringify(payload.meta.query),
      'type': 'timeseries',
      'series': payload.objects
    };
    delete payload.meta;
    delete payload.objects;

    return this._super(...arguments);
  }
});
