import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-table', 'Integration | Component | data table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('columns', ['a', 'b', 'c']);
  this.render(hbs`{{data-table columns=columns}}`);

  assert.notEqual(this.$().text().trim(), '');

});
