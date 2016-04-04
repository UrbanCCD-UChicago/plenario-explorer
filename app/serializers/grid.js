import DS from 'ember-data';

/*
  /grid response is a straight-up geoJSON document.

  {
    "type":"FeatureCollection",
    "features":[
    {
      "geometry":{
        "type":"Polygon",
        "coordinates":[
          [
            [
              -87.63214889855203,
              41.876826253090584
            ],
            [
              -87.63214889855203,
              41.88132164531356
            ],
            [
              -87.63818230065871,
              41.88132164531356
            ],
            [
              -87.63818230065871,
              41.876826253090584
            ],
            [
              -87.63214889855203,
              41.876826253090584
            ]
          ]
        ]
      },
      "type":"Feature",
      "properties":{
        "count":42
      }
    },
    {
      "geometry":{
        "type":"Polygon",
        "coordinates":[
          [
            [
              -87.62611549644535,
              41.876826253090584
            ],
            [
              -87.62611549644535,
              41.88132164531356
            ],
            [
              -87.63214889855203,
              41.88132164531356
            ],
            [
              -87.63214889855203,
              41.876826253090584
            ],
            [
              -87.62611549644535,
              41.876826253090584
            ]
          ]
        ]
      },
      "type":"Feature",
      "properties":{
        "count":65
      }
    }
  ]
  }
*/



export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    return {
      "data": {
        "type": "grid",
        "id": id,
        "attributes": {
          "squares": payload
        }
      }
    };
  }
});
