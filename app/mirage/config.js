import testData from 'plenario-explorer/mirage/test-data';
import {sensorData, mockNetwork} from 'plenario-explorer/mirage/sensor-data';
import moment from 'moment';

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

  this.get('http://plenar.io/v1/api/sensor-networks/plenario_development/nodes', function() {
    return sensorData.nodes;
  });

  this.get('http://sensor-curation.s3-website-us-east-1.amazonaws.com/plenario_development.json', function() {
    return sensorData.curation;
  });

  this.get('http://plenar.io/v1/api/sensor-networks/plenario_development/query', function(_, {queryParams}) {
    const {node, feature} = queryParams;
    const now = moment();
    const hourAgo = moment().subtract(1, 'hours');
    const observations = mockNetwork.observations(node, feature, hourAgo, now);
    return {data: observations};
  });

  this.get('http://plenar.io/v1/api/sensor-networks/plenario_development/aggregate', function(_, {queryParams}){
    let types = queryParams.features_of_interest;
    if (typeof types === 'string') {
      types = [types];
    }
    const now = moment();
    const weekAgo = moment().subtract(7, 'days');
    const history = mockNetwork.aggregate(types, weekAgo, now);
    return {data: history};
  });


  this.passthrough('http://plenar.io/v1/api/datadump/**');
  this.passthrough('http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com/v1/api/sensor-networks/**');
  this.passthrough('http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com/v1/api/**');
  this.passthrough('http://plenar.io/v1/api/jobs/**');
  this.passthrough('http://streaming.plenar.io/**');
  this.passthrough('ws://streaming.plenar.io/**');
}
