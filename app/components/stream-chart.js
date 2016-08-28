import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({


  formattedSeries: Ember.observer('observations.@each', function() {
    // console.log('Computing');
    // const property = this.get('property');

    const observations = this.get('observations');
    console.log(this.get('property'));
    if (this.get('property') === 'h2s') {
      console.log(observations);
    }
    // console.log(observations);
    const series = observations.map(obs => {
      // console.log(obs);
      return [moment(obs.datetime + "+0000").unix(), obs.val];
    });
    this.set('series', [{
      data: series.toArray(),
      name: ''
    }]);
    // this.set('formattedSeries', [{
    //   'data': series.toArray(),
    //   'name': ''
    // }]);
  })
});
