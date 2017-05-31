import { moduleFor, test } from 'ember-qunit';

moduleFor('route:node', 'Unit | Route | node', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:query'],
});

test('it exists', function (assert) {
  const route = this.subject();
  assert.ok(route);
});
