import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | lt search results', () => {
  setupComponentTest('lt-search-results', {
    integration: true,
  });

  const people = [
    { fName: 'John', lName: 'Glenn' },
    { fName: 'Neil', lName: 'Armstrong' },
  ];
  const columns = [
    { label: 'First Name', valuePath: 'fName' },
    { label: 'Last Name', valuePath: 'lName' },
  ];
  const defaultHeight = '100px';

  it('displays results', function () {
    this.set('people', people);
    this.set('columns', columns);
    this.set('height', defaultHeight);

    this.render(hbs`{{lt-search-results people columns=columns height=height}}`);

    expect(this.$('tbody.lt-body tr')).to.have.lengthOf(people.length);
    console.log(this.$('tbody.lt-body tr'));
    this.$('tbody.lt-body tr').toArray().forEach((tr) => {
      expect($(tr).children('td')).to.have.lengthOf(columns.length);
    });
  });

  it.skip('tracks row selection');
  it.skip('filters displayed results based on text input');
  it.skip('preserved selected rows across filter updates');
  it.skip('sorts displayed rows by the selected column');
});
