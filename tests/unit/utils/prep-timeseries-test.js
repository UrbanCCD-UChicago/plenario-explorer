import prepTimeseries from 'plenario-explorer/utils/prep-timeseries';
import { module, test } from 'qunit';

module('Unit | Utility | prep timeseries');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = prepTimeseries( [{count: 3, datetime: '2016-12-06'}]);
  assert.ok(result);
});
