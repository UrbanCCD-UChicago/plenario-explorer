import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    query: Ember.inject.service(),
    // curation: Ember.inject.service(),

    model() {
      return Ember.RSVP.hash({
        'nodes': this.get('query').allNodeMetadata(),
        'curation': this.get('query').getCurationFor(ENV.networkId)
      });

      // return nodesPromise.then(nodes => {
      //   return {
      //     'nodes': nodes,
      //     'curation': curation
      //   };
      // }).catch(err => {
      //     this.transitionTo('index');
      //     this.get('notify').error(`Data error: ${err}`);
      // });
    }
});
