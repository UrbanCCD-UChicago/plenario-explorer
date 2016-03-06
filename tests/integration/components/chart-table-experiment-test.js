import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-table-experiment', 'Integration | Component | chart table experiment', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{chart-table-experiment}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#chart-table-experiment}}
      template block text
    {{/chart-table-experiment}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
