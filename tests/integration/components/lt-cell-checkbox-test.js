import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | lt cell checkbox', () => {
  setupComponentTest('lt-cell-checkbox', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#lt-cell-checkbox}}
    //     template content
    //   {{/lt-cell-checkbox}}
    // `);

    this.render(hbs`{{lt-cell-checkbox}}`);
    expect(this.$()).to.have.length(1);
  });
});
