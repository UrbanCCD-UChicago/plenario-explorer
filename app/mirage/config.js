export default function() {

  this.get('/v1/api/detail-aggregate', () => {
    return '{meta:{status:"ok",query:{agg:"week",location_geom__within:{crs:{type:"name",properties:{name:"EPSG:4326"}},type:"Polygon",coordinates:[[[-87.64176964759827,41.850639123649636],[-87.64176964759827,41.881320144894765],[-87.59301781654358,41.881320144894765],[-87.59301781654358,41.850639123649636],[-87.64176964759827,41.850639123649636]]]},obs_date__ge:"2015-11-13T00:00:00",data_type:"json",obs_date__le:"2016-02-11T00:00:00"},message:[]},objects:[{count:44,datetime:"2015-11-09"},{count:104,datetime:"2015-11-16"},{count:104,datetime:"2015-11-23"},{count:117,datetime:"2015-11-30"},{count:112,datetime:"2015-12-07"},{count:120,datetime:"2015-12-14"},{count:115,datetime:"2015-12-21"},{count:123,datetime:"2015-12-28"},{count:115,datetime:"2016-01-04"},{count:132,datetime:"2016-01-11"},{count:111,datetime:"2016-01-18"},{count:97,datetime:"2016-01-25"},{count:47,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}]}';
  });

  this.get('/v1/api/detail-aggregate/slow', () => {
    return '{meta:{status:"ok",query:{agg:"week",location_geom__within:{crs:{type:"name",properties:{name:"EPSG:4326"}},type:"Polygon",coordinates:[[[-87.64176964759827,41.850639123649636],[-87.64176964759827,41.881320144894765],[-87.59301781654358,41.881320144894765],[-87.59301781654358,41.850639123649636],[-87.64176964759827,41.850639123649636]]]},obs_date__ge:"2015-11-13T00:00:00",data_type:"json",obs_date__le:"2016-02-11T00:00:00"},message:[]},objects:[{count:48,datetime:"2015-11-09"},{count:69,datetime:"2015-11-16"},{count:47,datetime:"2015-11-23"},{count:98,datetime:"2015-11-30"},{count:58,datetime:"2015-12-07"},{count:70,datetime:"2015-12-14"},{count:33,datetime:"2015-12-21"},{count:32,datetime:"2015-12-28"},{count:60,datetime:"2016-01-04"},{count:95,datetime:"2016-01-11"},{count:90,datetime:"2016-01-18"},{count:78,datetime:"2016-01-25"},{count:89,datetime:"2016-02-01"},{count:54,datetime:"2016-02-08"}]}';
  }, { timing: 3000 });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
