import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'plenario-explorer/tests/helpers/start-app';
import destroyApp from 'plenario-explorer/tests/helpers/destroy-app';

describe('Acceptance | user compare datasets', function () {
  let application;

  beforeEach(function () {
    application = startApp();
  });

  afterEach(function () {
    destroyApp(application);
  });

  it('redirects to /search if accessed directly via URL with no specified datasets');

  it('redirects to /view/:dataset_id if accessed with exactly 1 specified dataset');

  it('has working [back] button to search results if accessed via transition from /search/results');

  it("has working [re-run search] button if accessed directly via URL with 'searchQuery' parameter");

  it('has working [new search] button if accessed directly via URL with no associated search');

  it('displays visualization panes (graph and map) with up to 5 datasets already displayed');

  it('lists all available datasets from list specified in query parameters');

  it('prefers live sensor datasets to open data provider datasets when choosing initial 5 to show');
});
