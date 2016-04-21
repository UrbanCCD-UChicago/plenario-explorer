import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'dataset_name',
    'filters',
    'agg',
    'resolution',
    'obs_date__le',
    'obs_date__ge',
    'location_geom__within'
  ],

  agg: null,
  obs_date__le: null,
  obs_date__ge: null,
  resolution: null,
  location_geom__within: null,

  filtersArrived: Ember.observer('filters', function() {
    const filters = this.get('filters');
    this.set('filterHashes', JSON.parse(filters));
  }),

  actions: {
    submit(params) {
      // This will cause a transition to the event route,
      // but with different query parameters.
      // I think I'll need to build the URL here. :(
    },

    download(params, type) {
      // Open a download in a new tab.
    },

    exit(params) {
      // Go back to the discover
      // Unless geojson has been specified,
      // in which case go back to aggregate route.
    }
  }



});
