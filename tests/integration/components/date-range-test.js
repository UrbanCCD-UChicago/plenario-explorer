import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('date-range', 'Integration | Component | date range', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{date-range startDate="2010-06-01" endDate="2016-07-02"}}`);

  assert.notEqual(this.$().text(), '');
});
