import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt-cell-checkbox', 'Integration | Component | lt cell checkbox', {
  integration: true,
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lt-cell-checkbox}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lt-cell-checkbox}}
      template block text
    {{/lt-cell-checkbox}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
