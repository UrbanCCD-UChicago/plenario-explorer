import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | lt search results', () => {
  setupComponentTest('lt-search-results', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#lt-search-results}}
    //     template content
    //   {{/lt-search-results}}
    // `);

    this.render(hbs`{{lt-search-results}}`);
    expect(this.$()).to.have.length(1);
  });
});
