import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  // Whenever our stream is mutated
  // (that is, when a new value arrives)
  formattedSeries: Ember.observer('property.stream.@each', function() {
    // Go fetch the whole observation stream
    const observations = this.get('property.stream');
    if (observations.length === 0) {
      this.set('series', null);
      return;
    }

    // Translate to Highcharts format
    const series = observations.map( ({datetime, value}) => {
      if (typeof value === 'number') {
        // Round to 3 decimal places.
        // And pray to the IEEE gods for no weird floating point shit.
        value = Math.round(value*1000)/1000;
      }
      return [moment(datetime).valueOf(), value];
    });
    // Throw it into Highcharts.
    // Be sure to transform to JS Array from Ember Array
    // so that Highcharts doesn't get confused.
    this.set('series', [{
      showInLegend: false,
      data: series,
      name: 'Value' //this.get('property.sensor')
    }]);
  }),

  chartOptions: Ember.computed('property', function() {
    const viewType = this.get('viewType');
    const prop = this.get('property');
    const liveConfig = {
      chart: {
        type: 'line',
      },
      title: {
        text: prop.name
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          second: '%l:%M:%S',
          year: '%b'
        },
        labels: {
          enabled: true,
        }
      },
      tooltip: {
        valueSuffix: prop.unit,
        dateTimeLabelFormats: {
          millisecond: '%l:%M:%S %p - %b %e, %Y',
          second: '%l:%M:%S %p - %b %e, %Y',
          minute: '%l:%M:%S %p - %b %e, %Y',
          hour: '%l:%M:%S %p - %b %e, %Y',
          day: '%l:%M:%S %p - %b %e, %Y',
          week: '%l:%M:%S %p - %b %e, %Y',
          month: '%l:%M:%S %p - %b %e, %Y',
          year: '%l:%M:%S %p - %b %e, %Y'
        }
      },
      yAxis: {
        title: {
          text: prop.unit
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
      }
    };
    if (viewType === 'history') {
      // Day-long intervals
      liveConfig.xAxis.tickInterval = 86400000;
    }
    return liveConfig;

  })
});
