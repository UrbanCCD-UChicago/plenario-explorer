import {unsnakify} from "plenario-explorer/helpers/unsnakify";
import {module, test} from "qunit";

module('Unit | Helper | unsnakify');

test('it works', function(assert) {
  let result = unsnakify(['sneaky_snake']);
  assert.equal(result, 'sneaky snake');
  result = unsnakify(['sneaky_snake'], {titleCase: true});
  assert.equal(result, 'Sneaky Snake');
  result = unsnakify(['sneaky_snake'], {capitalizeFirst: true});
  assert.equal(result, 'Sneaky snake');
});
