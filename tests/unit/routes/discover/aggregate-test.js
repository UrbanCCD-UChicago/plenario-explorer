import { moduleFor, test } from 'ember-qunit';

moduleFor('route:discover.aggregate', 'Unit | Route | discover/aggregate', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: [
    'service:query',
    'service:notify',
  ],
});

test('it exists', function (assert) {
  const route = this.subject();
  assert.ok(route);
});
