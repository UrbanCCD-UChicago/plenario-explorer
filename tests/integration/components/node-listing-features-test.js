import {moduleForComponent, test} from "ember-qunit";
import hbs from "htmlbars-inline-precompile";

moduleForComponent('node-listing-features', 'Integration | Component | node listing features', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{node-listing-features}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#node-listing-features}}
      template block text
    {{/node-listing-features}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
