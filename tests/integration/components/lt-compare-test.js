import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | lt compare', function () {
  setupComponentTest('lt-compare', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#lt-compare}}
    //     template content
    //   {{/lt-compare}}
    // `);

    this.render(hbs`{{lt-compare}}`);
    expect(this.$()).to.have.length(1);
  });
});
