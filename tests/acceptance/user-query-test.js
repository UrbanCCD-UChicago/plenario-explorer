import { test } from 'qunit';
import moduleForAcceptance from 'plenario-explorer/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user query');

/*function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}*/

test('front page loads properly with query parameters', function(assert) {
  visit('discover?obs_date__ge=2010-06-01&obs_date__le=2017-07-02&agg=day&center=seattle');

  andThen(function(){
    assert.equal(currentRouteName(), 'discover.index');
    assert.equal($('#submit-query').is('button'), true);
    assert.equal($('#start-date-filter .form-control').val(), '06/01/2010');
    assert.equal($('#end-date-filter .form-control').val(), '07/02/2017');
    assert.equal($('#agg-select option:selected').text().trim(), 'day');
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle');
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
        //Query parameters aren't set in the URL during testing!
        //I'll hold off on these until there's good way to test queryParams values.
        //Perhaps these should be tested in the discover/index CONTROLLER instead,
        //or even the aggregate-query-maker component
        //assert.equal($('#start-date-filter .form-control').val(), '06/01/2010');
        //assert.equal($('#end-date-filter .form-control').val(), '07/02/2016');
        //assert.equal($('#agg-select option:selected').text().trim(), 'day');
        //assert.equal($('#point-aggregate-listing').is('div'), true);
        assert.equal(currentRouteName(), 'discover.aggregate');
        assert.equal($('#point-aggregate-listing').is('div'), true);
      });
    });
  });
});

test('user can directly visit a query page with query parameters', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-01&obs_date__le=2017-07-02&center=seattle&agg=day');
  andThen(function(){
    assert.equal(currentRouteName(), 'discover.aggregate');
    assert.equal($('#point-aggregate-listing').is('div'), true);
    assert.equal($('#start-date-filter .form-control').val(), '06/01/2010');
    assert.equal($('#end-date-filter .form-control').val(), '07/02/2017');
    assert.equal($('#agg-select option:selected').text().trim(), 'day');
    assert.equal($('#map-center-select option:selected').text().trim(), 'Seattle');
  });
});

test('user can reset a query', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function(){
    assert.equal($('#point-aggregate-listing').is('div'), true);
    click('#reset-query');
    andThen(function(){
      assert.equal(currentURL(), '/discover');
      assert.equal($('#point-aggregate-listing').is('div'), false);
    });
  });
});

/*test('user can make a query and select a dataset', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.67900943756104%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.92680320648791%5D%2C%5B-87.56227970123291%2C41.821478516604024%5D%2C%5B-87.67900943756104%2C41.821478516604024%5D%5D%5D%7D%7D&obs_date__ge=2010-06-10&obs_date__le=2017-07-02');
  andThen(function(){
    $('#point-aggregate-listing a:eq(0)').attr('id', 'selected-dataset-test');
    $('#selected-dataset-test').attr('target', 'ember-testing-container');
    click('#selected-dataset-test');
    andThen(function(){
      assert.equal(currentRouteName(), 'event');
    });
  });
});*/

/*
test('user can recenter map', function(assert) {
  visit('discover');
  andThen(function() {
    fillIn('#map-center-selector', 'seattle');

    andThen(function(){
      assert.equal(getParameterByName('center', currentURL()), 'seattle');
    });
  });
});*/
