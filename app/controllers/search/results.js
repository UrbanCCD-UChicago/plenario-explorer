import Ember from 'ember';
import Table from 'ember-light-table';
import _ from 'npm:lodash/fp';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'withinArea'],

  ENV,

  nodeFeaturePseudoDatasets: Ember.computed.alias('model.features'),
  openDataProviderDatasets: Ember.computed.uniq('model.events', 'model.shapes'),

  isExpanded: {},

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
          format: string => _.chain(string).replace(/[_-]/, ' ')
            .startCase()
            .value(),
        },
        {
          label: 'Available Subtypes',
          valuePath: 'properties',
          format: props => props.map(p =>
            (p.common_name ?
              p.common_name.split(':').slice(-1) :
              _.chain(p.name).replace(/[_-]/, ' ')
                .startCase()
                .value()
            )).join(', '),
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
    toggleCollapse(targetId) {
      this.toggleProperty(`isExpanded.${_.camelCase(targetId)}`);
    },
  },

});
