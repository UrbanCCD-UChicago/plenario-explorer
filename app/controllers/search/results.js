import Ember from 'ember';
import _ from 'npm:lodash/fp';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'aggregateBy', 'withinArea'],

  ENV,

  nodeFeaturePseudoDatasets: Ember.computed('model.features', function () {
    const features = this.get('model.features');
    const allowedFeatures = _.keys(ENV.nodeFeatures);
    return features.filter(feature => allowedFeatures.includes(feature.name));
  }),

  openDataProviderDatasets: Ember.computed.uniq('model.events', 'model.shapes'),

  displayNodeFeatureTable: Ember.computed.and(
    'nodeFeaturePseudoDatasets.length',
    'ENV.enableSensorNetworkInUI'
  ),
  displayOpenDataTable: Ember.computed.alias('openDataProviderDatasets.length'),

  tableSelectedDatasets: {},
  isExpanded: {},

  nodeFeatureTableColumns: [
    {
      cellComponent: 'lt-cell-checkbox',
      sortable: false,
      width: '2em',
      align: 'center',
    },
    {
      label: 'Data Type',
      valuePath: 'humanName',
    },
    {
      label: 'Available Subtypes',
      valuePath: 'properties',
      format: props => props.map(p => p.common_name.split(':').slice(-1)).join(', '),
      sortable: false,
    },
  ],
  openDataTableColumns: [
    {
      cellComponent: 'lt-cell-checkbox',
      sortable: false,
      width: '2em',
      align: 'center',
    },
    {
      label: 'Dataset Name',
      valuePath: 'humanName',
    },
    {
      label: 'Source',
      valuePath: 'provider',
    },
  ],

  userHasMadeASelection: Ember.computed('tableSelectedDatasets', function () {
    return _.values(this.get('tableSelectedDatasets')).some(dsList => dsList.length > 0);
  }),

  actions: {
    toggleCollapse(targetId) {
      this.toggleProperty(`isExpanded.${_.camelCase(targetId)}`);
    },
    userDidChangeSelection(tableElementId, selectedRows) {
      // TODO: use Lodash for this
      const selectedDatasets = selectedRows.map(row =>
        (row.content.dataset_name ? row.content.dataset_name : row.content.name)
      );
      Ember.set(this.get('tableSelectedDatasets'), tableElementId, selectedDatasets);
      // Because Ember observers don't directly observe all property changes on a dependent object,
      // we have to notify observers manually
      this.notifyPropertyChange('tableSelectedDatasets');
    },
    compareSelectedDatasets() {
      const selectedDatasets = _.chain(this.get('tableSelectedDatasets'))
        .values()
        .flatten()
        .value();
      this.transitionToRoute(
        'compare',
        selectedDatasets.join(','),
        { queryParams: this.getProperties(this.get('queryParameters')) }
      );
    },
  },

});
