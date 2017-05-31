import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:discover', 'Unit | Controller | discover', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:notify',
    'controller:discover.aggregate',
  ],
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const controller = this.subject();
  assert.ok(controller);
});
