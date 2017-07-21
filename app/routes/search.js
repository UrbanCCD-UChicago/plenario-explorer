import Ember from 'ember';

export default Ember.Route.extend({

  api: Ember.inject.service('plenario-api'),

  model() {
    const api = this.get('api');
    return Ember.RSVP.hash({
      nodeLocations: api.fetch.networks.metadata.nodes('array_of_things_chicago', {}),
    });
  },

});
