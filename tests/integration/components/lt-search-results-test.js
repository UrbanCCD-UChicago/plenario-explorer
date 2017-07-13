import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import _ from 'npm:lodash/fp';

describe('Integration | Component | lt search results', () => {
  setupComponentTest('lt-search-results', {
    integration: true,
  });

  const people = [
    { id: 1, first_name: 'Paulo', last_name: 'Plail', email: null, gender: 'Male' },
    { id: 2, first_name: 'Nathaniel', last_name: 'Stoodale', email: 'nstoodale1@sakura.ne.jp', gender: 'Male' },
    { id: 3, first_name: 'Ianthe', last_name: 'Dillimore', email: null, gender: 'Female' },
    { id: 4, first_name: 'Karlene', last_name: 'Anscombe', email: 'kanscombe3@wikispaces.com', gender: 'Female' },
    { id: 5, first_name: 'Anthony', last_name: 'Holhouse', email: 'aholhouse4@toplist.cz', gender: 'Male' },
    { id: 6, first_name: 'Else', last_name: 'Sollett', email: null, gender: 'Other' },
    { id: 7, first_name: 'Fax', last_name: 'Creffield', email: null, gender: 'Male' },
    { id: 8, first_name: 'Philis', last_name: 'Sudran', email: 'psudran7@hhs.gov', gender: 'Prefer not to say' },
    { id: 9, first_name: 'Samara', last_name: 'Beckley', email: 'sbeckley8@nba.com', gender: 'Female' },
    { id: 10, first_name: 'Tildi', last_name: 'Kinnerley', email: null, gender: 'Female' },
  ];
  const columns = [
    { label: 'First Name', valuePath: 'first_name' },
    { label: 'Last Name', valuePath: 'last_name' },
    { label: 'Email', valuePath: 'email', format: s => (s === null ? '' : s) },
    { label: 'Gender', valuePath: 'gender' },
  ];
  const defaultHeight = '100px';

  before(function () {
    expect(people, 'some tests require a minimum number of rows to be meaningful')
      .to.have.length.of.at.least(4);
  });

  beforeEach(function () {
    this.set('people', people);
    this.set('columns', columns);
    this.set('height', defaultHeight);
    this.render(hbs`{{lt-search-results people columns=columns height=height}}`);
  });

  it('displays results', function () {
    // Just check that the table has the correct number of rows and columns
    const rows = this.$('tbody.lt-body tr');
    expect(rows).to.have.lengthOf(people.length);
    rows.toArray().forEach((tr) => {
      expect($(tr).children('td')).to.have.lengthOf(columns.length);
    });
  });

  describe('row selection', function () {
    it('tracks row selection', function () {
      // We should have 0 rows selected by default
      expect(this.$().text()).to.include(`0\u2009/\u2009${people.length} selected`);

      // Pick half of the rows at random to focus on
      const rows = this.$('tbody.lt-body tr');
      const sampleSize = Math.trunc(rows.length / 2);
      const targetRows = _.sampleSize(sampleSize)(rows.toArray());

      // Select them all
      targetRows.forEach(row => row.click());

      // Now deselct one, to check that deselection also works
      targetRows[0].click();

      // Check resulting selection size is correct
      return wait().then(function () {
        expect(this.$().text())
          .to.include(`${sampleSize - 1}\u2009/\u2009${rows.length} selected`);
      }.bind(this));
    });

    it('preserves selected rows across filter updates', function () {
      // Select the first half of the rows
      const rows = this.$('tbody.lt-body tr');
      const targetRows = _.take(Math.trunc(rows.length / 2))(rows.toArray());
      targetRows.forEach(row => row.click());

      // Filter by a known unique value
      this.$('input').val('Anscombe').change();

      // Ensure the table still reports the same number of selected rows
      return wait().then(function () {
        expect(this.$().text())
          .to.include(`${targetRows.length}\u2009/\u2009${rows.length} selected`);
      }.bind(this));
    });
  });

  it('filters displayed rows based on text input', function () {
    // Sorry that this is filtering people by gender =(
    const filteredPeople = people.filter(person => person.gender === 'Female');

    this.$('input').val('Female').change();

    return wait().then(function () {
      expect(this.$('tbody.lt-body tr')).to.have.lengthOf(filteredPeople.length);
    }.bind(this));
  });

  it('when a column header is clicked, sorts displayed rows in ascending order by that column',
    function () {
      const sortColIndex = _.random(0, columns.length - 1);
      const sortCol = columns[sortColIndex];

      const getDisplayVal = (typeof sortCol.format === 'function') ?
        p => sortCol.format(p[sortCol.valuePath]) : p => p[sortCol.valuePath];

      const sortedPeople = _.sortBy([p => p[sortCol.valuePath] || ''])(people);

      const columnHeaders = this.$('thead.lt-head tr').first().children('th');
      columnHeaders[sortColIndex].click();

      return wait().then(function () {
        this.$('tbody.lt-body tr').toArray()
          .forEach((row, index) => {
            const actualCellValue = $(row).children(`td:eq(${sortColIndex})`).text().trim() || '';
            const expectedCellValue = getDisplayVal(sortedPeople[index]);
            expect(actualCellValue)
              .to.equal(expectedCellValue);
          });
      }.bind(this));
    });

  it.skip('toggles row sort order (ascending/descending) when a sorted column header is clicked');
});
