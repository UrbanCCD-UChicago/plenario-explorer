import {Value} from '../../../models/value';
import {module, test} from 'qunit';

module('Unit | Model | Value');

const mockObservationAPIRecord =
{
  "feature_of_interest":"gas_concentration",
  "node_id":'00A',
  "sensor":"gasx",
  "results":{
    "co":null,
    "so2":21,
    "o3":null,
    "h2s":42,
    "no2":null
  },
  "datetime":"2016-08-31T17:37:54+00:00"
};


test('extracts observations from API record', function (assert) {
  const observations = Value.adaptFromAPI(mockObservationAPIRecord);
  assert.equal(observations.length, 2);
  const idToValue = {};
  for (let obs of observations) {
    idToValue[obs.id] = obs.value;
  }
  assert.equal(idToValue['gas_concentration.so2'], 21);
  assert.equal(idToValue['gas_concentration.h2s'], 42);
});

