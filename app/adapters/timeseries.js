import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    // Convert id to object of query params.
    // We know type is pointDataset.
    // Use query params to construct URL

    // DOIT
  },

  query(store, type, query) {
    let path = '/timeseries';
    // Then grab the JSON for all of them?
    //
  }
});
