import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    query: Ember.inject.service(),

    model() {
      const nodesPromise = this.get('query').allNodeMetadata();
      return nodesPromise.then(nodes => nodes);// {
        // return {'nodes': nodes};
      // });
    }
});
