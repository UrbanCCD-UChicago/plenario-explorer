import Ember from 'ember';
import moment from 'npm:moment';
import BreakoutPageAbstractController from './breakout-base';

export default BreakoutPageAbstractController.extend({

  mapBounds: Ember.computed('model', function () {
    const allGrids = L.featureGroup();
    this.get('model.grids').forEach((grid) => {
      allGrids.addLayer(L.geoJSON(grid));
    });
    return allGrids.getBounds();
  }),

  chartData: Ember.computed('model', function () {
    const timeseriesData = this.get('model.timeseries');

    return timeseriesData.map(timeseries => ({
      name: timeseries.human_name,
      data: timeseries.items
        .map(item => ({ x: moment(item.datetime).valueOf(), y: item.count })),
    }));
  }),

  chartOptions: {
    chart: {
      spacing: [0, 0, 0, 0],
      zoomType: 'x',
    },
    legend: {
      enabled: false,
    },
    title: {
      text: null,
    },
    tooltip: {
      shared: true,
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
