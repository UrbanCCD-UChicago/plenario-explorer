import Ember from 'ember';
import moment from 'moment';
import prepTimeseries from '../utils/prep-timeseries';

/*
  This component is useful when we need a standalone chart
  (i.e., not inline in a table).
  It converts the Plenario timeseries formatting to Highcharts formatting
  and passes that on to a high-charts component.
 */
export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    var ts = this.get('timeseries');
    this.set('_timeseries', prepTimeseries(ts));
  }
});
