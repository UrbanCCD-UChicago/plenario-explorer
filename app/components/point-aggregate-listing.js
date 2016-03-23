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

    let delayedLoad = function() {
      let pointDatasets = this.get('pointDatasets');
      //pointDatasets.then(()=>{console.log('Resolved!')})
      console.log(pointDatasets);
      window.pd = pointDatasets;
      var dsets = [];
      pointDatasets.forEach(function(row){
        console.log(row);
        dsets.addObject(row);
      });
      this.set('preppedPointDatasets', dsets);
      //console.log(dsets);

      //this.set('preppedPointDatasets', []);
      ////let dsets = this.get('preppedPointDatasets');
      //console.log(pointDatasets[0]);
      //dsets.addObject(pointDatasets[0]);
      //dsets.addObject(pointDatasets[1]);

      /*
       this.set('preppedPointDatasets', []);
       Ember.run.later(this, function(){
       console.log('Made it to this delay')

       }, 500);
       Ember.run.later(this, function(){
       let dsets = this.get('preppedPointDatasets');

       this.set('preppedPointDatasets', dsets)
       }, 3000);
       */

    };
    Ember.run.later(this, delayedLoad, 500);

    // Don't mutate the 'pointDatasets' value passed in. DDAU.
    //this.set('preppedPointDatasets', pointDatasets);
  }
});
