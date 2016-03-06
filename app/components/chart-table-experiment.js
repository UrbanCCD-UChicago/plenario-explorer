import Ember from 'ember';
import prepTimeseries from '../utils/prep-timeseries';

/*
  This component is a sketch of how we can create tables
  that incorporate properties straight off of models
  as well as timeseries data into charts.
 */
export default Ember.Component.extend({
  columns: [
    {
      "propertyName": "dataset_name",
      "title": "Name"
    },
    {
      "template": "chart-wrapper",
      "propertyName": "items",
      "title": "Trend"
    }
  ],

  didReceiveAttrs() {
    // Transform each model's items property
    // to a form that Highcharts can deal with.
    let rows = this.get('rows');
    for (let row of rows){
      row.items = prepTimeseries(row.items);
      // Debug below. Try concatting values into a string
      // To make sure the data is arriving how I think.
      //row.items = String(row.items[0].data);
    }
    // Don't mutate the 'rows' value passed in. DDAU.
    this.set('content', rows);
    console.log(rows);
  }
});
