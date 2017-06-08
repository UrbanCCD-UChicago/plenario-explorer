import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  query: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      nodes: this.get('query').allNodeMetadata(),
      curation: this.get('query').getCurationFor(ENV.networkId),
    });
  },
});
