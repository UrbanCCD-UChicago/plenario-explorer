import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-query-maker', 'Integration | Component | event query maker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{event-query-maker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#event-query-maker}}
      template block text
    {{/event-query-maker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
