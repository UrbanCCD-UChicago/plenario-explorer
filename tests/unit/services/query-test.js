/* global Ember */
import { moduleFor, test } from 'ember-qunit';
import startMirage from '../../helpers/setup-mirage-for-integration';
import moment from 'moment';

//TODO: http://www.ember-cli-mirage.com/docs/v0.2.x/manually-starting-mirage/


moduleFor('service:query', 'Unit | Service | query', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  needs: ['service:ajax'],
  setup: function() {
    startMirage(this.container);
  }
});

let params = {
  agg: "week",
  obs_date__ge: "2010-06-1",
  obs_date__le: "2016-06-15",
  location_geom__within: {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [[
        [-87.68862247467041, 41.80510182643331],
        [-87.68862247467041, 41.90432124806034],
        [-87.55678653717041, 41.90432124806034],
        [-87.55678653717041, 41.80510182643331],
        [-87.68862247467041, 41.80510182643331]
      ]]
    }
  }
};

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('Function camelizeHash works.', function(assert) {
  let service = this.subject();
  assert.equal(service.camelizeHash({"aTest": 0}).toString(), {"aTest":0}.toString());
  assert.equal(service.camelizeHash({"a_Test": 0}).toString(), {"aTest":0}.toString());
  assert.equal(service.camelizeHash({"a test": 0}.toString()), {"aTest":0}.toString());
  assert.equal(service.camelizeHash({"A Test": 0}.toString()), {"aTest":0}.toString());
  assert.equal(service.camelizeHash({"atest": 0}.toString()), {"aTest":0}.toString());
  assert.equal(service.camelizeHash({"ATest": 0}.toString()), {"aTest":0}.toString());
});

test('Function injectExplorerData works.', function(assert){
  let service = this.subject();
  assert.equal(service.injectExplorerData("events", {"agg": "day", "obs_date__ge": "2010-06-01"}, {}).toString(),
    {"explorerData": {"route": "events", "queryParams": {"agg": "day", "obs_date__ge": "2010-06-01"}}}.toString());
});

test('Successfully returns queries.', function(assert){

  let service = this.subject();
  let events = service.allEventMetadata();
  let shapes = service.allShapeMetadata();

  return events.then(function(result){
    //Datasets are defined in app/mirage/config.js
    //Keep these assertions in sync with the values defined there.
    assert.equal(result.length, 2, "Query returns the expected number of datasets.");
    //Datasets should be returned in the order defined in config.js, since they are given as arrays.
    assert.equal(result[0].datasetName, "speed_camera_locations");
    assert.equal(result[1].datasetName, "red_light_camera_locations");
    return shapes.then(function(result){
      assert.equal(result.length, 2, "Query returns some values.");
      assert.equal(result[0].datasetName, "major_streets");
      assert.equal(result[1].datasetName, "boundaries_neighborhoods");
    });
  });
});

test('Successfully returns queries with query parameters.', function(assert){
  let service = this.subject();

  let events = service.eventCandidates(params);
  let shapes = service.shapeSubsets(params);

  return events.then(function(result){
    assert.equal(result.length, 2, "Query returns the expected number of datasets.");
    assert.equal(result[0].datasetName, "speed_camera_locations");
    assert.equal(result[1].datasetName, "red_light_camera_locations");
    assert.equal(result[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, "injectExplorerData correctly injects query parameters.");
    assert.equal(result[0].explorerData.queryParams.location_geom__within, params.location_geom__within, "injectExplorerData correctly injects query parameters.");
    return shapes.then(function(result){
      assert.equal(result.length, 2, "Query returns some values.");
      assert.equal(result[0].datasetName, "major_streets");
      assert.equal(result[1].datasetName, "boundaries_neighborhoods");
      assert.equal(result[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, "injectExplorerData correctly injects query parameters");
      assert.equal(result[0].explorerData.queryParams.location_geom__within, params.location_geom__within, "injectExplorerData correctly injects query parameters.");

    });
  });
});

test('Successfully queries timeseries.', function(assert){
  let service = this.subject();

  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "speed_camera_locations"});
  let timeseries = service.timeseries(params2);
  return timeseries.then(function(result){
    assert.equal(result.count, 23, "Query returns the expected number of datapoints.");
    assert.equal(result.series[0].data[0][0], moment("2000-05-29+0000").valueOf(), "Query service correctly converts datetime ISO date to epoch time.");
  });
});

test('Successfully queries grid.', function(assert){
  let service = this.subject();

  let expectedFeature = {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              -87.68376698983157,
              41.822881546414926
            ],
            [
              -87.68376698983157,
              41.827376938637904
            ],
            [
              -87.68980020736278,
              41.827376938637904
            ],
            [
              -87.68980020736278,
              41.822881546414926
            ],
            [
              -87.68376698983157,
              41.822881546414926
            ]
          ]
        ]
      },
      type: "Feature",
      properties: {
        count: 1
      }
    };

  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "red_light_camera_locations"});
  let grid = service.grid(params2);
  return grid.then(function(result){
    assert.equal(result.features.length, 18, "Grid contains the expected number of features.");
    assert.equal(result.features[0].toString(), expectedFeature.toString(), "Grid returns the correct data.");
  });
});


test('Successfully retrieves raw data.', function(assert){
  let service = this.subject();
  let expectedRawData = {
      intersection: "Illinois-Columbus",
      first_approach: "NB",
      second_approach: "SB",
      third_approach: null,
      go_live_date: "2010-10-28",
      latitude: 41.891002,
      longitude: -87.620224,
      location: "(41.891002, -87.620224)"
    };
  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "red_light_camera_locations"});
  let rawevents = service.rawEvents(params2);
  return rawevents.then(function (result) {
    assert.equal(result.objects.length, 2, "Query returns the expected number of data points.");
    assert.equal(result.objects.length, result.meta.total, "Data is internally consistent.");
    assert.equal(result.objects[0].toString(), expectedRawData.toString(), "Query returns the correct data.");
  });
});

