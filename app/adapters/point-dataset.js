import ApplicationAdapter from './application';
import Ember from 'ember';
import aggIdToQueryParams from '../helpers';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    // Convert id to object of query params.
    // We know type is pointDataset.
    // Use query params to construct URL

    var url = this.baseURL;

    // Boilerplate from Ember docs example.
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(url).then(function(data) {
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
