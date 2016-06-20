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

//Query parameters that are consistent with the data in mirage/config.js.
let params = {
  agg: "week",
  obs_date__ge: "2016-05-20",
  obs_date__le: "2016-06-20",
  location_geom__within: {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [-87.64153629541396,
            41.88496253812402

          ],
          [
            -87.64153629541396,
            41.89141609339026
          ],
          [
            -87.62059360742569,
            41.89141609339026
          ],
          [
            -87.62059360742569,
            41.88496253812402
          ],
          [
            -87.64153629541396,
            41.88496253812402
          ]
        ]
      ]
    }
  }
};

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

//Test Query Service Functions

test('Function camelizeHash works.', function(assert) {
  let service = this.subject();
  assert.equal(JSON.toString(service.camelizeHash({"aTest": 0})), JSON.toString({"aTest":0}));
  assert.equal(JSON.toString(service.camelizeHash({"a_Test": 0})), JSON.toString({"aTest":0}));
  assert.equal(JSON.toString(service.camelizeHash({"a test": 0})), JSON.toString({"aTest":0}));
  assert.equal(JSON.toString(service.camelizeHash({"A Test": 0})), JSON.toString({"aTest":0}));
  assert.equal(JSON.toString(service.camelizeHash({"atest": 0})), JSON.toString({"aTest":0}));
  assert.equal(JSON.toString(service.camelizeHash({"ATest": 0})), JSON.toString({"aTest":0}));
});

test('Function injectExplorerData works.', function(assert){
  let service = this.subject();
  assert.equal(JSON.toString(service.injectExplorerData("events", {"agg": "day", "obs_date__ge": "2016-05-20"}, {})),
    JSON.toString({"explorerData": {"route": "events", "queryParams": {"agg": "day", "obs_date__ge": "2016-05-20"}}}));
});

//Test Query Service Operation

test('Successfully returns queries.', function(assert){

  let service = this.subject();
  let events = service.allEventMetadata();
  let shapes = service.allShapeMetadata();

  return events.then(function(result){
    //Datasets are defined in app/mirage/config.js
    //Keep these assertions in sync with the values defined there.
    assert.equal(result.length, 2, "Query returns the expected number of datasets.");
    //Datasets should be returned in the order defined in config.js, since they are given as arrays.
    assert.equal(result[0].datasetName, "311_service_requests_sanitation_code_complaints", "Query returns the correct dataset name.");
    assert.equal(result[1].datasetName, "311_service_requests_rodent_baiting", "Query returns the correct dataset name.");
    return shapes.then(function(result){
      assert.equal(result.length, 2, "Query returns the expected number of shapes.");
      assert.equal(result[0].datasetName, "major_streets", "Query returns the correct dataset name.");
      assert.equal(result[1].datasetName, "boundaries_neighborhoods", "Query returns the correct dataset name.");
    });
  });
});

test('Successfully returns queries with query parameters.', function(assert){
  let service = this.subject();

  let events = service.eventCandidates(params);
  let shapes = service.shapeSubsets(params);

  return events.then(function(result){
    assert.equal(result.length, 2, "Query returns the expected number of datasets.");
    assert.equal(result[0].datasetName, "311_service_requests_sanitation_code_complaints", "Query returns the correct dataset name.");
    assert.equal(result[1].datasetName, "311_service_requests_rodent_baiting", "Query returns the correct dataset name.");
    assert.equal(result[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, "injectExplorerData correctly injects query parameters.");
    assert.equal(result[0].explorerData.queryParams.location_geom__within, params.location_geom__within, "injectExplorerData correctly injects query parameters.");
    return shapes.then(function(result){
      assert.equal(result.length, 2, "Query returns some values.");
      assert.equal(result[0].datasetName, "major_streets", "Query returns the correct dataset name.");
      assert.equal(result[1].datasetName, "boundaries_neighborhoods", "Query returns the correct dataset name.");
      assert.equal(result[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, "injectExplorerData correctly injects query parameters");
      assert.equal(result[0].explorerData.queryParams.location_geom__within, params.location_geom__within, "injectExplorerData correctly injects query parameters.");
    });
  });
});

test('Successfully queries timeseries.', function(assert){
  let service = this.subject();

  //Test that moment converts a date into epoch time.
  //Moment parses into local time by default though (which is what Plenar.io uses--local time)
  //But for testing purposes, we need to standardize that to UTC time.
  assert.equal(moment.utc("2000-01-01+0000").valueOf(), "946684800000", "Moment constructor and valueOf() works as expected.");

  let expectedSeries = [
    {
      count: 1,
      datetime: moment("2016-05-16+0000").valueOf()
    },
    {
      count: 0,
      datetime: moment("2016-05-23+0000").valueOf()
    },
    {
      count: 1,
      datetime: moment("2016-05-30+0000").valueOf()
    },
    {
      count: 1,
      datetime: moment("2016-06-06+0000").valueOf()
    },
    {
      count: 0,
      datetime: moment("2016-06-13+0000").valueOf()
    },
    {
      count: 0,
      datetime: moment("2016-06-20+0000").valueOf()
    }
  ];

  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "311_service_requests_sanitation_code_complaints"});
  let timeseries = service.timeseries(params2);
  return timeseries.then(function(result){
    assert.equal(result.count, 3, "Query returns the expected number of datapoints.");
    assert.equal(JSON.toString(result.series[0].data), JSON.toString(expectedSeries.toString()), "Query service correctly converts datetime ISO date to epoch time.");
  });
});

