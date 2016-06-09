import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('column-filters', 'Integration | Component | column filters', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('filters', '[]');

  this.set('model', JSON.parse('{"attribution":"Austin Energy","description":"This report is the result of the Austin City Code 6-7’s Energy Conservation Audit and Disclosure Ordinance approved in November 2008 (amended in April 2011) to improve the energy efficiency of homes and buildings that receive electricity from Austin Energy. The ordinance meets one of the goals of the Austin Climate Protection Plan, which is to offset 800 megawatts of peak energy demand by 2020. This report contains information on commercial facilities that have reported the EPA’s Energy Star Portfolio Manager benchmarking results in 2013 (*) to the City of Austin. For information on ECAD exemptions and other requirements, see Austin City Code Chapter 6-7. Note – (*) Data reported by Commercial Customers.","viewUrl":"https://data.austintexas.gov/api/views/rka3-mjzi/rows","columns":[{"field_type":"VARCHAR","field_name":"tcad_or_wcad_property_id_s"},{"field_type":"INTEGER","field_name":"floor_area_sqft"},{"field_type":"VARCHAR","field_name":"building_type"},{"field_type":"DOUBLE PRECISION","field_name":"reported_portfolio_manager_energy_star_score"},{"field_type":"DOUBLE PRECISION","field_name":"reported_portfolio_manager_site_kbtu_sqft"},{"field_type":"DATE","field_name":"as_of"},{"field_type":"VARCHAR","field_name":"address"}],"lastUpdate":"2016-03-22T19:15:13.519194","obsFrom":"2014-03-13","bbox":{"type":"Polygon","coordinates":[[[-97.8983281689997,30.1361623920005],[-97.8983281689997,30.5127918130005],[-97.5231051039997,30.5127918130005],[-97.5231051039997,30.1361623920005],[-97.8983281689997,30.1361623920005]]]},"humanName":"2013: ECAD Commercial Portfolio Manager Reported Data","obsTo":"2014-03-13","dateAdded":"2016-03-22T19:15:13.519194","sourceUrl":"https://data.austintexas.gov/api/views/rka3-mjzi/rows.csv?accessType=DOWNLOAD","datasetName":"2013_ecad_commercial_portfolio_manager_reported_da","updateFreq":"yearly","explorerData":{"route":"event"}}'));

  this.render(hbs`{{column-filters filters=filters metadata=model}}`);

  assert.notEqual(this.$().text().trim(), '');

});
