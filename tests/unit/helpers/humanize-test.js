import { humanize } from '../../../helpers/humanize';
import { module, test } from 'qunit';

module('Unit | Helper | humanize');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = humanize(["a_test"]);
  assert.equal(result, "A Test");
  assert.ok(result);
});
