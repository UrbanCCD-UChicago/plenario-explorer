import {
  createStreams
} from '../../../models/streamCollection';
import {module, test} from 'qunit';

module('Unit | Model | StreamCollection');

console.log('Being executed yo');

const curatedProperties = [
  {
    id: 'temperature.temperature',
    name: 'Temperature',
    unit: '°C',
    sensor: 'tempx'
  },
  {
    id: 'gas_concentration.h2s',
    name: 'Hydrogen Sulfide Concentration',
    unit: 'ppm',
    sensor: 'gasx'
  },
];



test('creates stream collection', function(assert) {
  const streams = createStreams(curatedProperties);
  console.log(typeof streams.get('temperature.temperature'));
  assert.ok(false);
});
