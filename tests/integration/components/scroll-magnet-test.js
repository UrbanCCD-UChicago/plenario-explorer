import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | scroll magnet', () => {
  setupComponentTest('scroll-magnet', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#scroll-magnet}}
    //     template content
    //   {{/scroll-magnet}}
    // `);

    this.render(hbs`{{scroll-magnet}}`);
    expect(this.$()).to.have.length(1);
  });
});
