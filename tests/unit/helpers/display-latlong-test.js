import {displayLatlong} from "plenario-explorer/helpers/display-latlong";
import {module, test} from "qunit";

module('Unit | Helper | display latlong');

// Replace this with your real tests.
test('it works', function(assert) {
  const coords0 = [0, 0];
  const coordsN = [  1.41421,  42.31415];
  const coordsS = [  1.41421, -42.31415];
  const coordsE = [ 42.31415,   1.41421];
  const coordsW = [-42.31415,   1.41421];
  let result = displayLatlong([coords0]);
  assert.equal(result, '0° N/S, 0° E/W', 'correctly prints [0, 0]');
  result = displayLatlong([coordsN]);
  assert.equal(result, '42.31415° N, 1.41421° E', 'correctly prints a point north of the equator');
  result = displayLatlong([coordsS]);
  assert.equal(result, '42.31415° S, 1.41421° E', 'correctly prints a point south of the equator');
  result = displayLatlong([coordsE]);
  assert.equal(result, '1.41421° N, 42.31415° E', 'correctly prints a point east of the prime meridian');
  result = displayLatlong([coordsW]);
  assert.equal(result, '1.41421° N, 42.31415° W', 'correctly prints a point west of the prime meridian');
  result = displayLatlong([coords0], {'arcUnits': true});
  assert.equal(result, '0°0\'0" N/S, 0°0\'0" E/W', 'correctly prints [0, 0] in arc units (degrees, minutes, seconds)');
  result = displayLatlong([coordsN], {'arcUnits': true});
  assert.equal(result, '42°18\'50.94" N, 1°24\'51.16" E', 'correctly prints a point north of the equator in arc units (degrees, minutes, seconds)');
});
