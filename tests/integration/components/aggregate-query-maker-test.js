import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-query-maker', 'Integration | Component | aggregate query maker', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('mockSubmit', () => {
    // NoOp
  });

  this.set('mockReset', () => {
    // NoOp
  });

  this.render(hbs`{{aggregate-query-maker submit=(action mockSubmit) reset=(action mockReset)}}`);

  assert.notEqual(this.$().text(), '');

});

/*

test('it submits the query params', function(assert) {
  const universityVillage = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-87.67248630523682,41.86454328565965],[-87.67248630523682,41.872117384500754],[-87.6549768447876,41.872117384500754],[-87.6549768447876,41.86454328565965],[-87.67248630523682,41.86454328565965]]]}};
  let mockLayer = L.geoJson(universityVillage);

  this.set('mockSubmit', (actual) => {
    let expected = {
      geom: JSON.stringify(mockLayer.toGeoJSON()),
      startDate: '2016-2-10',
      endDate: '2016-2-10',
      agg: 'day'
    };
    assert.equal(actual.geoJSON, expected.geom, 'Failed to report correct geoJSON');
    assert.equal(actual.agg, expected.agg, 'Failed to report selected aggregation unit.');
  });

  this.set('mockReset', () => {
    // NoOp
  });

  this.set('layer', mockLayer);

  this.render(hbs`{{aggregate-query-maker geoJSON=layer submit=(action mockSubmit) reset=(action mockReset)}}`);
  this.$('#agg-select').val('day').change();

  this.$('#submit-query').click();
});
*/