test('Successfully queries grid.', function(assert){
  let service = this.subject();

  let expectedFeatures = {
    type: "FeatureCollection",
    features: [
      {
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                -87.63854693083577,
                41.881321645313555
              ],
              [
                -87.63854693083577,
                41.88581703753653
              ],
              [
                -87.64458035804522,
                41.88581703753653
              ],
              [
                -87.64458035804522,
                41.881321645313555
              ],
              [
                -87.63854693083577,
                41.881321645313555
              ]
            ]
          ]
        },
        type: "Feature",
        properties: {
          count: 1
        }
      },
      {
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                -87.63251350362633,
                41.881321645313555
              ],
              [
                -87.63251350362633,
                41.88581703753653
              ],
              [
                -87.63854693083577,
                41.88581703753653
              ],
              [
                -87.63854693083577,
                41.881321645313555
              ],
              [
                -87.63251350362633,
                41.881321645313555
              ]
            ]
          ]
        },
        type: "Feature",
        properties: {
          count: 1
        }
      }
    ]
  };

  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "311_service_requests_rodent_baiting"});
  let grid = service.grid(params2);
  return grid.then(function(result){
    assert.equal(result.features.length, 2, "Grid contains the expected number of features.");
    assert.equal(JSON.toString(result.features), JSON.toString(expectedFeatures), "Grid returns the correct data.");
  });
});


test('Successfully retrieves raw data.', function(assert){
  let service = this.subject();
  let expectedRawData = {
    meta: {
      status: "ok",
      query: {
        location_geom__within: {
          crs: {
            type: "name",
            properties: {
              name: "EPSG:4326"
            }
          },
          type: "Polygon",
          coordinates: [
            [
              [
                -87.64153629541396,
                41.88496253812402
              ],
              [
                -87.64153629541396,
                41.89141609339026
              ],
              [
                -87.62059360742569,
                41.89141609339026
              ],
              [
                -87.62059360742569,
                41.88496253812402
              ],
              [
                -87.64153629541396,
                41.88496253812402
              ]
            ]
          ]
        },
        date__time_of_day_ge: 0,
        obs_date__le: "2016-06-20T00:00:00",
        data_type: "json",
        obs_date__ge: "2016-05-20T00:00:00",
        date__time_of_day_le: 23,
        offset: 0
      },
      message: [ ],
      total: 2
    },
    objects: [
      {
        creation_date: "2016-05-31",
        status: "Completed",
        completion_date: "2016-06-03",
        service_request_number: "16-03776585",
        type_of_service_request: "Rodent Baiting/Rat Complaint",
        number_of_premises_baited: 0,
        number_of_premises_with_garbage: 0,
        number_of_premises_with_rats: 0,
        current_activity: "Dispatch Crew",
        most_recent_action: "Inspected and baited",
        street_address: "210 N WELLS ST",
        zip_code: 60606,
        x_coordinate: 1174696.98801277,
        y_coordinate: 1901725.61738759,
        ward: 42,
        police_district: 1,
        community_area: 32,
        latitude: 41.8857288123151,
        longitude: -87.6339300624017,
        location: "(41.88572881231507, -87.63393006240169)"
      },
      {
        creation_date: "2016-06-03",
        status: "Completed",
        completion_date: "2016-06-07",
        service_request_number: "16-03846813",
        type_of_service_request: "Rodent Baiting/Rat Complaint",
        number_of_premises_baited: 0,
        number_of_premises_with_garbage: 0,
        number_of_premises_with_rats: 0,
        current_activity: "Dispatch Crew",
        most_recent_action: "Inspected and baited",
        street_address: "201 N MILWAUKEE AVE",
        zip_code: 60661,
        x_coordinate: 1173074.07632055,
        y_coordinate: 1901718.59118149,
        ward: 42,
        police_district: 12,
        community_area: 28,
        latitude: 41.8857456736176,
        longitude: -87.6398898776785,
        location: "(41.88574567361762, -87.6398898776785)"
      }
    ]
  };
  let params2 = {};
  Ember.assign(params2, params, {dataset_name: "311_service_requests_rodent_baiting"});
  let rawevents = service.rawEvents(params2);
  return rawevents.then(function (result) {
    assert.equal(result.objects.length, 2, "Query returns the expected number of data points.");
    assert.equal(result.objects.length, result.meta.total, "Data is internally consistent.");
    assert.equal(JSON.toString(result), JSON.toString(expectedRawData), "Query returns the correct data.");
  });
});

