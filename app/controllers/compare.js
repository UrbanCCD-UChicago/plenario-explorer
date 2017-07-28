import Ember from 'ember';
import _ from 'npm:lodash';
import BreakoutPageAbstractController from './breakout-base';

export default BreakoutPageAbstractController.extend({

  selectedDatasets: [],

  plottedDatasets: Ember.computed('temporalDatasets', 'selectedDatasets', function () {
    const selectedDatasets = this.get('selectedDatasets');
    const temporalDatasets = this.get('temporalDatasets');
    return _.intersectionBy(temporalDatasets, selectedDatasets, 'name');
  }),

  mappedDatasets: Ember.computed('spatialDatasets', 'selectedDatasets', function () {
    const selectedDatasets = this.get('selectedDatasets');
    const spatialDatasets = this.get('spatialDatasets');
    return _.intersectionBy(spatialDatasets, selectedDatasets, 'name');
  }),

  chartOptions: {
    chart: {
      height: '75%',
      spacing: [5, 5, 1, 0],
      zoomType: 'x',
    },
    legend: {
      enabled: false,
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{point.y}',
      split: true,
    },
    type: 'line',
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: null,
      },
    },
  },

  tableColumns: [
    {
      cellComponent: 'lt-cell-toggle',
      sortable: false,
      width: '2em',
      align: 'center',
    },
    {
      label: 'Data Type',
      valuePath: 'humanName',
    },
  ],

  actions: {
    userDidChangeSelection(selectedRows) {
      // TODO: use Lodash for this
      const selectedDatasets = selectedRows.map(row => row.content);
      this.set('selectedDatasets', selectedDatasets);
    },
  },

});
