import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import wait from 'ember-test-helpers/wait';
import hbs from 'htmlbars-inline-precompile';
import moment from 'npm:moment';
import ENV from 'plenario-explorer/config/environment';
import { getCenterTileURL } from 'plenario-explorer/utils/open-street-map-utils';

const { geography } = ENV;

describe('Integration | Component | search widget', () => {
  setupComponentTest('search-widget', {
    integration: true,
  });

  // TODO: decouple this from `plenario-explorer/config/environment`
  const defaultPlace = geography.featuredPlaces.findBy('isDefault');
  const otherPlaces = geography.featuredPlaces.rejectBy('isDefault');

  describe('map', function () {
    it('starts with map centered on default place', function () {
      // Calculate what the URL for the center tile should be at each zoom level
      // This mitigates inconsistencies in the test container size which cause the Leaflet
      // map to use an unpredictable zoom level. Order of zoom levels is by likelihood, so we can
      // easily short-circuit our find() calls (passing multiple selectors directly to find()
      // does an exhaustive search)
      const centerTileURLs = [11, 10, 12, 9].map(z => getCenterTileURL(defaultPlace.bounds, z));

      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const tilePane = this.$('.leaflet-tile-pane');
      return wait().then(() => {
        expect(centerTileURLs.some(ct => tilePane.find(`img[src*="${ct}"]`).length)).to.be.true;
      });
    });

    it('re-centers the map when the teleport control is used', function () {
      this.slow(1000); // Re-centering Leaflet maps are *slow*, even with animations off
      const place = otherPlaces[0];

      // Calculate what the URL for the center tile should be at each zoom level
      // This mitigates inconsistencies in the test container size which cause the Leaflet
      // map to use an unpredictable zoom level. Order of zoom levels is by likelihood, so we can
      // easily short-circuit our find() calls (passing multiple selectors directly to find()
      // does an exhaustive search)
      const centerTileURLs = [11, 10, 12, 9].map(z => getCenterTileURL(place.bounds, z));

      this.render(hbs`{{search-widget disableAnimations=true}}`);

      this.$('.leaflet-control select').val(place.bounds.toString()).change();
      const tilePane = this.$('.leaflet-tile-pane');
      return wait().then(() => {
        expect(centerTileURLs.some(ct => tilePane.find(`img[src*="${ct}"]`).length)).to.be.true;
      });
    });

    it.skip('restores predrawn shape if one is passed', function () {});
  });

  describe('dates', function () {
    it('uses reasonable start and end dates', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const startDate = moment(this.$('#search-start-date').val());
      const endDate = moment(this.$('#search-end-date').val());

      expect(startDate.isBefore(moment(), 'day')).to.be.true; // start date in past
      expect(endDate.isAfter(moment(), 'day')).to.be.false; // end date not in future
      expect(startDate.isSameOrBefore(endDate)).to.be.true; // start date before end date
    });

    it('validates date input values are well-formed', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      const sdField = this.$('#search-start-date');
      const edField = this.$('#search-end-date');

      let oldDate = sdField.val();
      sdField.val('foo').change();
      expect(this.$('.form-control-feedback').text()).to.include('Please enter a valid date.');
      sdField.val(oldDate).change();
      expect(this.$('.form-control-feedback').text()).to.not.include('Please enter a valid date.');

      oldDate = edField.val();
      edField.val('bar').change();
      expect(this.$('.form-control-feedback').text()).to.include('Please enter a valid date.');
      edField.val(oldDate).change();
      expect(this.$('.form-control-feedback').text()).to.not.include('Please enter a valid date.');
    });

    it('validates date range (no backwards or future ranges)', function () {
      this.render(hbs`{{search-widget disableAnimations=true}}`);

      this.$('#search-start-date').val(moment().add(1, 'year').format('YYYY-MM-DD')).change();
      expect(this.$('.form-control-feedback').text())
        .to.include("Start date can't be in future.")
        .and.to.include("End date can't be before start date.");
    });
  });

  describe('actions', function () {
    it('resets form values and map when the reset button is clicked', function () {
      this.slow(1000); // We're changing the center of a Leaflet map and that alone is ~750ms

      this.set('actions.noop', function () { /* no-op */ });
      this.render(hbs`{{search-widget disableAnimations=true onReset=(action "noop")}}`);

      const originalVals = {
        startDate: this.$('#search-start-date').val(),
        endDate: this.$('#search-end-date').val(),
        agg: this.$('#search-aggregate-by').val(),
      };

      this.$('.leaflet-control select').val(otherPlaces[0].bounds.toString()).change();
      this.$('#search-start-date').val('1937-05-06').change();
      this.$('#search-end-date').val('1989-11-09').change();
      this.$('#search-aggregate-by').val('week').change();

      this.$('#search-reset-button').click();

      // Check the date/aggregation fields
      expect(this.$('#search-start-date').val()).equals(originalVals.startDate);
      expect(this.$('#search-end-date').val()).equals(originalVals.endDate);
      expect(this.$('#search-aggregate-by').val()).equals(originalVals.agg);

      // Check the map status
      const centerTileURLs = [11, 10, 12, 9].map(z => getCenterTileURL(defaultPlace.bounds, z));
      const tilePane = this.$('.leaflet-tile-pane');
      return wait().then(() => {
        expect(centerTileURLs.some(ct => tilePane.find(`img[src*="${ct}"]`).length)).to.be.true;
      });
    });

    it('sends search parameters when search button is clicked', function () {
      this.set('actions.checkParams', function (queryParams) {
        expect(queryParams, 'not returning all required search parameters')
          .to.have.all.keys(['startDate', 'endDate', 'aggregateBy', 'withinArea']);

        const { startDate, endDate, aggregateBy, withinArea } = queryParams;

        expect(startDate, 'returning incorrect start date')
          .to.equal('1937-05-06');
        expect(endDate, 'returning incorrect end date')
          .to.equal('1989-11-09');
        expect(aggregateBy, 'returning incorrect aggregation setting')
          .to.equal('week');
        expect(() => JSON.parse(withinArea), 'returned area is invalid JSON')
          .to.not.throw();
        expect(() => L.GeoJSON.geometryToLayer(JSON.parse(withinArea)), 'returned area is invalid GeoJSON')
          .to.not.throw();
        expect(JSON.parse(withinArea).geometry.type, 'returned area feature is not a polygon')
          .to.equal('Polygon');
        expect(JSON.parse(withinArea).geometry.coordinates, 'returned area feature is empty')
          .to.be.an('array').that.is.not.empty;
        // TODO: figure out how to check that search area is *accurate* in addition to valid
      });

      this.render(hbs`{{search-widget disableAnimations=true onSubmit=(action "checkParams")}}`);

      this.$('.leaflet-control select').val(otherPlaces[0].bounds.toString()).change();
      this.$('#search-start-date').val('1937-05-06').change();
      this.$('#search-end-date').val('1989-11-09').change();
      this.$('#search-aggregate-by').val('week').change();

      this.$('#search-submit-button').click();
    });
  });
});
