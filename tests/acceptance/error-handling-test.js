import { test } from 'qunit';
import moduleForAcceptance from 'plenario-explorer/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | error handling');

test('Visits to a non-page will be redirected to the index.', function(assert) {
  visit('/gjagiojgioawejpgawgihawpoeghawpeogawehip');
  andThen(function() {
    assert.equal(currentRouteName(), 'discover.index', 'The not-found route did not go back to the index.');
  });
});

test('Using a non-center will default the map to Chicago and send a warning.', function(assert){
  visit('/discover?center=ksdgklasdgasdklghasklg');
  andThen(function(){
    //assert.notEqual($('.message').text(), "", "The page did not issue a warning.");
    assert.notEqual($('#map').find('img[src$="/10/262/380.png"]').length, 0, "The map did not default to Chicago.");
    assert.equal($('#map-center-select select').val(), 'chicago', "The map center selector did not default Chicago.");
  });
});

test('Using an invalid agg option will return to index and issue an error.', function(assert){
  visit('/discover/aggregate?agg=ksdfasdkh&location_geom__within=%7B"type"%3A"Feature"%2C"properties"%3A%7B%7D%2C"geometry"%3A%7B"type"%3A"Polygon"%2C"coordinates"%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
  andThen(function(){
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index.');
    //assert.notEqual($('.message').text(), "", "The page did not issue an error.");
  });
});

test('Attempting to query with startDate after endDate returns to index and issues an error.', function(assert){
  visit('/discover/aggregate?obs_date__ge=2016-06-18&obs_date__le=2016-06-12&location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
  andThen(function(){
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index.');
    //assert.notEqual($('.message').text(), "", true, "The page did not issue an error.");
  });
});

test('Attempting to query with invalid startDate and endDate returns to index and issues an error.', function(assert){
  visit('/discover/aggregate?obs_date__ge=20asdkgasdj8&obs_date__le=2016-06-12&location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
  andThen(function() {
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index. (obs_date__ge)');
    //assert.notEqual($('.message').text(), "", "The page did not issue an error. (obs_date__ge)");
    visit('/discover/aggregate?obs_date__ge=2016-06-18&obs_date__le=201asgasd12&location_geom__within=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
    andThen(function () {
      assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index. (obs_date__le)');
      //assert.notEqual($('.message').text(), "", "The page did not issue an error. (obs_date__le)");
    });
  });
});

test('Attempting to query with invalid JSON returns to index and issues an error.', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3A%22Feature%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
  andThen(function() {
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index. (obs_date__ge)');
    //assert.notEqual($('.message').text(), "", "The page did not issue an error. (obs_date__ge)");
  });
});

test('Attempting to query without a geoJSON returns to index and issues an error.', function(assert){
  visit('/discover/aggregate');
  andThen(function() {
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index. (obs_date__ge)');
    //assert.notEqual($('.message').text(), "", "The page did not issue an error. (obs_date__ge)");
  });
});

/*test('Attempting to access an invalid URI returns to index.', function(assert){
  visit('/discover/aggregate?location_geom__within=%7B%22type%22%3%2ture%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-87.80672550201416%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.97582726102573%5D%2C%5B-87.45653629302979%2C41.74262728637672%5D%2C%5B-87.80672550201416%2C41.74262728637672%5D%5D%5D%7D%7D');
  andThen(function() {
    assert.equal(currentRouteName(), 'discover.index', 'Page did not return to index. (obs_date__ge)');
  });
});*/
