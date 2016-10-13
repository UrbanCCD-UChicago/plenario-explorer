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

    const tzOffsetInMs = 60*1000*(new Date().getTimezoneOffset());
    // Translate to Highcharts format
    const series = observations.map( ({datetime, value}) => {
      if (typeof value === 'number') {
        // Round to 3 decimal places.
        // And pray to the IEEE gods for no weird floating point shit.
        value = Math.round(value*1000)/1000;
      }

      return [moment(datetime).valueOf() - tzOffsetInMs, value];
    });
    // Throw it into Highcharts.
    // Be sure to transform to JS Array from Ember Array
    // so that Highcharts doesn't get confused.
    const vType = this.get('viewType');
    const tooltipName = vType === 'live' ? 'Value' : 'Average Over Hour';

    this.set('series', [{
      showInLegend: false,
      data: series,
      name: tooltipName
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
        dateTimeLabelFormats: {
          millisecond: '%l:%M %p',
          second: '%l:%M %p',
          minute: '%l:%M %p',
          hour: '%l:%M %p',
          day: '%l:%M %p',
          week: '%l:%M %p',
          month: '%l:%M %p',
          year: '%l:%M %p'
        },
        labels: {
          enabled: true,
        }
      },
      tooltip: {
        valueSuffix: ' ' + prop.unit,
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
      const aDay = 86400000;
      liveConfig.xAxis.tickInterval = aDay;
      liveConfig.xAxis.minRange = aDay * 7;
      liveConfig.xAxis.max = moment().valueOf();
      liveConfig.tooltip.dateTimeLabelFormats.hour = '%l %p - %b %e, %Y';
    }
    return liveConfig;

  })
});
