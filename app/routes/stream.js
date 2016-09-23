import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    query: Ember.inject.service(),

    model() {
      const nodesPromise = this.get('query').allNodeMetadata();
      return nodesPromise.then(nodes => {
        return {
          'nodes': nodes
        };
      }).catch(err => {
          this.transitionTo('index');
          this.get('notify').error(`Data error: ${err}`);
      });
    }
});
