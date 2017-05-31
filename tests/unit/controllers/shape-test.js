import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:shape', 'Unit | Controller | shape', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:query',
    'service:notify',
  ],
});

// Replace this with your real tests.
test('it exists', function (assert) {
  const controller = this.subject();
  assert.ok(controller);
});
