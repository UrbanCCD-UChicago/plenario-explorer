import { expect } from 'chai';
import { describe, it } from 'mocha';
import {
  lng2tile,
  lat2tile,
  getCenterTileURLFragment,
} from 'plenario-explorer/utils/open-street-map-utils';

describe('Unit | Utility | open street map utils', function () {
  const testValues = [
    { bounds: [[51.5444317, -2.7183704], [51.3972838, -2.5104192]], zoom: 8, x: 126, y: 85 },
    { bounds: [[42.0230219, -87.940101], [41.643919, -87.5239841]], zoom: 9, x: 131, y: 190 },
    { bounds: [[40.9161785, -74.259090], [40.477399, -73.7001809]], zoom: 17, x: 38600, y: 49288 },
    { bounds: [[40.5012010, -80.095517], [40.36152, -79.865728]], zoom: 2, x: 1, y: 1 },
    { bounds: [[53.3956433, -113.7136622], [53.7160698, -113.2714783]], zoom: 10, x: 189, y: 330 },
  ];

  testValues.forEach((val) => {
    const center = L.latLngBounds(val.bounds).getCenter();
    Object.assign(val, center);
  });

  it('returns correct tile x coordinate', function () {
    testValues.forEach((val) => {
      const actual = lng2tile(val.lng, val.zoom);
      expect(actual, `incorrect x coordinate "${actual}", should be "${val.x}"`)
        .to.equal(val.x);
    });
  });

  it('returns correct tile y coordinate', function () {
    testValues.forEach((val) => {
      const actual = lat2tile(val.lat, val.zoom);
      expect(actual, `incorrect x coordinate "${actual}", should be "${val.y}"`)
        .to.equal(val.y);
    });
  });

  it('returns correct tile URL fragment', function () {
    testValues.forEach((val) => {
      const actual = getCenterTileURLFragment(val.bounds, val.zoom);
      expect(actual, 'URL tile fragment improperly formatted')
        .to.equal(`${val.zoom}/${lng2tile(val.lng, val.zoom)}/${lat2tile(val.lat, val.zoom)}`);
    });
  });
});
