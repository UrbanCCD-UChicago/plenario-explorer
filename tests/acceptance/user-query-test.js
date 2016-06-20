import {test} from 'qunit';
import moduleForAcceptance from 'plenario-explorer/tests/helpers/module-for-acceptance';
import testData from 'plenario-explorer/tests/helpers/test-data';

moduleForAcceptance('Acceptance | user query');

const geoJSON = encodeURIComponent(JSON.stringify(testData.params.location_geom__within));

test('Front page loads properly with query parameters.', function (assert) {
  visit('?obs_date__ge=2010-06-01&obs_date__le=2017-07-02&agg=day&center=seattle');

  andThen(function () {
    assert.equal(currentRouteName(), 'discover.index', "The front page routes to discover.index.");
    assert.equal($('#submit-query').is('button'), true, "The front page renders properly: submit button is present.");
    assert.equal($('#start-date-filter input').val(), '06/01/2010', "Query parameter was able to set the start date.");
    assert.equal($('#end-date-filter input').val(), '07/02/2017', "Query parameter was able to set the end date.");
    assert.equal($('#agg-select option:selected').text().trim(), 'day', "Query parameter was able to set the aggregation mode.");
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle', "Query parameter was able to set the map center.");
  });
});

test('User can make a query.', function (assert) {
  //location_geom__within is just an arbitrary shape so that /discover/aggregate will accept the query in the first place.
  visit('discover?location_geom__within=' + geoJSON);
  andThen(function () {
    fillIn('#start-date-filter input', '06/01/2010');
    fillIn('#end-date-filter input', '07/02/2016');
    fillIn('#agg-select', 'day');

    andThen(function () {

      click('#submit-query');

      andThen(function () {
        assert.equal(currentRouteName(), 'discover.aggregate', "Making a query routes to discover.aggregate.");
        assert.equal($('#point-aggregate-listing').is('div'), true, "Query completes properly; point aggregate listing is present.");
      });
    });
  });
});

test('User can directly visit a query page with query parameters.', function (assert) {
  visit('/discover/aggregate?location_geom__within=' + geoJSON + '&obs_date__ge=2010-06-01&obs_date__le=2017-07-02&center=seattle&agg=day');
  andThen(function () {
    assert.equal(currentRouteName(), 'discover.aggregate', "Query routes to discover.aggregate");
    assert.equal($('#point-aggregate-listing').is('div'), true, "Query completes properly; point aggregate listing is present.");
    assert.equal($('#start-date-filter input').val(), '06/01/2010', "Query parameter was able to set the start date.");
    assert.equal($('#end-date-filter input').val(), '07/02/2017', "Query parameter was able to set the end date.");
    assert.equal($('#agg-select option:selected').text().trim(), 'day', "Query parameter was able to set the aggregation mode.");
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle', "Query parameter was able to set the map center.");
  });
});

test('User can reset a query.', function (assert) {
  visit('/discover/aggregate?location_geom__within=' + geoJSON + '&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function () {
    assert.equal($('#point-aggregate-listing').is('div'), true);
    click('#reset-query');
    andThen(function () {
      assert.equal(currentURL(), '/discover', "Resetting the route returns to /discover.");
      assert.equal($('#point-aggregate-listing').is('div'), false, "Resetting the route succeeded; point aggregate listing is no longer present.");
      assert.equal($('#point-index-listing').is('div'), true, "Resetting the route succeeded; point index listing is now present.");
    });
  });
});

test('Event links from queries go to real pages.', function (assert) {
  visit('/discover/aggregate?location_geom__within=' + geoJSON + '&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function () {
    assert.notEqual($('#point-aggregate-listing a.ember-view:eq(0)').attr('href'), '', 'Event links are not empty.');
    assert.notEqual($('#point-aggregate-listing a.ember-view:eq(0)').attr('href'), '#', 'Event links do not route to #.');
    assert.equal($('#point-aggregate-listing a.ember-view:eq(0)').attr('href').indexOf('/event') > -1, true, 'Event links follow the event route!');
  });
});

test('Changing the map center selection changes the actual map.', function (assert) {
  visit('/discover');
  andThen(function () {
    assert.notEqual($('#map').find('img[src$="/10/262/380.png"]').length, 0, "Default map was centered on Chicago.");  //Chicago map tile
    $("#map-center-select select").val("bristol").change();
    andThen(function () {
      assert.notEqual($('#map').find('img[src$="/11/1009/681.png"]').length, 0, "Changing the center selection recenters the map onto Bristol, UK.");  //Bristol, UK map tile
      $("#map-center-select select").val("seattle").change();
      andThen(function () {
        assert.notEqual($('#map').find('img[src$="/11/328/715.png"]').length, 0, "Changing the center selection recenters the map onto Seattle.");  //Seattle map tile
        $("#map-center-select select").val("newyork").change();
        andThen(function () {
          assert.notEqual($('#map').find('img[src$="/10/301/384.png"]').length, 0, "Changing the center selection recenters the map onto New York.");  //New York map tile
        });
      });
    });
  });
});

test('Changing selection on the front page changes query parameters.', function (assert) {
  visit('/discover');
  andThen(function () {
    $("#agg-select select").val('day').change();
    andThen(function () {
      assert.equal(currentURL().indexOf('agg=day') > -1, true, "Changing agg updated query parameters.");
      $("#agg-select select").val('year').change();
      andThen(function () {
        assert.equal(currentURL().indexOf('agg=year') > -1, true, "Changing agg updated query parameters.");
        $("#map-center-select select").val('seattle').change();
        andThen(function () {
          assert.equal(currentURL().indexOf('center=seattle') > -1, true, "Changing center updated query parameters.");
          $("#map-center-select select").val('newyork').change();
          andThen(function () {
            assert.equal(currentURL().indexOf('center=newyork') > -1, true, "Changing center updated query parameters.");
          });
        });
      });
    });
  });
});
