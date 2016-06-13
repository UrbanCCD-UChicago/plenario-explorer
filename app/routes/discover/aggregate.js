import Ember from 'ember';
import GJV from "npm:geojson-validation";

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),
  query: Ember.inject.service(),
  model() {
    const params = this.paramsFor('discover');
    return Ember.RSVP.hash({
      pointDatasets: this.get('query').eventCandidates(params),
      shapeDatasets: this.get('query').shapeSubsets(params)
    });
  },
  actions: {
    reload: function() {
      this.refresh();
    }
  },

  /**
   * A place to impose restrictions on the query parameters
   * so that we can't enter aggregate with badly formatted params.
   *
   */
  beforeModel() {
    let self = this;
    let bailToIndex = function(message) {
      self.transitionTo('index');
      self.get('notify').error(message);
    };

    //*** VALIDATION STEPS: Logic here validates the query parameters before submitting the query. ***//

    // Check that location_geom__within is a valid polygon or line segment
    const genericHelp = 'Please draw a shape on the map before submitting.';

    const params = this.paramsFor('discover');
    let geoJSON;
    try {
      let geoJSONStr = params.location_geom__within;
      geoJSON = JSON.parse(geoJSONStr);
    }
    catch (err) {
      bailToIndex('Invalid JSON. ' + genericHelp);
      self.get('notify').info("Maybe try resetting your query?");
    }

    if (!GJV.isFeature(geoJSON)) {
      bailToIndex('GeoJSON must be a "Feature" document. ' + genericHelp);
    }
    geoJSON = geoJSON.geometry;
    let isPolygonOrLine = GJV.isPolygon(geoJSON) || GJV.isLineString(geoJSON);
    if (!isPolygonOrLine) {
      bailToIndex('Geometry must be a polygon or line. ' + genericHelp);
    }

    //Check if the selected agg parameter is valid
    if($.grep(this.controllerFor('discover').get('aggOptions'), function(e){ return e.label === params.agg; }).length === 0)
    {
      bailToIndex('Unknown value for "agg". Try selecting a valid option from the "Aggregate by" dropdown.');
    }

    //Ensure that start date >= end date
    if(new Date(params.obs_date__le) < new Date(params.obs_date__ge)){
      bailToIndex('Query error: Start date should be before End date.');
    }



    //*** END VALIDATION STEPS ***//

    //Start a spinner cue (whose toggle lives in controllers/discover.js,
    //and whose DOM lives in templates/discover.hbs)
    this.controllerFor('discover').set('loadingMeta', true);
  },

  afterModel(){
    //Stop the spinner
    this.controllerFor('discover').set('loadingMeta', false);
  }
});
