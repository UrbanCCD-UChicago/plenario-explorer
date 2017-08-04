import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | search params breadcrumbs', function () {
  setupComponentTest('search-params-breadcrumbs', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#search-params-breadcrumbs}}
    //     template content
    //   {{/search-params-breadcrumbs}}
    // `);

    this.render(hbs`{{search-params-breadcrumbs}}`);
    expect(this.$()).to.have.length(1);
  });
});
