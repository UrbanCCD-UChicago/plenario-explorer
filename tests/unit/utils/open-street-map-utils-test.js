import { expect } from 'chai';
import { describe, it } from 'mocha';
import { lng2tile, lat2tile } from 'plenario-explorer/utils/open-street-map-utils';

describe('Unit | Utility | open street map utils', function () {
  // FIXME: these tests are kind of bad and incomplete
  const tests = [
    { zoom: 6, lat: 41.889749, lng: -87.623204, expected: [23, 16] },
    { zoom: 8, lat: 41.889749, lng: -87.623204, expected: [95, 65] },
    { zoom: 10, lat: 41.889749, lng: -87.623204, expected: [380, 262] },
  ];

  tests.forEach(function (test) {
    it(`[ ${test.lat}, ${test.lng}], zoom ${test.zoom}`, function () {
      const result = [lat2tile(test.lat, test.zoom), lng2tile(test.lng, test.zoom)];
      expect(result).to.deep.equal(test.expected);
    });
  });
});
