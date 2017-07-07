import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import ENV from 'plenario-explorer/config/environment';
import { lng2tile, lat2tile } from 'plenario-explorer/utils/open-street-map-utils';

const { geography } = ENV;

describe('Integration | Component | search widget', () => {
  setupComponentTest('search-widget', {
    integration: true,
  });

  const defaultPlace = geography.featuredPlaces.findBy('isDefault');

  it(`starts with map centered on ${defaultPlace.label}`, function () {
    const { lat, lng } = L.latLngBounds(defaultPlace.bounds).getCenter();
    const centerTiles = [9, 10, 11, 12].map(z =>
      `img[src*="${z}/${lng2tile(lng, z)}/${lat2tile(lat, z)}"]`
    );

    this.render(hbs`{{search-widget}}`);
    expect(this.$('.leaflet-tile-pane').find(centerTiles.join(', '))).to.have.length(1);
  });
});
