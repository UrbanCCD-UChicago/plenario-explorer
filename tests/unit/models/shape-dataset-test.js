import { moduleForModel, test } from 'ember-qunit';

moduleForModel('shape-dataset', 'Unit | Model | shape dataset', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
