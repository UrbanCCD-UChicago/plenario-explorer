import { test } from 'qunit';
import moduleForAcceptance from 'plenario-explorer/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user query');

test('front page loads properly with query parameters', function(assert) {
  visit('?obs_date__ge=2010-06-01&obs_date__le=2017-07-02&agg=day&center=seattle');

  andThen(function(){
    assert.equal(currentRouteName(), 'discover.index', "Front page fails to go to route discover.index.");
    assert.equal($('#submit-query').is('button'), true, "Front page did not render properly: submit button is missing.");
    assert.equal($('#start-date-filter .form-control').val(), '06/01/2010', "Query parameter was unable to set the start date.");
    assert.equal($('#end-date-filter .form-control').val(), '07/02/2017', "Query parameter was unable to set the end date.");
    assert.equal($('#agg-select option:selected').text().trim(), 'day', "Query parameter was unable to set the aggregation mode.");
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle', "Query parameter was unable to set the map center.");
  });
});

test('user can make a query', function(assert) {
  visit('discover?location_geom__within=%7B"type"%3A"Feature"%2C"properties"%3A%7B%7D%2C"geometry"%3A%7B"type"%3A"Polygon"%2C"coordinates"%3A%5B%5B%5B-87.68862247467041%2C41.80510182643331%5D%2C%5B-87.68862247467041%2C41.90432124806034%5D%2C%5B-87.55678653717041%2C41.90432124806034%5D%2C%5B-87.55678653717041%2C41.80510182643331%5D%2C%5B-87.68862247467041%2C41.80510182643331%5D%5D%5D%7D%7D');
  andThen(function() {
    fillIn('#start-date-filter .form-control', '06/01/2010');
    fillIn('#end-date-filter .form-control', '07/02/2016');
    fillIn('#agg-select', 'day');

    andThen(function(){

      click('#submit-query');

      andThen(function(){
        assert.equal(currentRouteName(), 'discover.aggregate', "Making a query fails to go to route discover.aggregate.");
        assert.equal($('#point-aggregate-listing').is('div'), true, "Query did not complete properly; point aggregate listing is missing.");
      });
    });
  });
});

test('user can directly visit a query page with query parameters', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-01&obs_date__le=2017-07-02&center=seattle&agg=day');
  andThen(function(){
    assert.equal(currentRouteName(), 'discover.aggregate', "Query failed to load route discover.aggregate");
    assert.equal($('#point-aggregate-listing').is('div'), true, "Query did not complete properly; point aggregate listing is missing.");
    assert.equal($('#start-date-filter .form-control').val(), '06/01/2010', "Query parameter was unable to set the start date.");
    assert.equal($('#end-date-filter .form-control').val(), '07/02/2017', "Query parameter was unable to set the end date.");
    assert.equal($('#agg-select option:selected').text().trim(), 'day', "Query parameter was unable to set the aggregation mode.");
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle', "Query parameter was unable to set the map center.");
  });
});

test('user can reset a query', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function(){
    assert.equal($('#point-aggregate-listing').is('div'), true);
    click('#reset-query');
    andThen(function(){
      assert.equal(currentURL(), '/discover', "Resetting the route failed to go back to bare /discover.");
      assert.equal($('#point-aggregate-listing').is('div'), false, "Resetting the route failed; point aggregate listing from the query is still present.");
    });
  });
});

test('event links from queries go to real pages', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function(){
    assert.notEqual($('#point-aggregate-listing a:eq(0)').attr('href'), '', 'event links are empty!');
    assert.notEqual($('#point-aggregate-listing a:eq(0)').attr('href'), '#', 'event links just go to #!');
    assert.equal($('#point-aggregate-listing a:eq(0)').attr('href').indexOf('/event') > -1, true, 'event links fail to follow the event route!');
  });
});
