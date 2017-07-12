import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'npm:moment';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

describe('Integration | Component | lt search results', () => {
  setupComponentTest('lt-search-results', {
    integration: true,
  });

  const people = [
    {
      name: 'Neil Armstrong',
      born: 'August 5, 1930',
      died: 'August 25, 2012',
      mission: 'Apollo 11',
      evaDate: 'July 21, 1969',
    },
    {
      name: 'Buzz Aldrin',
      born: 'January 20, 1930',
      died: null,
      mission: 'Apollo 11',
      evaDate: 'July 21, 1969',
    },
  ];
  const columns = [
    { label: 'Name', valuePath: 'name' },
    { label: 'Date of Birth', valuePath: 'born' },
    { label: 'Date of Death', valuePath: 'died', format: val => (val === null ? '' : val) },
    { label: 'EVA Date', valuePath: 'evaDate' },
  ];
  const defaultHeight = '100px';

  it('displays results', function () {
    this.set('people', people);
    this.set('columns', columns);
    this.set('height', defaultHeight);

    this.render(hbs`{{lt-search-results people columns=columns height=height}}`);

    expect(this.$('tbody.lt-body tr')).to.have.lengthOf(people.length);
    this.$('tbody.lt-body tr').toArray().forEach((tr) => {
      expect($(tr).children('td')).to.have.lengthOf(columns.length);
    });
  });

  it('tracks row selection', function () {
    this.set('people', people);
    this.set('columns', columns);
    this.set('height', defaultHeight);

    this.render(hbs`{{lt-search-results people columns=columns height=height}}`);
    expect(this.$().text()).to.include(`0\u2009/\u2009${people.length} selected`);

    this.$('tbody.lt-body tr').first().click();
    wait().then(function () {
      expect(this.$().text()).to.include(`1\u2009/\u2009${people.length} selected`);
    }.bind(this));
  });

  it.skip('filters displayed results based on text input');

  it.skip('preserved selected rows across filter updates');

  it.skip('sorts displayed rows by the selected column');

});
