import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | download menu', function () {
  setupComponentTest('download-menu', {
    integration: true,
  });

  it('renders', function () {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#download-menu}}
    //     template content
    //   {{/download-menu}}
    // `);

    this.render(hbs`{{download-menu}}`);
    expect(this.$()).to.have.length(1);
  });
});
