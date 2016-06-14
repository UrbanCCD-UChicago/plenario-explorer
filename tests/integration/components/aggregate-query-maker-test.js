import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-query-maker', 'Integration | Component | aggregate query maker', {
  integration: true,
});

test('It renders.', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('mockSubmit', () => {
    // NoOp
  });

  this.set('mockReset', () => {
    // NoOp
  });

  this.render(hbs`{{aggregate-query-maker startDate="2010-06-01" endDate="2016-07-02" submit=(action mockSubmit) reset=(action mockReset)}}`);

  assert.notEqual(this.$().text(), '', 'The component rendered correctly.');

});

test('Parameters correctly control the component.', function(assert){
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

  this.set('cities', {
    "chicago": {label: "Chicago", location: [41.795509, -87.581916], zoom: 10},
    "newyork": {label: "New York", location:[40.7268362,-74.0017699], zoom: 10},
    "seattle": {label: "Seattle", location:[47.6076397,-122.3258644], zoom: 11},
    "sanfrancisco": {label: "San Francisco", location:[37.7618864,-122.4406926], zoom: 12},
    "austin": {label: "Austin", location:[30.3075693,-97.7399898], zoom: 10},
    "denver": {label: "Denver", location:[39.7534338,-104.890141], zoom: 11},
    "bristol": {label: "Bristol, UK", location:[51.4590572,-2.5909956], zoom: 11}
  });

  this.set('aggOptions', [
    {id: 'day', label: 'day'},
    {id: 'week', label: 'week'},
    {id: 'month', label: 'month'},
    {id: 'quarter', label: 'quarter'},
    {id: 'year', label: 'year'}
  ]);

  this.render(hbs`{{aggregate-query-maker startDate=start endDate=end agg=agg center=center cities=cities aggOptions=aggOptions centerCoords=centerCoords submit=(action mockSubmit) reset=(action mockReset)}}`);

  assert.equal($("#start-date-filter .form-control").val(), "06/10/2010", "Correctly rendered component based on initial startDate parameter.");
  assert.equal($("#end-date-filter .form-control").val(), "07/20/2016", "Correctly rendered component based on initial endDate parameter.");
  assert.equal($("#agg-select option:selected").text().trim(), "day", "Correctly rendered component based on initial agg parameter.");
  assert.equal($("#map-center-select option:selected").text().trim(), "Chicago", "Correctly rendered component based on initial center parameter.");
 });
