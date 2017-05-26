import {moduleFor, test} from 'ember-qunit';

moduleFor('controller:event', 'Unit | Controller | event', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:query',
    'service:notify',
    'controller:discover',
    'controller:datadump.index'
  ]
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let controller = this.subject();
  assert.ok(controller);
});
