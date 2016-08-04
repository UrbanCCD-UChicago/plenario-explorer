//Dummy datasets used purely for testing.
//Import data from our central test data dump: test-data.js.
import testData from 'plenario-explorer/mirage/test-data';

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

  this.passthrough('http://plenar.io/v1/api/datadump');
  this.passthrough('http://plenar.io/v1/api/jobs');
}
