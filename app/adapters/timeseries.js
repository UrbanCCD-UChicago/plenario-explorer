import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    // Convert id to object of query params.
    // We know type is pointDataset.
    // Use query params to construct URL

    var url = this.host + 'Work on this bit';

    // Boilerplate from Ember docs example.
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(url).then(function(data) {
        // Assign the id generated from the application
        // so that we can fetch it from the store.
        data.id = id
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  findAll (store, type, sinceToken, snapshotRecordArray) {
    let url = this.host + '/datasets';
    return this.ajax(url);
  }
});
