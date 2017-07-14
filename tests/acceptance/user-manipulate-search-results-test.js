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

  it('redirects to /search if accessed directly by URL with no query parameters');

  it('displays results of fruitful search query');

  it('gracefully handles results with no sensor datasets');

  it('gracefully handles results with no open data provider datasets');

  it('provides feedback if there are no results of any kind');

  it("transitions to correct /compare page for user's selected results when [compare] is clicked");
});
