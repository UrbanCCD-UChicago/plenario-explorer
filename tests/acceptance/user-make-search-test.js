import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'plenario-explorer/tests/helpers/start-app';
import destroyApp from 'plenario-explorer/tests/helpers/destroy-app';

describe('Acceptance | user make search', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  it('is accessible at /search', () => {
    visit('/search');

    andThen(() => {
      expect(currentURL()).to.equal('/search');
    });
  });

  it('is accessible via redirect from /', () => {
    visit('/');

    andThen(() => {
      expect(currentURL()).to.equal('/search');
    });
  });

  it('displays search widget', () => {
    visit('/search');

    andThen(() => {
      expect(find('#search-widget')).to.have.lengthOf(1);
    });
  });

  it('makes correct search query when [search] is clicked', () => {
    visit('/search');

    fillIn('select#teleport-control', '30.0986648,-97.938383,30.516863,-97.561489');
    click('.leaflet-control-zoom-out');
    click('.leaflet-control-zoom-out');

    fillIn('input#search-start-date', '1984-04-01');
    fillIn('input#search-end-date', '2017-05-10');
    fillIn('select#search-aggregate-by', 'quarter');

    click('button#search-submit-button');

    andThen(() => {
      // NOTE: this test might fail inconsistently if different test clients assign different sizes
      // to the Leaflet map container, skewing its reported bounds. If that starts happening we
      // will need to come up with a more invloved check (by geometry center, probably)
      // FIXME: it started happening. We need a better way to check validity of map bounds
      expect(currentURL()).to.contain('startDate=1984-04-01')
        .and.to.contain('endDate=2017-05-10')
        .and.to.contain('aggregateBy=quarter');
      // eslint-disable-next-line max-len
      // .and.to.contain('withinArea=%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-98.09692382812501%2C30.007273923504556%5D%2C%5B-97.40203857421875%2C30.007273923504556%5D%2C%5B-97.40203857421875%2C30.6071859028226%5D%2C%5B-98.09692382812501%2C30.6071859028226%5D%2C%5B-98.09692382812501%2C30.007273923504556%5D%5D%5D%7D%7D');
    });
  });

  it('resets search widget to default values when [reset] is clicked', () => {
    let originalValues;

    visit('/search');
    andThen(() => {
      originalValues = {
        startDate: find('input#search-start-date').val(),
        endDate: find('input#search-end-date').val(),
        aggregateBy: find('select#search-aggregate-by').val(),
      };
    });

    fillIn('select#teleport-control', '30.0986648,-97.938383,30.516863,-97.561489');
    click('.leaflet-control-zoom-out');
    click('.leaflet-control-zoom-out');

    fillIn('input#search-start-date', '1984-04-01');
    fillIn('input#search-end-date', '2017-05-10');
    fillIn('select#search-aggregate-by', 'quarter');

    click('button#search-reset-button');
    click('button#search-submit-button');

    andThen(() => {
      // FIXME: not checking map location because Ember isn't aware of Leaflet's async behavior
      expect(currentURL()).to.contain(`startDate=${originalValues.startDate}`)
        .and.to.contain(`endDate=${originalValues.endDate}`)
        .and.to.contain(`aggregateBy=${originalValues.aggregateBy}`);
      // eslint-disable-next-line max-len
      // .and.to.contain('withinArea=%7B"type"%3A"Feature"%2C"properties"%3A%7B%7D%2C"geometry"%3A%7B"type"%3A"Polygon"%2C"coordinates"%3A%5B%5B%5B-88.08151245117189%2C41.57333394552688%5D%2C%5B-87.38388061523439%2C41.57333394552688%5D%2C%5B-87.38388061523439%2C42.09312731992276%5D%2C%5B-88.08151245117189%2C42.09312731992276%5D%2C%5B-88.08151245117189%2C41.57333394552688%5D%5D%5D%7D%7D');
    });
  });
});
