import Ember from 'ember';
import Table from 'ember-light-table';
import _ from 'npm:lodash';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'withinArea'],

  nodeFeaturePseudoDatasets: Ember.computed.alias('model.features'),
  openDataProviderDatasets: Ember.computed.uniq('model.events', 'model.shapes'),

  sensorDataTable: Ember.computed('nodeFeaturePseudoDatasets', function () {
    return new Table(
      [
        {
          cellComponent: 'lt-cell-checkbox',
          width: '2em',
          align: 'center',
        },
        {
          label: 'Data Type',
          valuePath: 'name',
          format: this.humanize,
        },
        {
          label: 'Properties',
          valuePath: 'properties',
          format: this.formatFeatureProperties,
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
          width: '2em',
          align: 'center',
        },
        {
          label: 'Source',
          valuePath: 'attribution',
        },
        {
          label: 'Dataset Name',
          valuePath: 'human_name',
        },
      ],
      this.get('openDataProviderDatasets')
    );
  }),

  humanize(string) {
    return _.startCase(_.replace(string, /_/, ' '));
  },

  formatFeatureProperties(properties) {
    return properties.map(prop => (
      prop.common_name ? _.split(prop.common_name, ':').slice(-1) : prop.name
    )).join(', ');
  },


});
