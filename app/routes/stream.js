import Ember from 'ember';
import Node from '../models/node';
import ObservedProperty from '../models/observedProperty';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    query: Ember.inject.service(),

    model() {
      const nodesPromise = Node.all();// this.get('query').allNodeMetadata();
      const observedProperties = ObservedProperty.all();
      return nodesPromise.then(nodes => {
        return {
          'nodes': nodes,
          'observedProperties': observedProperties
        };
      });
    }
});
