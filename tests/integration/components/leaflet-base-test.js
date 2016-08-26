import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('leaflet-base', 'Integration | Component | leaflet base', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{leaflet-base}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#leaflet-base}}
      template block text
    {{/leaflet-base}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
