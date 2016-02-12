import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-query-maker', 'Integration | Component | aggregate query maker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{aggregate-query-maker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#aggregate-query-maker}}
      template block text
    {{/aggregate-query-maker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
