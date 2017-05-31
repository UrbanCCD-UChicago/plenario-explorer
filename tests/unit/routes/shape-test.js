import { moduleFor, test } from 'ember-qunit';

moduleFor('route:shape', 'Unit | Route | shape', {
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
