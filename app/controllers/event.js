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

  // // These all should have been set by the route.
  // // They will be used in the filter creation box.
  // dataset_name: null,
  // agg: null,
  // obs_date__le: null,
  // obs_date__ge: null,
  // resolution: null,

  // Will be set only if the user supplied column filters.
  //filters: null,

  // May not have been set by the route.
  // In case it was set,
  // we need to hold on to it to spit it out on transitions.
  //location_geom__within: null,

  filtersArrived: Ember.observer('filters', function() {
    const filters = this.get('filters');
    if (!filters) {
      return;
    }
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
