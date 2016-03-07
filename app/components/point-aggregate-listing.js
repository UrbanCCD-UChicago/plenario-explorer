import Ember from 'ember';
import prepTimeseries from '../utils/prep-timeseries';

export default Ember.Component.extend({
  columns: [
    {
      "title": "Source",
      "propertyName": "attribution"
    },
    {
      "title": "Dataset Name",
      "template": "display-link"
    },
    {
      "title": "Count",
      "propertyName": "count"
    },
    {
      "title": "Trend",
      "template": "chart-wrapper"
    },
    {
      "title": "Download",
      "template": "point-download-link"
    }
  ],
  init() {
    this._super(...arguments);
    let pointDatasets = this.get('pointDatasets');
    // Transform each model's items property
    // to a form that Highcharts can deal with.
    for (let row of pointDatasets){
      row.items = prepTimeseries(row.items);
    }
    // Don't mutate the 'pointDatasets' value passed in. DDAU.
    this.set('preppedPointDatasets', pointDatasets);
  }
});
