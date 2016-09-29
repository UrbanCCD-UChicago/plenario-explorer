import MockNetwork from '../../../mirage/mock-network';
import {sensorData} from '../../../mirage/sensor-data';
import {module, test} from 'qunit';
import moment from 'moment';

module('Unit | Mock | MockNetwork');

const curatedTypes = [
  {
    "id": "temperature.temperature",
    "name": "Temperature",
    "unit": "°C",
    "sensor": "sensor_dev_4"
  },
  {
    "id": "humidity.humidity",
    "name": "Relative Humidity",
    "unit": "%",
    "sensor": "sensor_dev_2"
  },
  {
    "id": "gas_concentration.n23",
    "name": "Nitrogen Concentration3",
    "unit": "ppm3",
    "sensor": "sensor_dev_3"
  },
  {
    "id": "gas_concentration.co2",
    "name": "Carbon Dioxide Concentration",
    "unit": "ppm",
    "sensor": "sensor_dev_3"
  },
  {
    "id": "temperature.internal_temperature",
    "sensor": "sensor_dev_3"
  },
  {
    "id": "gas_concentration.o2",
    "name": "Oxygen Concentration",
    "unit": "ppm",
    "sensor": "sensor_dev_4"
  }
];
const nodeMeta = [
  {
    "geometry": {
      "type": "Point",
      "coordinates": [
        -87.6598,
        41.8781
      ]
    },
    "type": "Feature",
    "properties": {
      "info": null,
      "sensors": [
        "sensor_dev_1",
        "sensor_dev_4"
      ],
      "network_name": "plenario_development",
      "id": "node_dev_1"
    }
  },
  {
    "geometry": {
      "type": "Point",
      "coordinates": [
        -87.6698,
        41.8781
      ]
    },
    "type": "Feature",
    "properties": {
      "info": null,
      "sensors": [
        "sensor_dev_2",
        "sensor_dev_3"
      ],
      "network_name": "plenario_development",
      "id": "node_dev_2"
    }
  }
];

const network = new MockNetwork(curatedTypes, nodeMeta);


test('MockNetwork can be constructed', function (assert) {
  assert.ok(network);
});

test('MockNetwork produces the right number of factories', function(assert) {
  let factories = network.observationFactories(['sensor_dev_3']);
  assert.equal(factories.length, 2);
  factories = network.observationFactories(['sensor_dev_2']);
  assert.equal(factories.length, 1);
  factories = network.observationFactories(['sensor_dev_3', 'sensor_dev_2']);
  assert.equal(factories.length, 3);
});

const produceMoment = () => moment('2016-09-29T13:00');

const testTypeIds = ['foo.bar', 'foo.baz'];
// 12 hour range
const aggStart = produceMoment().subtract(12, 'hours');
const aggEnd = produceMoment();

test('MockNetwork produces aggregates of the right length', function(assert) {
  const bucketList = network.aggregate(testTypeIds, aggStart, aggEnd);
  assert.equal(bucketList.length, 12);
});

test('MockNetwork produces buckets of the right format', function(assert) {
  const bucketList = network.aggregate(testTypeIds, aggStart, aggEnd);
  function isFormattedRight(bucket) {
    return 'bar' in bucket && 'baz' in bucket && 'time_bucket' in bucket;
  }
  assert.ok(bucketList.every(isFormattedRight));
});

const obsStart = produceMoment().subtract(10, 'minutes');
const obsEnd = produceMoment();

test('MockNetwork produces right number of observations', function(assert) {
  const sensorList = ['sensor_dev_3', 'sensor_dev_2'];
  const observationList = network.observations('arbitraryNodeName', sensorList, obsStart, obsEnd);
  //10 minutes * 2 observations per minute * 3 observation types
  assert.equal(observationList.length, 60);
});
