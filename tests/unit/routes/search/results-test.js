import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Route | search/results', () => {
  setupTest('route:search/results', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
    needs: ['service:ajax'],
  });

  it('exists', function () {
    const route = this.subject();
    expect(route).to.be.ok;
  });
});
