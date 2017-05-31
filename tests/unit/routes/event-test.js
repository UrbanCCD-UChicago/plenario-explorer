import { moduleFor, test } from 'ember-qunit';

moduleFor('route:event', 'Unit | Route | event', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['service:query'],
});

test('it exists', function (assert) {
  const route = this.subject();
  assert.ok(route);
});
