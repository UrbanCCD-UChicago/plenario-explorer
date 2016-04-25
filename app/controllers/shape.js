import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),

  queryParams: [
    'dataset_name',
    'agg',
    'obs_date__le',
    'obs_date__ge',
    'location_geom__within'
  ],

  // If we're trying to maintain application-level state around
  // obs_date, agg, and location_geom,
  // maybe we can move these params out of individual components?
  queryParamsHash: Ember.computed('obs_date__le', 'obs_date__ge',
    'agg', 'location_geom__within',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      for (const key of Object.keys(params)) {
        if (!params[key]) {
          delete params[key];
        }
      }
      return params;
    }
  ),

  modelArrived: Ember.observer('model', function() {
    this.fetchShapeJSON();
  }),

  fetchShapeJSON() {
    // Check metadata to confirm that num_shapes falls below
    // arbitrary threshold.
    const datasetName = this.get('dataset_name');
    this.get('query').rawShape(datasetName, {}).then(payload => {
      this.set('geoJSON', payload);
    }, reason => {
      this.get('notify').error(`Could not fetch map data: ${reason}`);
    });

  }



});
