import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aggregate-query-maker', 'Integration | Component | aggregate query maker', {
  integration: true,
});

test('It renders.', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{aggregate-query-maker}}`);

  assert.notEqual(this.$().text(), '', 'The component rendered correctly.');

});

test('Parameters correctly control the component.', function (assert) {
  this.set('start', '2010-06-10');
  this.set('end', '2016-07-20');
  this.set('agg', 'day');
  this.set('center', 'chicago');

  this.set('cities', {
    "chicago": {label: "Chicago", location: [41.795509, -87.581916], zoom: 10},
  });

  this.set('aggOptions', [
    {id: 'day', label: 'day'},
  ]);

  this.render(hbs`{{aggregate-query-maker startDate=start endDate=end agg=agg center=center cities=cities aggOptions=aggOptions}}`);

  assert.equal($("#start-date-filter .form-control").val(), "06/10/2010", "Correctly rendered component based on initial startDate parameter.");
  assert.equal($("#end-date-filter .form-control").val(), "07/20/2016", "Correctly rendered component based on initial endDate parameter.");
  assert.equal($("#agg-select option:selected").text().trim(), "day", "Correctly rendered component based on initial agg parameter.");
  assert.equal($("#map-center-select option:selected").text().trim(), "Chicago", "Correctly rendered component based on initial center parameter.");
});
