import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  // Whenever our stream is mutated
  // (that is, when a new value arrives)
  formattedSeries: Ember.observer('property.stream.@each', function() {
    // Go fetch the whole observation stream
    const observations = this.get('property.stream');
    console.log('observations', observations)
    // Translate to Highcharts format
    const series = observations.map(obs => {
      return [moment(obs.datetime + "+0000").valueOf(), obs.value];
    });
    console.log(series.map(obs => obs[0]));
    // Throw it into Highcharts.
    // Be sure to transform to JS Array from Ember Array
    // so that Highcharts doesn't get confused.
    this.set('series', [{
      data: series,
      name: this.get('property.sensor')
    }]);
  }),

  chartOptions: Ember.computed('property', function() {
    const prop = this.get('property');
    return {
      chart: {
        type: 'line',
      },
      title: {
        text: prop.name
      },
      xAxis: {
        type: 'datetime'
      },
      tooltip: {
        valueSuffix: prop.unit,
        dateTimeLabelFormats: {
          second: '%l:%M:%S %p - %b %e, %Y'
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
  })
});
