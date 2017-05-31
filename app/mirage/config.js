import testData from 'plenario-explorer/mirage/test-data';
import { sensorData, mockNetwork } from 'plenario-explorer/mirage/sensor-data';
import moment from 'moment';

import ENV from 'plenario-explorer/config/environment';

export default function () {
  this.get(`${ENV.host}/v1/api/shapes`, () => testData.shapesData);

  this.get(`${ENV.host}/v1/api/datasets`, () => testData.eventData);

  this.get(`${ENV.host}/v1/api/detail-aggregate`, (_, request) => {
    if (request.queryParams.dataset_name === '311_service_requests_sanitation_code_complaints') {
      return testData.detailAggregateSanitation;
    } else if (request.queryParams.dataset_name === '311_service_requests_rodent_baiting') {
      return testData.detailAggregateRodents;
    }
  });

  this.get(`${ENV.host}/v1/api/grid`, (_, request) => {
    if (request.queryParams.dataset_name === '311_service_requests_sanitation_code_complaints') {
      return testData.gridSanitation;
    } else if (request.queryParams.dataset_name === '311_service_requests_rodent_baiting') {
      return testData.gridRodents;
    }
  });

  this.get(`${ENV.host}/v1/api/detail`, (_, request) => {
    if (request.queryParams.dataset_name === '311_service_requests_sanitation_code_complaints') {
      return testData.detailSanitation;
    } else if (request.queryParams.dataset_name === '311_service_requests_rodent_baiting') {
      return testData.detailRodents;
    }
  });

  this.get(`${ENV.host}/v1/api/sensor-networks/plenario_development/nodes`, () => sensorData.nodes);

  this.get(`${ENV.host}/v1/api/sensor-networks/plenario_development/sensors`, () => sensorData.sensors);

  this.get('http://sensor-curation.s3-website-us-east-1.amazonaws.com/plenario_development.json', () => sensorData.curation);

  this.get(`${ENV.host}/v1/api/sensor-networks/plenario_development/query`, (_, { queryParams }) => {
    // Note that this application always sends a singular node ID
    // but the API accepts a comma separated list,
    // hence singular-plural weirdness here.
    const { nodes, feature } = queryParams;
    const now = moment();
    const hourAgo = moment().subtract(1, 'hours');
    const observations = mockNetwork.observations(nodes, feature, hourAgo, now);
    return { data: observations };
  });

  this.get(`${ENV.host}/v1/api/sensor-networks/plenario_development/aggregate`, (_, { queryParams }) => {
    const type = queryParams.feature;
    const now = moment();
    const weekAgo = moment().subtract(7, 'days');
    const history = mockNetwork.aggregate(type, weekAgo, now);
    return { data: history };
  });


  this.passthrough('http://plenar.io/v1/api/datadump/**');
  this.passthrough('http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com/v1/api/sensor-networks/**');
  this.passthrough('http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com/v1/api/**');
  this.passthrough('http://plenar.io/v1/api/jobs/**');
  this.passthrough('http://streaming.plenar.io/**');
  this.passthrough('ws://streaming.plenar.io/**');
}
