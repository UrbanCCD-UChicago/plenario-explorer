import Ember from 'ember';

export default function (defaultOptions) {
  const options = {
    title: {
      text: '',
    },
    chart: {
      type: 'area',
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: '',
      },
      type: 'datetime',
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    tooltip: {
      // Mostly the dates are formatted as hours,
      // but better safe than sorry.
      dateTimeLabelFormats: {
        second: '%b %e, %Y',
        minute: '%b %e, %Y',
        hour: '%b %e, %Y',
        day: '%b %e, %Y',
        week: '%b %e, %Y',
        month: '%b %e, %Y',
        year: '%b %e, %Y',
      },
    },
    plotOptions: {
      series: {
        marker: {
          fillColor: '#518fc9',
          radius: 0,
          states: {
            hover: {
              enabled: true,
              radius: 5,
            },
          },
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 3,
          },
        },
      },
    },
  };
  Ember.assign(defaultOptions, options);
  return defaultOptions;
}
