import humanizeName from 'plenario-explorer/utils/humanize-name';
import { module, test } from 'qunit';

module('Unit | Utility | humanize name');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = humanizeName("a_test");
  assert.equal(result, "A Test");
  assert.ok(result);
});
