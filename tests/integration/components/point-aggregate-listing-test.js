import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('point-aggregate-listing', 'Integration | Component | point aggregate listing', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{point-aggregate-listing}}`);

  assert.notEqual(this.$().text().trim(), '');
});
