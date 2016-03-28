import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  // A change in any query parameter should trigger a refresh.
  queryParams: {
    obs_date__le: {refreshModel: true},
    obs_date__ge: {refreshModel: true},
    agg: {refreshModel: true},
    location_geom__within: {refreshModel: true}
  },
  model(params) {
    return Ember.RSVP.hash({
      pointDatasets: this.store.query('pointDataset', params),
      // Will need to change this to query.
      shapeDatasets: this.store.query('shapeDataset', params)
    });
  }
});
