import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    query: Ember.inject.service(),

    model() {
      const mockGeoJSON = '{"type":"Feature","properties":{"network_name":"ArrayOfThings","id":"00A"},"geometry":{"type":"Point","coordinates":[-87.6298,41.8781]}}';
      return {'nodes': [JSON.parse(mockGeoJSON)]};
      // const nodesPromise = this.get('query').allNodeMetadata();
      // return nodesPromise.then(nodes => nodes);// {
        // return {'nodes': nodes};
      // });
    }
});
