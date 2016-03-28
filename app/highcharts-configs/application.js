import Ember from 'ember';

export default function(defaultOptions) {
  let options = {
    title: {
      text: ''
    },
    chart: {
      type: 'area'
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    xAxis: {
      title: {
        text: ''
      },
      type: 'datetime',
      labels: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    tooltip: {
      dateTimeLabelFormats: {
        hour: '%b %e, %Y'
      }
    },
    plotOptions: {
      series: {
        marker: {
          fillColor: "#518fc9",
            radius: 0,
            states: {
            hover: {
              enabled: true,
                radius: 5
            }
          }
        },
        shadow: false,
          states: {
          hover: {
            lineWidth: 3
          }
        }
      }
    }
  };
  return Ember.merge(defaultOptions, options);
  //return options;
}
