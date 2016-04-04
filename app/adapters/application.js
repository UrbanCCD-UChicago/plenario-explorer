import DS from "ember-data";
import Ember from "ember";
import QueryConverter from '../utils/query-converter';

export default DS.RESTAdapter.extend({
  baseURL: 'http://plenar.io/v1/api',

  /**
   *
   * Helper for overriding Adapter methods.
   * Returns the Promise
   * that will resolve to the requested model.

   * Can insert an ID into a single-object response
   * or generate many IDs from a params hash
   * for an array of objects.
   *
   *
   * @param path Path of the resource after the API namespace, including
   * @param id If specified, save serialized object to the store with this ID.
   * @param params Hash of query parameters used to define filters used to grab
   *        a list of objects filtered by the parameters.
   * @returns {Ember.RSVP.Promise}
     */
  promiseFromPath(path, id, params) {
    const url = this.baseURL + path;
    // Boilerplate Promise construction taken from Ember docs example
    // of overriding RESTAdapter::findRecord
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // What transformation do we need to apply
      // to the document that gets returned from this serialized API document?
      let mungeFunc;
      console.log(id);
      if (id !== undefined) {
        // This is a document with a top level object,
        // whose id field the caller wants to override.
        mungeFunc = function(apiDoc) {
          //apiDoc['id'] = id;
          Ember.run(null, resolve, apiDoc);
        };
      }
      else if (params !== undefined) {
        // This is a document with a list of objects.
        // We'll construct an id for each one with the query params provided
        // and the datasetName of each.
        // (It so happens that this case only occurs when "datasetName"
        // is the right choice for making the id unique.
        // We could easily parametrize this over other attribute names.)
        mungeFunc = function(apiDoc) {
          apiDoc.objects.forEach(function(dataset) {
            let paramsClone = Ember.$().extend({}, params);
            paramsClone['dataset_name'] = dataset.dataset_name;
            dataset['id'] = new QueryConverter().fromHash(paramsClone).toId();
            return dataset;
          });
          Ember.run(null, resolve, apiDoc);
        };
      }
      else {
        // Don't do anything to the payload.
        mungeFunc = function(apiDoc) {return apiDoc;};
      }

      // Now, make the API call,
      // and pass along the transformed document to Ember Store.
      Ember.$.getJSON(url).then(
        function(apiDoc) {
          // If the AJAX call goes through
          let transformedDoc = mungeFunc(apiDoc);
          Ember.run(null, resolve, transformedDoc);
        },
        function(jqXHR) {
          // If the AJAX call fails
          jqXHR.then = null;
          Ember.run(null, reject, jqXHR);
      });
    });
  }

});
