/* global Ember */
import { moduleFor, test } from 'ember-qunit';
import startMirage from '../../helpers/setup-mirage-for-integration';
import testData from 'plenario-explorer/mirage/test-data';
import moment from 'moment';

// The Testing Datasets are defined in helpers/test-data.js
// (and loaded into mirage at mirage/config.js.)
// Most of the data has been centralized to test-data.js, but some
// simple mentions (like dataset names and exprected counts reside here
// for ease of understanding. Make sure to keep these in sync with test-data.js

moduleFor('service:query', 'Unit | Service | query', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  needs: [
    'service:ajax',
    'service:socket-io',
    'service:notify',
  ],
  setup() {
    startMirage(this.container);
  },
});

const params = testData.params;

// Replace this with your real tests.
test('it exists', function (assert) {
  const service = this.subject();
  assert.ok(service);
});

// Test Query Service Functions

test('Function camelizeHash works.', function (assert) {
  const service = this.subject();
  assert.equal(JSON.stringify(service.camelizeHash({ aTest: 0 })), JSON.stringify({ aTest: 0 }));
  assert.equal(JSON.stringify(service.camelizeHash({ a_Test: 0 })), JSON.stringify({ aTest: 0 }));
  assert.equal(JSON.stringify(service.camelizeHash({ 'a test': 0 })), JSON.stringify({ aTest: 0 }));
  assert.equal(JSON.stringify(service.camelizeHash({ 'A Test': 0 })), JSON.stringify({ aTest: 0 }));
  assert.equal(JSON.stringify(service.camelizeHash({ atest: 0 })), JSON.stringify({ atest: 0 }));
  assert.equal(JSON.stringify(service.camelizeHash({ ATest: 0 })), JSON.stringify({ atest: 0 }));
});

test('Function injectExplorerData works.', function (assert) {
  const service = this.subject();
  assert.equal(JSON.stringify(service.injectExplorerData('events', { agg: 'day', obs_date__ge: '2016-05-20' }, {})),
    JSON.stringify({ explorerData: { route: 'events', queryParams: { agg: 'day', obs_date__ge: '2016-05-20' } } }));
});

// Test Query Service Operation

test('Successfully returns queries.', function (assert) {
  const service = this.subject();
  const events = service.allEventMetadata();
  const shapes = service.allShapeMetadata();

  return events.then((eventsResult) => {
    assert.equal(eventsResult.length, 2, 'Query returns the expected number of datasets.');
    // Datasets should be returned in the order defined in test-data.js,
    // since they are given as arrays.
    assert.equal(eventsResult[0].datasetName, '311_service_requests_sanitation_code_complaints', 'Query returns the correct dataset name.');
    assert.equal(eventsResult[1].datasetName, '311_service_requests_rodent_baiting', 'Query returns the correct dataset name.');
    return shapes.then((shapesResult) => {
      assert.equal(shapesResult.length, 2, 'Query returns the expected number of shapes.');
      assert.equal(shapesResult[0].datasetName, 'major_streets', 'Query returns the correct dataset name.');
      assert.equal(shapesResult[1].datasetName, 'boundaries_neighborhoods', 'Query returns the correct dataset name.');
    });
  });
});

test('Successfully returns queries with query parameters.', function (assert) {
  const service = this.subject();

  const events = service.eventCandidates(params);
  const shapes = service.shapeSubsets(params);

  return events.then((eventsResult) => {
    assert.equal(eventsResult.length, 2, 'Query returns the expected number of datasets.');
    assert.equal(eventsResult[0].datasetName, '311_service_requests_sanitation_code_complaints', 'Query returns the correct dataset name.');
    assert.equal(eventsResult[1].datasetName, '311_service_requests_rodent_baiting', 'Query returns the correct dataset name.');
    assert.equal(eventsResult[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, 'injectExplorerData correctly injects query parameters.');
    assert.equal(eventsResult[0].explorerData.queryParams.location_geom__within, params.location_geom__within, 'injectExplorerData correctly injects query parameters.');
    return shapes.then((shapesResult) => {
      assert.equal(shapesResult.length, 2, 'Query returns some values.');
      assert.equal(shapesResult[0].datasetName, 'major_streets', 'Query returns the correct dataset name.');
      assert.equal(shapesResult[1].datasetName, 'boundaries_neighborhoods', 'Query returns the correct dataset name.');
      assert.equal(shapesResult[0].explorerData.queryParams.obs_date__ge, params.obs_date__ge, 'injectExplorerData correctly injects query parameters');
      assert.equal(shapesResult[0].explorerData.queryParams.location_geom__within, params.location_geom__within, 'injectExplorerData correctly injects query parameters.');
    });
  });
});

test('Successfully queries timeseries.', function (assert) {
  const service = this.subject();

  // Test that moment converts a date into epoch time.
  // Moment parses into local time by default though (which is what Plenar.io uses--local time)
  // But for testing purposes, we need to standardize that to UTC time.
  assert.equal(moment.utc('2000-01-01T00:00:00.00').valueOf(), '946684800000', 'Moment constructor and valueOf() works as expected.');

  const expectedSeries = testData.detailAggregateRodents.objects.map(
    v => [moment(v.datetime).valueOf(), v.count]
  );

  const params2 = {};
  Ember.assign(params2, params, { dataset_name: '311_service_requests_rodent_baiting' });
  const timeseries = service.timeseries(params2);
  return timeseries.then((result) => {
    assert.equal(result.count, 2, 'Query returns the expected number of datapoints.');
    assert.equal(JSON.stringify(result.series[0].data), JSON.stringify(expectedSeries), 'Query service correctly converts datetime ISO date to epoch time.');
  });
});

test('Successfully queries grid.', function (assert) {
  const service = this.subject();

  const expectedFeatures = testData.gridRodents.features;

  const params2 = {};
  Ember.assign(params2, params, { dataset_name: '311_service_requests_rodent_baiting' });
  const grid = service.grid(params2);
  return grid.then((result) => {
    assert.equal(result.features.length, 2, 'Grid contains the expected number of features.');
    assert.equal(JSON.stringify(result.features), JSON.stringify(expectedFeatures), 'Grid returns the correct data.');
  });
});


test('Successfully retrieves raw data.', function (assert) {
  const service = this.subject();
  const expectedRawData = testData.detailRodents;
  const params2 = {};
  Ember.assign(params2, params, { dataset_name: '311_service_requests_rodent_baiting' });
  const rawevents = service.rawEvents(params2);
  return rawevents.then((result) => {
    assert.equal(result.objects.length, 2, 'Query returns the expected number of data points.');
    assert.equal(result.objects.length, result.meta.total, 'Data is internally consistent.');
    assert.equal(JSON.stringify(result), JSON.stringify(expectedRawData), 'Query returns the correct data.');
  });
});

