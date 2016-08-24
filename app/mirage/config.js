//Dummy datasets used purely for testing.
//Import data from our central test data dump: test-data.js.
import testData from 'plenario-explorer/mirage/test-data';
import sensorData from 'plenario-explorer/mirage/sensor-data';

export default function () {
  this.get('http://plenar.io/v1/api/shapes', function () {
    return testData.shapesData;
  });

  this.get('http://plenar.io/v1/api/datasets', function () {
    return testData.eventData;
  });

  this.get('http://plenar.io/v1/api/detail-aggregate', function (_, request) {
    if (request.queryParams.dataset_name === "311_service_requests_sanitation_code_complaints") {
      return testData.detailAggregateSanitation;
    } else if (request.queryParams.dataset_name === "311_service_requests_rodent_baiting") {
      return testData.detailAggregateRodents;
    }
  });

  this.get('http://plenar.io/v1/api/grid', function (_, request) {
    if (request.queryParams.dataset_name === "311_service_requests_sanitation_code_complaints") {
      return testData.gridSanitation;
    } else if (request.queryParams.dataset_name === "311_service_requests_rodent_baiting") {
      return testData.gridRodents;
    }
  });

  this.get('http://plenar.io/v1/api/detail', function (_, request) {
    if (request.queryParams.dataset_name === '311_service_requests_sanitation_code_complaints') {
      return testData.detailSanitation;
    } else if (request.queryParams.dataset_name === '311_service_requests_rodent_baiting') {
      return testData.detailRodents;
    }
  });

  this.get('http://plenar.io/v1/api/sensor-networks/ArrayOfThings/sensors', function() {
    return sensorData.sensors;
  });

  this.get('http://plenar.io/v1/api/sensor-networks/ArrayOfThings/nodes', function() {
    return sensorData.nodes;
  });

  this.get('http://plenar.io/v1/api/sensor-networks/ArrayOfThings', function() {
    return sensorData.network;
  });

  this.get('http://plenar.io/v1/api/sensor-networks/ArrayOfThings/features-of-interest', function() {
    return sensorData.featuresOfInterest;
  });

  this.passthrough('http://plenar.io/v1/api/datadump');
  this.passthrough('http://plenar.io/v1/api/jobs');
}
