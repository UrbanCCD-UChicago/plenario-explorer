import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('node-listing-features', 'Integration | Component | node listing features', {
  integration: true,
});

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('table', {
    sensorMetadata: [
      {
        name: 'sensor_dev_1',
        features: [
          'magnetic_field',
        ],
      },
      {
        name: 'sensor_dev_4',
        features: [
          'gas_concentration',
          'magnetic_field',
          'temperature',
        ],
      },
    ],
  });
  this.set('record', {
    properties: {
      sensors: [
        'sensor_dev_1',
        'sensor_dev_4',
      ],
    },
  });
  this.render(hbs`{{node-listing-features record=record table=table}}`);

  assert.equal(this.$().text().trim().split('\n')
    .map(s => s.trim())
    .join(', '), 'Gas concentration, Magnetic field, Temperature');

  // This component does not support block usage
  // // Template block usage:
  // this.render(hbs`
  //   {{#node-listing-features}}
  //     template block text
  //   {{/node-listing-features}}
  // `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
});
