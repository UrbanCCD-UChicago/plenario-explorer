import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('node-listing-minimap', 'Integration | Component | node listing minimap', {
  integration: true,
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{node-listing-minimap}}`);

  assert.equal(this.$().text().trim(), '');

  // This component does not support block usage
  // // Template block usage:
  // this.render(hbs`
  //   {{#node-listing-minimap}}
  //     template block text
  //   {{/node-listing-minimap}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
