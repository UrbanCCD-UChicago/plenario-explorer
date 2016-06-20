import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('point-query-maker', 'Integration | Component | point query maker', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{point-query-maker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#point-query-maker}}
      template block text
    {{/point-query-maker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
