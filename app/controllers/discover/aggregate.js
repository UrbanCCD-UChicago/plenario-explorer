import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  discoverController: Ember.inject.controller('discover'),

  searchingDatasets: false,

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
    }
  },

  modelArrived: Ember.observer('model', function() {
    // Clear the old set of timeseries derived from
    // the dataset candidates.
    this.get('timeseriesList').clear();
    // Launch a new set of timeseries queries from the new candidates.
    this.launchTimeseriesQueries();
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

    let eligible = this.get('model').pointDatasets.length;
    let processed = 0;
    let discoverAggregateController = this;

    let alreadyErrored = false;

    let queryError = function(message){
      discoverAggregateController.set('searchingDatasets', false);
      discoverAggregateController.get('notify').error(`A problem occurred while processing your request: ${message}`);
      tipsMachine(message);
      discoverAggregateController.transitionToRoute('discover');
    }

    let tipsMachine = function(message){
      if(message.toLowerCase().indexOf("empty")>-1 || message.toLowerCase().indexOf("format")>-1) {
        discoverAggregateController.get('notify').info('This means that the Plenar.io API could not understand your request. Please check your query parameters, or reset your query and start over.');
      } else {
        discoverAggregateController.get('notify').info('Try resetting your query and starting over.');
      }
    }

    if(this.get('model').pointDatasets) {
      queryError(this.get('model').pointDatasets.error.message);
      return;
    }

    this.get('model').pointDatasets.forEach((d)=> {

      let params = this.queryParamsClone();
      Ember.assign(params, {dataset_name: d.datasetName});
      const tsPromise = this.get('query').timeseries(params);

      tsPromise.then(function (value) {

        if (value.error) {
            eligible--;
          if (!alreadyErrored) {
            queryError(value.error.message);
            alreadyErrored = true;
          }
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
      }, function(reason) {
        console.log(reason);
      });
    });
  }
});
