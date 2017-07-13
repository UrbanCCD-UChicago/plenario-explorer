import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | scroll magnet', () => {
  setupComponentTest('scroll-magnet', {
    integration: true,
  });

  it('renders', function () {
    this.render(hbs`{{scroll-magnet}}`);
    expect(this.$()).to.have.length(1);
  });
});
