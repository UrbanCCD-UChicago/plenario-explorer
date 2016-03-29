import Ember from 'ember';
import GJV from "npm:geojson-validation";

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),
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
      shapeDatasets: this.store.query('shapeDataset', params)
    });
  },

  /**
   * A place to impose restrictions on the query parameters
   * so that we can't enter aggregate with badly formatted params.
   *
   * @param transition
   */
  beforeModel(transition) {
    let self = this;
    let bailToIndex = function(message) {
      self.transitionTo('index');
      self.get('notify').error(message);
    };

    // Check that location_geom__within is a valid polygon or line segment
    const genericHelp = 'Please draw a shape on the map before submitting.';

    let geoJSON;
    try {
      let geoJSONStr = transition.queryParams.location_geom__within;
      geoJSON = JSON.parse(geoJSONStr);
    }
    catch (err) {
      bailToIndex('Invalid JSON. ' + genericHelp);
    }

    if (!GJV.isFeature(geoJSON)) {
      bailToIndex('GeoJSON must be a "Feature" document. ' + genericHelp);
    }
    geoJSON = geoJSON.geometry;
    let isPolygonOrLine = GJV.isPolygon(geoJSON) || GJV.isLineString(geoJSON);
    if (!isPolygonOrLine) {
      bailToIndex('Geometry must be a polygon or line. ' + genericHelp);
    }

    // Check that agg is valid
  }
});
