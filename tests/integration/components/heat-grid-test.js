import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heat-grid', 'Integration | Component | heat grid', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.get('model', {'humanName': '2013: ECAD Commercial Portfolio Manager Reported Data'});
  this.set('grid', JSON.parse('{"type":"FeatureCollection","features":[{"geometry":{"type":"Polygon","coordinates":[[[-97.89631561826631,30.36412677006069],[-97.89631561826631,30.36862216228366],[-97.90152356164275,30.36862216228366],[-97.90152356164275,30.36412677006069],[-97.89631561826631,30.36412677006069]]]},"type":"Feature","properties":{"count":1}}]}'));

  this.render(hbs`{{heat-grid grid=grid datasetName=model.humanName}}`);
  
  assert.notEqual(this.$().text().trim(), '');
});
