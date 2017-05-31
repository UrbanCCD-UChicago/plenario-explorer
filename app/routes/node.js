import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  query: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      // Since we request a single node's metadata, 'nodes' will have length 1
      nodes: this.get('query').nodeMetadata(params.dataset_name),
      curation: this.get('query').getCurationFor(ENV.networkId),
    });
  },
});
