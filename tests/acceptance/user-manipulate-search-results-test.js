import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'plenario-explorer/tests/helpers/start-app';
import destroyApp from 'plenario-explorer/tests/helpers/destroy-app';

describe('Acceptance | user manipulate search results', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  it('redirects to /search if accessed directly by URL with no query parameters', () => {
    visit('/search/results');

    andThen(() => {
      expect(currentURL()).to.equal('/search');
    });
  });

  it('displays results of fruitful search query', function () {
    server.createList('event', 1);
    server.createList('meta-shape', 1);
    server.loadFixtures('features');

    visit('/search/results?aggregateBy=day');

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(2);
      expect(find('.ember-light-table').toArray().map(e => $(e).children().length).every(l => l > 0));
    });
  });

  it('gracefully handles results that include no sensor datasets', function () {
    server.createList('event', 1);
    server.createList('meta-shape', 1);
    // Don't load any features, to simulate not finding any with the search

    visit('/search/results?aggregateBy=day'); // Dummy search query

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(1);
    });
  });

  it.skip('gracefully handles results that include no open data provider datasets', function () {
    // Don't load any event or shape metadata, to simulate not finding any with the search
    server.loadFixtures('features');

    visit('/search/results?aggregateBy=day'); // Dummy search query

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(1);
    });
  });

  it('provides feedback if there are no results of any kind', function () {
    // Don't load anything

    visit('/search/results?aggregateBy=day'); // Dummy search query

    andThen(() => {
      expect(find('#results-tables-container').children()).to.have.length.of.at.least(1);
    });
  });

  it('with multiple rows selected, transitions to correct /compare page when [compare] is clicked',
    function () {
      // server.createList('event', 2);
      server.createList('meta-shape', 5);
      // server.createList('timeseries', 2);
      // server.createList('grid', 2);
      server.loadFixtures('shapes');

      visit('/search/results?aggregateBy=day');

      click('thead.lt-head:eq(0) th:eq(1)');
      click('tbody.lt-body:eq(0) tr:eq(0)');
      click('tbody.lt-body:eq(0) tr:eq(1)');
      click('#compare-submit-button');

      andThen(() => {
        expect(currentURL()).to.equal('/compare/test_shape_dataset_0,test_shape_dataset_1?aggregateBy=day');
      });
    });

  it('with one row selected, transitions to correct /view when [compare] is clicked',
    function () {
      // Just load a single entry
      // server.createList('event', 1);
      // server.createList('timeseries', 1);
      // server.createList('grid', 1);
      server.createList('meta-shape', 5);
      server.loadFixtures('shapes');

      visit('/search/results?aggregateBy=day'); // Dummy search query

      click('tbody.lt-body:eq(0) tr:eq(0)');
      click('#compare-submit-button');

      andThen(() => {
        expect(currentURL()).to.equal('/view/test_shape_dataset_0?aggregateBy=day');
      });
    });
});
