import Ember from 'ember';
import Table from 'ember-light-table';
import _ from 'npm:lodash';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'withinArea'],

  filterNodeFeaturePseudoDatasetsBy: '',
  sortNodeFeaturePseudoDatasetsBy: ['name'],
  sortNodeFeaturePseudoDatasetsDir: 'asc',
  filterOpenDataProviderDatasetsBy: '',
  sortOpenDataProviderDatasetsBy: ['attribution', 'human_name'],
  sortOpenDataProviderDatasetsDir: 'asc',

  nodeFeaturePseudoDatasets: Ember.computed.alias('model.features'),
  openDataProviderDatasets: Ember.computed.uniq('model.events', 'model.shapes'),

  nodeFeaturePseudoDatasetFilterChanged: Ember.observer(
    'filterNodeFeaturePseudoDatasetsBy',
    function () {
      Ember.run.once(this, 'filterNodeFeatureTableRows');
    }
  ),
  openDataProviderDatasetFilterChanged: Ember.observer(
    'filterOpenDataProviderDatasetsBy',
    function () {
      Ember.run.once(this, 'filterOpenDataProviderTableRows');
    }
  ),

  nodeFeaturePseudoDatasetSortChanged: Ember.observer(
    'sortNodeFeaturePseudoDatasetsBy',
    'sortNodeFeaturePseudoDatasetsDir',
    function () {
      Ember.run.once(this, 'sortNodeFeatureTableRows');
    }
  ),

  openDataProviderDatasetSortChanged: Ember.observer(
    'sortOpenDataProviderDatasetsBy',
    'sortOpenDataProviderDatasetsDir',
    function () {
      Ember.run.once(this, 'sortOpenDataProviderTableRows');
    }
  ),

  nodeFeatureDataTable: Ember.computed('nodeFeaturePseudoDatasets', function () {
    return new Table(
      [
        {
          cellComponent: 'lt-cell-checkbox',
          sortable: false,
          width: '2em',
          align: 'center',
        },
        {
          label: 'Data Type',
          valuePath: 'name',
          format: this.humanize,
        },
        {
          label: 'Available Subtypes',
          valuePath: 'properties',
          format: this.formatFeatureProperties,
          sortable: false,
        },
      ],
      this.get('nodeFeaturePseudoDatasets')
    );
  }),

  openDataTable: Ember.computed('openDataProviderDatasets', function () {
    return new Table(
      [
        {
          cellComponent: 'lt-cell-checkbox',
          sortable: false,
          width: '2em',
          align: 'center',
        },
        {
          label: 'Dataset Name',
          valuePath: 'human_name',
        },
        {
          label: 'Source',
          valuePath: 'attribution',
        },
      ],
      this.get('openDataProviderDatasets')
    );
  }),

  userHasMadeASelection: Ember.computed.or(
    'nodeFeatureDataTable.selectedRows.length',
    'openDataTable.selectedRows.length'
  ),

  actions: {
    userClickOnNodeFeatureTableColumn(column) {
      if (column.sortable) {
        this.setProperties({
          sortNodeFeaturePseudoDatasetsBy: column.valuePath,
          sortNodeFeaturePseudoDatasetsDir: column.ascending ? 'asc' : 'desc',
        });
      }
    },
    userClickOnOpenDataProviderTableColumn(column) {
      if (column.sortable) {
        this.setProperties({
          sortOpenDataProviderDatasetsBy: column.valuePath,
          sortOpenDataProviderDatasetsDir: column.ascending ? 'asc' : 'desc',
        });
      }
    },
  },

  humanize(string) {
    return _.startCase(_.replace(string, /_/, ' '));
  },

  formatFeatureProperties(properties) {
    return properties.map(prop => (
      prop.common_name ? _.split(prop.common_name, ':').slice(-1) : prop.name
    )).join(', ');
  },

  filterNodeFeatureTableRows() {
    const searchString = this.get('filterNodeFeaturePseudoDatasetsBy').toLowerCase();
    this.get('nodeFeatureDataTable').rows.forEach((row) => {
      if (searchString === '') {
        Ember.set(row, 'hidden', false); // Unhide everything if there's no filter active
        return;
      }
      const pdName = this.humanize(row.content.name).toLowerCase();
      const pdProps = this.formatFeatureProperties(row.content.properties).toLowerCase();
      if (pdName.includes(searchString) || pdProps.includes(searchString)) {
        Ember.set(row, 'hidden', false);
      } else {
        Ember.set(row, 'hidden', true);
      }
    });
  },

  filterOpenDataProviderTableRows() {
    const searchString = this.get('filterOpenDataProviderDatasetsBy').toLowerCase();
    this.get('openDataTable').rows.forEach((row) => {
      if (searchString === '') {
        Ember.set(row, 'hidden', false); // Unhide everything if there's no filter active
      }
      const dsName = row.content.human_name.toLowerCase();
      const dsSource = row.content.attribution.toLowerCase();
      if (dsName.includes(searchString) || dsSource.includes(searchString)) {
        Ember.set(row, 'hidden', false);
      } else {
        Ember.set(row, 'hidden', true);
      }
    });
  },

  sortNodeFeatureTableRows() {
    const sortBy = this.get('sortNodeFeaturePseudoDatasetsBy');
    const descending = this.get('sortNodeFeaturePseudoDatasetsDir') === 'desc';
    const sorted = this.get('nodeFeatureDataTable.rows').sortBy(sortBy);
    if (descending) {
      sorted.reverse();
    }
    this.set('nodeFeatureDataTable.rows', sorted);
  },

  sortOpenDataProviderTableRows() {
    const sortBy = this.get('sortOpenDataProviderDatasetsBy');
    const descending = this.get('sortOpenDataProviderDatasetsDir') === 'desc';
    const sorted = this.get('openDataTable.rows').sortBy(sortBy);
    if (descending) {
      sorted.reverse();
    }
    this.set('openDataTable.rows', sorted);
  }


});
