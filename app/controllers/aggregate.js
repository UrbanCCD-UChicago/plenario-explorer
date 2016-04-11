import Ember from 'ember';
import moment from 'moment';
import dateFormat from '../utils/date-format';
import QueryConverter from '../utils/query-converter';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within'],
  obs_date__le: dateFormat(moment().subtract(90, 'days').toString()),
  obs_date__ge: dateFormat(moment().toString()),
  agg: 'week',
  location_geom__within: null,

  zoom: false,
  timeseriesList: [],

  actions: {
    submit: function() {
      this.send("reload");
      // We need to nudge leaflet to zoom in on
      // the shape the user has drawn.
      this.set('zoom', true);
      const self = this;
      Ember.run.next(() => {
        self.set('zoom', false);
      });
    },
    reset: function () {
      this.transitionToRoute('index');
    },
    navigateToShape: function(name) {
      alert(`Imagine you just transitioned to ${name} shape detail page.`);
    },
    navigateToPoint: function(name) {
      alert(`Imagine you just transitioned to ${name} point detail page.`);
    },
    downloadShape: function(id, fileType) {
      // Pull the dataset name out of the query string.
      let qHash = new QueryConverter().fromId(id).toHash();
      const name = qHash['dataset_name'];
      delete qHash['dataset_name'];
      // And insert the correct data type.
      qHash['data_type'] = fileType;
      const qString = new QueryConverter().fromHash(qHash).toQueryString();
      // Open in a new tab.
      window.open(`http://plenar.io/v1/api/shapes/${name}${qString}`);
    },
    downloadPoint: function(id, fileType) {
      let qHash = new QueryConverter().fromId(id).toHash();
      qHash['data_type'] = fileType;
      const qString = new QueryConverter().fromHash(qHash).toQueryString();
      window.open(`http://plenar.io/v1/api/detail${qString}`);
    }
  },

  modelArrived: Ember.observer('model', function() {
    // Clear the old set of timeseries derived from
    // the dataset candidates.
    this.get('timeseriesList').clear();
    // Launch a new set of timeseries queries from the new candidates.
    this.launchTimeseriesQueries();
  }),

  query: Ember.inject.service(),

  /**
   * For each candidate dataset,
   * query the matching timeseries
   * and push datasets with nonempty timeseries onto
   * the timeseriesList to display.
   */
  launchTimeseriesQueries() {
    let model = this.get('model');
    let arrivalOrder = 1;
    model.pointDatasets.forEach((d)=>{
      const datasetName = d.datasetName;
      const queryProps = this.getProperties(this.get('queryParams'));
      const tsPromise = this.get('query').timeseries(datasetName, queryProps);
      let timeseriesList = this.get('timeseriesList');

      tsPromise.then(function(value){
        console.log(value);
        if (value.count === 0) {
          return;  // Empty timeseries. Don't display it.
        }
        d['count'] = value.count;
        d['series'] = value.series;
        d['arrivalOrder'] = arrivalOrder;
        arrivalOrder++;
        timeseriesList.pushObject(d);
      }, function(reason){
        console.log(reason);
      });
    });
  }
});
