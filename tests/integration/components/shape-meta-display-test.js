import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('shape-meta-display', 'Integration | Component | shape meta display', {
  integration: true
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{shape-meta-display}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#shape-meta-display}}
      template block text
    {{/shape-meta-display}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
