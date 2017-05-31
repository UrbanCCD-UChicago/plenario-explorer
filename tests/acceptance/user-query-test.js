import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'plenario-explorer/tests/helpers/module-for-acceptance';
import testData from 'plenario-explorer/mirage/test-data';

moduleForAcceptance('Acceptance | user query');

const geoJSON = encodeURIComponent(JSON.stringify(testData.params.location_geom__within));

test('Discover page loads properly with query parameters.', (assert) => {
  visit('/discover?obs_date__ge=2010-06-01&obs_date__le=2017-07-02&agg=day&center=seattle');

  andThen(() => {
    assert.equal(currentRouteName(), 'discover.index', 'The front page routes to discover.index.');
    assert.equal($('#submit-query').is('button'), true, 'The front page renders properly: submit button is present.');
    assert.equal($('#start-date-filter input').val(), '06/01/2010', 'Query parameter was able to set the start date.');
    assert.equal($('#end-date-filter input').val(), '07/02/2017', 'Query parameter was able to set the end date.');
    assert.equal($('#agg-select option:selected').text().trim(), 'day', 'Query parameter was able to set the aggregation mode.');
    assert.notEqual($('.large-map').find('img[src$="/10/164/357.png"]').length, 0, 'Query parameter was able to set the map center.');
  });
});

test('User can make a query.', (assert) => {
  // location_geom__within is just an arbitrary shape so that /discover/aggregate
  // will accept the query in the first place.
  visit(`discover?location_geom__within=${geoJSON}`);
  andThen(() => {
    fillIn('#start-date-filter input', '06/01/2010');
    fillIn('#end-date-filter input', '07/02/2016');
    fillIn('#agg-select', 'day');

    andThen(() => {
      click('#submit-query');

      andThen(() => {
        assert.equal(currentRouteName(), 'discover.aggregate', 'Making a query routes to discover.aggregate.');
        assert.equal($('#point-aggregate-listing').is('div'), true, 'Query completes properly; point aggregate listing is present.');
      });
    });
  });
});

test('User can directly visit a query page with query parameters.', (assert) => {
  visit(`/discover/aggregate?location_geom__within=${geoJSON}&obs_date__ge=2010-06-01&obs_date__le=2017-07-02&center=chicago&agg=day`);
  andThen(() => {
    assert.equal(currentRouteName(), 'discover.aggregate', 'Query routes to discover.aggregate');
    assert.equal($('#point-aggregate-listing').is('div'), true, 'Query completes properly; point aggregate listing is present.');
    assert.equal($('#start-date-filter input').val(), '06/01/2010', 'Query parameter was able to set the start date.');
    assert.equal($('#end-date-filter input').val(), '07/02/2017', 'Query parameter was able to set the end date.');
    assert.equal($('#agg-select option:selected').text().trim(), 'day', 'Query parameter was able to set the aggregation mode.');
    assert.notEqual($('.large-map').find('img[src$="15/8408/12177.png"]').length, 0, 'Query parameter was able to zoom the map to the geoJSON bounds.');
  });
});

test('User can reset a query.', (assert) => {
  visit(`/discover/aggregate?location_geom__within=${geoJSON}&obs_date__ge=2010-06-10&obs_date__le=2017-07-02`);
  andThen(() => {
    assert.equal($('#point-aggregate-listing').is('div'), true);
    return Ember.run.later(() => { // Wait for everything to stop moving
      click('#reset-query');
      andThen(() => Ember.run.later(() => {
        assert.equal(currentURL(), '/discover', 'Resetting the route returns to /discover.');
        assert.equal($('#point-aggregate-listing').is('div'), false, 'Resetting the route succeeded; point aggregate listing is no longer present.');
        assert.equal($('#point-index-listing').is('div'), true, 'Resetting the route succeeded; point index listing is now present.');
      }));
    }, 1000);
  });
});

test('Event links from queries go to real pages.', (assert) => {
  visit(`/discover/aggregate?location_geom__within=${geoJSON}&obs_date__ge=2010-06-10&obs_date__le=2017-07-02`);
  andThen(() => {
    assert.notEqual($('#point-aggregate-listing a.ember-view:eq(0)').attr('href'), '', 'Event links are not empty.');
    assert.notEqual($('#point-aggregate-listing a.ember-view:eq(0)').attr('href'), '#', 'Event links do not route to #.');
    assert.equal($('#point-aggregate-listing a.ember-view:eq(0)').attr('href').indexOf('/event') > -1, true, 'Event links follow the event route!');
  });
});

test('Changing the map center selection changes the actual map.', (assert) => {
  visit('/discover');
  andThen(() => {
    assert.notEqual($('.large-map').find('img[src$="/10/262/380.png"]').length, 0, 'Default map was centered on Chicago.');  // Chicago map tile
    fillIn('#map-center-select', 'bristol');
    andThen(() => {
      assert.notEqual($('.large-map').find('img[src$="/11/1009/681.png"]').length, 0, 'Changing the center selection recenters the map onto Bristol, UK.');  // Bristol, UK map tile
      fillIn('#map-center-select', 'seattle');
      andThen(() => {
        assert.notEqual($('.large-map').find('img[src$="/10/164/357.png"]').length, 0, 'Changing the center selection recenters the map onto Seattle.');  // Seattle map tile
        fillIn('#map-center-select', 'newyork');
        andThen(() => {
          assert.notEqual($('.large-map').find('img[src$="/10/301/384.png"]').length, 0, 'Changing the center selection recenters the map onto New York.');  // New York map tile
        });
      });
    });
  });
});


test('User can directly specify map center coordinates via the URL.', (assert) => {
  visit('/discover?center=51.89426503878691,1.4826178550720215');
  andThen(() => {
    assert.notEqual($('.large-map').find('img[src$="10/516/338.png"]').length, 0, 'Map uses coordinates to center on Sealand.');  // Sealand map tile
  });
});

test('Changing selection on the front page changes query parameters.', (assert) => {
  visit('/discover');
  andThen(() => {
    fillIn('#agg-select', 'day');
    andThen(() => {
      assert.equal(currentURL().indexOf('agg=day') > -1, true, 'Changing agg updated query parameters.');
      fillIn('#agg-select', 'year');
      andThen(() => {
        assert.equal(currentURL().indexOf('agg=year') > -1, true, 'Changing agg updated query parameters.');
        fillIn('#map-center-select', 'seattle');
        andThen(() => {
          assert.equal(currentURL().indexOf('center=seattle') > -1, true, 'Changing center updated query parameters.');
          fillIn('#map-center-select', 'newyork');
          andThen(() => {
            assert.equal(currentURL().indexOf('center=newyork') > -1, true, 'Changing center updated query parameters.');
          });
        });
      });
    });
  });
});

// TODO: test that user can do a datadump
