import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  discoverController: Ember.inject.controller('discover'),

  searchingDatasets: false,
  searchingShapes: false,

  queryParamsClone() {
    return this.get('discoverController').queryParamsClone();
  },

  timeseriesList: [],

  actions: {
    submit: function() {
      this.send("reload");
    },
    navigateToShape: function(name) {
      this.transitionToRoute('shape', name);
    },
    navigateToPoint: function(name) {
      const params = this.queryParamsClone();
      this.transitionToRoute('event', name, {queryParams: params});
    },
    downloadShape: function(name, fileType) {
      let params = this.queryParamsClone();
      params['data_type'] = fileType;
      this.get('query').rawShape(name, params, true);
    },
    downloadPoint: function(name, fileType) {
      let params = this.queryParamsClone();
      params['dataset_name'] = name;
      params['data_type'] = fileType;
      this.get('query').rawEvents(params, true);
    },
    loadPointDatasets: function(){
      this.launchTimeseriesQueries();
    },
    loadShapeDatasets: function(result){
      this.set('shapeDatasets', result);
      this.set('searchingShapes', false);
    }
  },

  modelArrived: Ember.observer('model', function(){
    this.get('timeseriesList').clear();
    this.set('shapeDatasets', []);

    let pointDatasets = this.get('model').pointDatasets;
    let shapeDatasets = this.get('model').shapeDatasets;
    this.set('searchingShapes', true);

    let self = this;
    pointDatasets.then(function(){
      self.send('loadPointDatasets');
    });
    shapeDatasets.then(function(result){
      self.send('loadShapeDatasets', result);
    });
  }),

  /**
   * For each candidate dataset,
   * query the matching timeseries
   * and push datasets with nonempty timeseries onto
   * the timeseriesList to display.
   */
  launchTimeseriesQueries() {
    this.set('searchingDatasets', true);

    let timeseriesList = this.get('timeseriesList');
    let arrivalOrder = 1;

    let pointDatasets = this.get('model').pointDatasets._result;
    let eligible = pointDatasets.length;
    let processed = 0;
    let discoverAggregateController = this;

    let queryError = function(error, goback=true){
      if(!goback) {
        discoverAggregateController.get('notify').warning(`Not all datasets were queried successfully: ${error.message}`);
      } else {
        discoverAggregateController.get('notify').error(`Error while processing request: ${error.message}`);
      }
      tipsMachine(error);
      if(goback){
        discoverAggregateController.set('searchingDatasets', false);
        discoverAggregateController.transitionToRoute('discover');
      }
    };

    let tipsMachine = function(error){
      if(error.message.toLowerCase().indexOf("format")>-1) {
        discoverAggregateController.get('notify').info('This means that the Plenar.io API could not understand your request. Please check your query parameters, or reset your query and start over.');
      } else if(error.errors && error.errors.length > 0 && (error.errors[0].status === "504" || error.errors[0].status === "0")){
        discoverAggregateController.get('notify').info('Some items in your request are taking too long to process. Try narrowing your search scope.');
      } else if(error.message.toLowerCase().indexOf("server error")>-1) {
        return;
      } else {
        discoverAggregateController.get('notify').info('Try resetting your query and starting over.');
      }
    };

    if(this.get('model').pointDatasets.error) {
      queryError(this.get('model').pointDatasets.error);
      return;
    }

    pointDatasets.forEach((d)=> {

      let params = this.queryParamsClone();
      Ember.assign(params, {dataset_name: d.datasetName});
      const tsPromise = this.get('query').timeseries(params);

      tsPromise.then(function (value) {

        if (value.error) {
          eligible--;
          queryError(value.error, false);
          return;
        }

        if (value.count === 0) {
          eligible--;
          return;  // Empty timeseries. Don't display it.
        }
        d['count'] = value.count;
        d['series'] = value.series;
        d['arrivalOrder'] = arrivalOrder;
        arrivalOrder++;
        timeseriesList.pushObject(d);
        processed++;
        if(processed === eligible) {
          discoverAggregateController.set('searchingDatasets', false);
        }
        //console.log(`Processed ${processed} of ${eligible} candidates.`);
      }, function(reason) {
        console.log(reason);
      });
    });
  }
});
