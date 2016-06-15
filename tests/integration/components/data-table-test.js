import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-table', 'Integration | Component | data table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('events', [{"a": "b"}]);
  this.render(hbs`{{data-table events=events}}`);

  assert.notEqual(this.$().text().trim(), '');

});
