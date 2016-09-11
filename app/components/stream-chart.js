import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  // Whenever our stream is mutated
  // (that is, when a new value arrives)
  formattedSeries: Ember.observer('observations.@each', function() {
    // Go fetch the whole observation stream
    const observations = this.get('observations');
    // Translate to Highcharts format
    const series = observations.map(obs => {
      return [moment(obs.datetime + "+0000").unix(), obs.value];
    });
    console.log(series.map(obs => obs[0]));
    // Throw it into Highcharts.
    // Be sure to transform to JS Array from Ember Array
    // so that Highcharts doesn't get confused.
    this.set('series', [{
      data: series,
      name: ''
    }]);
  })
});
