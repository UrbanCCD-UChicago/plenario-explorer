import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shape-intersection', 'Integration | Component | shape intersection', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{shape-intersection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#shape-intersection}}
      template block text
    {{/shape-intersection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
