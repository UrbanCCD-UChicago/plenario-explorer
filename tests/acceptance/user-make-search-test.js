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

  it('is accessible at /search');

  it('is accessible via redirect from /');

  it('displays search widget');

  it('makes correct search query when [search] is clicked');

  it('resets search widget to default values when [reset] is clicked');
});
