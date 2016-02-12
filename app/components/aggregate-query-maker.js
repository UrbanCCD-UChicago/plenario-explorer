import Ember from 'ember';

export default Ember.Component.extend({
  // namedParam of drawnShape is required
  // Need to set dynamic default dates (today to 90 days ago)
  startDate: '11/12/2015',
  endDate: '02/10/2016',
  agg: 'week'
});
