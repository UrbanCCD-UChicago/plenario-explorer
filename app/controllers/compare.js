import Ember from 'ember';
import _ from 'npm:lodash';
import truncate from 'npm:@turf/truncate';
import BreakoutPageAbstractController from './breakout-base';

export default BreakoutPageAbstractController.extend({

  selectedDatasets: [],

  plottedDatasets: Ember.computed('temporalDatasets', 'selectedDatasets', function () {
    const selectedDatasets = this.get('selectedDatasets');
    const temporalDatasets = this.get('temporalDatasets');
    return _.intersectionBy(temporalDatasets, selectedDatasets, 'name');
  }),

  mappedDatasets: Ember.computed('shapeDatasets', 'selectedDatasets', 'combinedMapGrid',
    function () {
      const selectedDatasets = this.get('selectedDatasets');
      const shapeDatasets = this.get('shapeDatasets');
      const combinedMapGrid = this.get('combinedMapGrid');

      const mappedDatasets = _.intersectionBy(shapeDatasets, selectedDatasets, 'name');
      if (combinedMapGrid) {
        mappedDatasets.push(combinedMapGrid);
      }

      return mappedDatasets;
    }
  ),

  combinedMapGrid: Ember.computed('mappedDatasets', function () {
    const selectedDatasets = this.get('selectedDatasets');
    const gridDatasets = this.get('gridDatasets');

    const features = _.chain(gridDatasets)
      .intersectionBy(selectedDatasets, 'name')
      .map(dataset =>
        _.map(dataset.geoJSON.features, feature => ({
          properties: {
            datasetName: dataset.name,
            datasetHumanName: dataset.humanName,
            count: feature.properties.count,
          },
          geometry: feature.geometry,
          type: 'Feature',
        }))
      )
      .flatten()
      .groupBy(feature => truncate(feature, 4).geometry.coordinates)
      .mapValues(group =>
        _.reduce(group, (acc, value) => {
          acc.properties.data.push(value.properties);
          acc.geometry = acc.geometry || value.geometry;
          acc.type = acc.type || value.type;
          return acc;
        }, { properties: { data: [] } })
      )
      .values()
      .value();

    if (features.length === 0) {
      return undefined;
    }

    return { isCombinedGrid: true, geoJSON: { type: 'FeatureCollection', features } };
  }),

  // This is necessary to stop the Leaflet map from "breaking" when it's resized. We just
  // trick it into thinking the window has changed size and let Leaflet figure the rest out itself.
  mappedDatasetsDidChange: Ember.observer('mappedDatasets', () => {
    Ember.run.later(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }),

  mapGeoJSONPointToLayer: (geoJsonPoint, latlng) => {
    const colorIndex = _.get(geoJsonPoint, 'properties.colorIndex');
    return L.circleMarker(latlng, { radius: 4, className: `point dataset-color-${colorIndex}` });
  },

  chartOptions: {
    chart: {
      spacing: [5, 5, 1, 5],
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
      label: 'Dataset Name',
      valuePath: 'humanName',
    },
    {
      label: 'Source',
      valuePath: 'provider',
    },
  ],

  actions: {
    userDidChangeSelection(selectedRows) {
      const selectedDatasets = _.map(selectedRows, row => row.content);
      this.set('selectedDatasets', selectedDatasets);
    },
  },

});
