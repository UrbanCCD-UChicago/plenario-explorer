import {Node} from '../../../models/node';
import {module, test} from 'qunit';

module('Unit | Model | Node');

const mockNodeAPIRecord =
{
  "type": "Feature",
  "properties": {
    "info": {
      "orientation":{
        "value":"NE",
        "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
      },
      "height":{
        "value":5,
        "unit":"meters"
      }
    },
    "sensors": ["tempx", "gasx"],
    "id": "00A",
    "network_name": "array_of_things"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-87.6298, 41.8781]
  }
};

const expectedMetadata = {
  "Facing": "NE",
  "Height": "5 meters"
};

test('Node constructor formats metadata', function (assert) {
  let node = Node.create({nodeGeoJSON: mockNodeAPIRecord});
  assert.deepEqual(node.properties.metadata, expectedMetadata);
});
