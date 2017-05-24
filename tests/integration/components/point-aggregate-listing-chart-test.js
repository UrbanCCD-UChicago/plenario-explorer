import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('point-aggregate-listing-chart', 'Integration | Component | point aggregate listing chart', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{point-aggregate-listing-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#point-aggregate-listing-chart}}
      template block text
    {{/point-aggregate-listing-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
