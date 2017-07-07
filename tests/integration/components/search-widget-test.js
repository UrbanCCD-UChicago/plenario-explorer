import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | search widget', () => {
  setupComponentTest('search-widget', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#search-widget}}
    //     template content
    //   {{/search-widget}}
    // `);

    this.render(hbs`{{search-widget}}`);
    expect(this.$()).to.have.length(1);
  });
});
