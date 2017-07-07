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

  it('matches row selection status', function () {
    this.set('row', { selected: false });
    this.render(hbs`{{lt-cell-checkbox row=row}}`);
    expect(this.$().find('.fa-square-o')).to.have.length(1);

    this.set('row', { selected: true });
    this.render(hbs`{{lt-cell-checkbox row=row}}`);
    expect(this.$().find('.fa-check-square')).to.have.length(1);
  });
});
