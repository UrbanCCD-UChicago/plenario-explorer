import dateFormat from 'plenario-explorer/utils/date-format';
import {module, test} from 'qunit';

module('Unit | Utility | date format');

// Replace this with your real tests.
test('it works', function (assert) {
  assert.equal(dateFormat('2010-06-01', 'display'), '06/01/2010');
  assert.equal(dateFormat('06/01/2010', 'ISO'), '2010-06-01');
  assert.equal(dateFormat(new Date('Tue Jun 01 2010 00:00:00 GMT-0500 (CDT)'), 'display'), '06/01/2010');
  assert.equal(dateFormat(new Date('Tue Jun 01 2010 00:00:00 GMT-0500 (CDT)'), 'ISO'), '2010-06-01');
});
