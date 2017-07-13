import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | loading spinner', () => {
  setupComponentTest('loading-spinner', {
    integration: true,
  });

  it('renders', function () {
    this.render(hbs`{{loading-spinner}}`);
    expect(this.$()).to.have.length(1);
  });
});
