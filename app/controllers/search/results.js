import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'withinArea'],

  openDataProviderDatasets: Ember.computed.uniq('model.events', 'model.shapes'),

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

});
