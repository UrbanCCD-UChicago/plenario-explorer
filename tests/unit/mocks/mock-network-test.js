import MockNetwork from '../../../mirage/mock-network';
import {sensorData} from '../../../mirage/sensor-data';
import {module, test} from 'qunit';

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
    "id": "gas_concentration.o2",
    "name": "Oxygen Concentration",
    "unit": "ppm",
    "sensor": "sensor_dev_4"
  }
];
const network = new MockNetwork(curatedTypes);


test('MockNetwork can be constructed', function (assert) {
  assert.ok(network);
});

test('MockNetwork produces the right number of factories', function(assert) {
  const factories = network.observationFactories(['sensor_dev_3']);
  assert.equal(factories.length, 1);
});
