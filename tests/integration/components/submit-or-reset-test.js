import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('submit-or-reset', 'Integration | Component | submit or reset', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{submit-or-reset}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#submit-or-reset}}
      template block text
    {{/submit-or-reset}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
