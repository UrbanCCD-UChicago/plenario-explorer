import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-query-maker', 'Integration | Component | aggregate query maker', {
  integration: true,
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

test('parameters correctly control the component', function(assert){
  this.set('start', '2010-06-10');
  this.set('end', '2016-07-20');
  this.set('agg', 'day');
  this.set('center', 'chicago');

  this.set('mockSubmit', () => {
    // NoOp
  });

  this.set('mockReset', () => {
    // NoOp
  });

  this.render(hbs`{{aggregate-query-maker startDate=start endDate=end submit=(action mockSubmit) agg=agg center=center reset=(action mockReset)}}`);

  assert.equal($("#start-date-filter .form-control").val(), "06/10/2010", "failed to correctly render component based on initial startDate parameter.");
  assert.equal($("#end-date-filter .form-control").val(), "07/20/2016", "failed to correctly render component based on initial endDate parameter.");
  assert.equal($("#agg-select option:selected").text().trim(), "day", "failed to correctly render component based on initial agg parameter.");
  assert.equal($("#map-center-select option:selected").text().trim(), "Chicago", "failed to correctly render component based on initial center parameter.");

  this.set('agg', 'week');
  this.set('center', 'seattle');

  assert.equal($("#agg-select option:selected").text().trim(), "week", "component failed to change after updating agg parameter.");
  assert.equal($("#map-center-select option:selected").text().trim(), "Seattle", "component failed to change after updating center parameter.");
});

// global L
/*
test('it submits the query params', function(assert) {
  const universityVillage = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-87.67248630523682,41.86454328565965],[-87.67248630523682,41.872117384500754],[-87.6549768447876,41.872117384500754],[-87.6549768447876,41.86454328565965],[-87.67248630523682,41.86454328565965]]]}};
  let mockLayer = L.geoJson(universityVillage);

  this.set('mockSubmit', () => {
    let expected = {
      geom: JSON.stringify(mockLayer.toGeoJSON()),
      startDate: '2016-2-10',
      endDate: '2016-2-10',
      agg: 'day'
    };
    assert.equal(component.get('obs_date__ge'), expected.startDate);
    assert.equal(component.get('obs_date__le'), expected.endDate);
    assert.equal(component.get('agg'), expected.agg);
    assert.equal(component.get('layer'), expected.geom);
  });

  this.set('mockReset', () => {
    // NoOp
  });

  this.set('layer', mockLayer);
  this.set('agg', 'week');
  this.set('obs_date__ge', '2016-2-10');
  this.set('obs_date__le', '2016-2-10');

  this.render(hbs`{{aggregate-query-maker startDate=obs_date__ge endDate=obs_date__le agg=agg geoJSON=layer submit=(action mockSubmit) reset=(action mockReset)}}`);

  this.$('#agg-select').val('day').change();
  this.$('#start-date-filter .form-control').val('2016-2-10');
  this.$('#end-date-filter .form-control').val('2016-2-10');
  this.$('#submit-query').click();
});
*/
