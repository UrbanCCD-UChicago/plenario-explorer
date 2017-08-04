import Ember from 'ember';
import _ from 'npm:lodash';
import BreakoutPageAbstractController from './breakout-base';

export default BreakoutPageAbstractController.extend({

  plottedDatasets: Ember.computed('model.primaryDataset', function () {
    const pds = this.get('model.primaryDataset');
    return (pds.aggregatedEvents && pds.aggregatedEvents.length) ? [pds] : undefined;
  }),

  mappedDatasets: Ember.computed('model.primaryDataset', function () {
    const pds = this.get('model.primaryDataset');
    return (pds.geoJSON && pds.geoJSON.features.length) ? [pds] : undefined;
  }),

  isEventDataset: Ember.computed.equal('model.primaryDataset.type', 'event'),
  isShapeDataset: Ember.computed.equal('model.primaryDataset.type', 'shape'),

  mapGeoJSONPointToLayer: (geoJsonPoint, latlng) => {
    const colorIndex = _.get(geoJsonPoint, 'properties.colorIndex');
    return L.circleMarker(latlng, { radius: 4, className: `point dataset-color-${colorIndex}` });
  },

  chartOptions: {
    chart: {
      spacing: [5, 5, 10, 0],
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

});
