import Ember from 'ember';
import prepTimeseries from '../utils/prep-timeseries';
import QueryConverter from '../utils/query-converter';

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

    // Start by mocking this out, to make sure template syncing is under control.
    // Need to loop through filtered point datasets and try to get
    // timeseries responses for each

    //let queryHash = this.get('queryHash');
    //let pointDatasets = this.get('pointDatasets');
    //for (let pd of pointDatasets){
      //let name = pd.dataset_name;
      //let queryHashWithName = Ember.$.extend({"name": name}, queryHash);
      //let id = new QueryConverter().fromHash(queryHashWithName).toId();
      //let ts = this.store.get('timeseries', id);
    //}

    // Create empty list.
    // One second later, add first timeseries.
    // Three seconds later, add second timeseries.


    // Transform each model's items property
    // to a form that Highcharts can deal with.
    let pointDatasets = this.get('pointDatasets');
    for (let row of pointDatasets){
      row.items = prepTimeseries(row.items);
    }
    this.set('preppedPointDatasets', []);
    Ember.run.later(this, function(){
      let dsets = this.get('preppedPointDatasets');
      dsets.addObject(pointDatasets[0])
    }, 500);
    Ember.run.later(this, function(){
      let dsets = this.get('preppedPointDatasets');
      dsets.addObject(pointDatasets[1])
    }, 3000);

    // Don't mutate the 'pointDatasets' value passed in. DDAU.
    //this.set('preppedPointDatasets', pointDatasets);
  }
});
