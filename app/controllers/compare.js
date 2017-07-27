import BreakoutPageAbstractController from './breakout-base';

export default BreakoutPageAbstractController.extend({

  chartOptions: {
    chart: {
      height: '75%',
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
