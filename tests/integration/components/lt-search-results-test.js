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

    this.set('people', [
      { fName: 'John', lName: 'Glenn' },
      { fName: 'Neil', lName: 'Armstrong' },
    ]);

    this.set('columns', [
      { label: 'First Name', valuePath: 'fName' },
      { label: 'Last Name', valuePath: 'lName' },
    ]);

    this.set('height', '100px');

    this.render(hbs`{{lt-search-results people columns=cols height=height}}`);
    expect(this.$()).to.have.length(1);
  });
});
