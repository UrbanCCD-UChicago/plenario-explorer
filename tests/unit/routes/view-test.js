import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | view', function () {
  setupTest('route:view', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:plenario-api'],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
