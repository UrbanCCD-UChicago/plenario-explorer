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
    visit('/search/results?aggregateBy=day&endDate=2017-07-14&startDate=2017-04-15&withinArea=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-88.08151245117189%2C41.57333394552688%5D%2C%5B-87.38388061523439%2C41.57333394552688%5D%2C%5B-87.38388061523439%2C42.09312731992276%5D%2C%5B-88.08151245117189%2C42.09312731992276%5D%2C%5B-88.08151245117189%2C41.57333394552688%5D%5D%5D%7D%7D');

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(2);
      expect(find('.ember-light-table').toArray().map(e => $(e).children().length).every(l => l > 0));
    });
  });

  it('gracefully handles results that include no sensor datasets', function () {
    visit('/search/results?aggregateBy=day&endDate=2017-07-14&startDate=2017-04-15&withinArea=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-113.84170532226562%2C53.34809202306839%5D%2C%5B-113.14407348632814%2C53.34809202306839%5D%2C%5B-113.14407348632814%2C53.76251363638676%5D%2C%5B-113.84170532226562%2C53.76251363638676%5D%2C%5B-113.84170532226562%2C53.34809202306839%5D%5D%5D%7D%7D');

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(1);
    });
  });

  it.skip('gracefully handles results that include no open data provider datasets', function () {
    // TODO: if we ever have a sensor somewhere we don't have a dataset, update withinArea
    visit('/search/results?aggregateBy=day&endDate=2017-07-14&startDate=2017-04-15&withinArea=');

    andThen(() => {
      expect(find('.ember-light-table')).to.have.lengthOf(1);
    });
  });

  it('provides feedback if there are no results of any kind', function () {
    visit('/search/results?aggregateBy=day&endDate=2017-07-14&startDate=2017-04-15&withinArea=%7B"type"%3A"Feature"%2C"properties"%3A%7B%7D%2C"geometry"%3A%7B"type"%3A"Polygon"%2C"coordinates"%3A%5B%5B%5B-220.4296875%2C-70.37785394109224%5D%2C%5B-220.4296875%2C-68.65655498475736%5D%2C%5B-214.80468750000003%2C-68.65655498475736%5D%2C%5B-214.80468750000003%2C-70.37785394109224%5D%2C%5B-220.4296875%2C-70.37785394109224%5D%5D%5D%7D%7D');

    andThen(() => {
      expect(find('#results-tables-container').children()).to.have.length.of.at.least(1);
    });
  });

  it("transitions to correct /compare page for user's selected results when [compare] is clicked");
});
