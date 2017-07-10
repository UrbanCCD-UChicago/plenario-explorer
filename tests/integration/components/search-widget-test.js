import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import moment from 'npm:moment';
import ENV from 'plenario-explorer/config/environment';
import { lng2tile, lat2tile } from 'plenario-explorer/utils/open-street-map-utils';

const { geography } = ENV;

describe('Integration | Component | search widget', () => {
  setupComponentTest('search-widget', {
    integration: true,
  });

  const defaultPlace = geography.featuredPlaces.findBy('isDefault');
  const otherPlaces = geography.featuredPlaces.rejectBy('isDefault');

  const defaultStartDate = moment().subtract(90, 'days').startOf('day');
  const defaultEndDate = moment().endOf('day');

  describe('map', function () {
    it(`starts with map centered on default place (${defaultPlace.label})`, function () {
      const { lat, lng } = L.latLngBounds(defaultPlace.bounds).getCenter();
      const centerTiles = [9, 10, 11, 12].map(z =>
        `img[src*="${z}/${lng2tile(lng, z)}/${lat2tile(lat, z)}"]`
      );

      this.render(hbs`{{search-widget disableAnimations=true}}`);
      return wait().then(() => {
        expect(this.$('.leaflet-tile-pane').find(centerTiles.join(', ')))
          .to.have.lengthOf(1);
      });
    });

    it('correctly re-centers the map when the teleport control is used', function () {
      this.slow(1000); // Re-centering Leaflet maps are *slow*, even with animations off
      const place = otherPlaces[0];

      const { lat, lng } = L.latLngBounds(place.bounds).getCenter();
      const centerTiles = [9, 10, 11, 12].map(z =>
        `img[src*="${z}/${lng2tile(lng, z)}/${lat2tile(lat, z)}"]`
      );

      this.render(hbs`{{search-widget disableAnimations=true}}`);

      this.$('.leaflet-control select').val(place.bounds.toString()).change();
      return wait().then(() => {
        expect(this.$('.leaflet-tile-pane').find(centerTiles.join(', ')))
          .to.have.lengthOf(1);
      });
    });
  });

  describe('date validation', function () {
    it('defaults start date to 90 days ago', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const actual = moment(this.$('#search-start-date').val());
      expect(actual.isSame(defaultStartDate, 'day')).to.be.true;
    });

    it('defaults end date to today', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const actual = moment(this.$('#search-end-date').val());
      expect(actual.isSame(defaultEndDate, 'day')).to.be.true;
    });

    it('validates input values formats correctly', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const timeCard = this.$('.time-card').first();
      const sdField = this.$('#search-start-date');
      const edField = this.$('#search-end-date');

      sdField.val('foo').change();
      wait().then(function () {
        expect(timeCard.text()).to.include('Please enter a valid date.');
      });
      sdField.val(defaultStartDate.format()).change();

      edField.val('bar').change();
      wait().then(function () {
        expect(timeCard.text()).to.include('Please enter a valid date.');
      });
      edField.val(defaultEndDate.format()).change();
    });
  });
});
