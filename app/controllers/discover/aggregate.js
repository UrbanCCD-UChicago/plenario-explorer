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
    submit() {
      this.send('reload');
    },
    navigateToShape(name) {
      this.transitionToRoute('shape', name);
    },
    navigateToPoint(name) {
      const params = this.queryParamsClone();
      this.transitionToRoute('event', name, { queryParams: params });
    },
    downloadShape(name, fileType) {
      const params = this.queryParamsClone();
      params.data_type = fileType;
      this.get('query').rawShape(name, params, true);
    },
    downloadPoint(name, fileType) {
      const params = this.queryParamsClone();
      params.dataset_name = name;
      params.data_type = fileType;
      this.get('query').rawEvents(params, true);
    },
    loadPointDatasets() {
      this.launchTimeseriesQueries();
    },
    loadShapeDatasets(result) {
      this.set('shapeDatasets', result);
      this.set('searchingShapes', false);
    },
    loadNodeSubset(result) {
      this.set('nodes', result);
    },
    loadSensorMetadata(result) {
      this.set('sensorMetadata', result);
    },
  },

  modelArrived: Ember.observer('model', function () {
    this.get('timeseriesList').clear();
    this.set('shapeDatasets', []);
    this.set('nodes', []);
    this.set('sensorMetadata', []);

    const pointDatasets = this.get('model.pointDatasets');
    const shapeDatasets = this.get('model.shapeDatasets');
    const nodeSubset = this.get('model.nodes');
    const sensorMeta = this.get('model.sensorMetadata');
    this.set('searchingShapes', true);

    const self = this;
    pointDatasets.then(() => {
      self.send('loadPointDatasets');
    });
    shapeDatasets.then((result) => {
      self.send('loadShapeDatasets', result);
    });
    nodeSubset.then((result) => {
      self.send('loadNodeSubset', result);
    });
    sensorMeta.then((result) => {
      self.send('loadSensorMetadata', result);
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

    const timeseriesList = this.get('timeseriesList');
    let arrivalOrder = 1;

    const pointDatasets = this.get('model').pointDatasets._result;
    let eligible = pointDatasets.length;
    let processed = 0;
    const discoverAggregateController = this;

    const queryError = function (error, goback = true) {
      if (!goback) {
        discoverAggregateController.get('notify').warning(`Not all datasets were queried successfully: ${error.message}`);
      } else {
        discoverAggregateController.get('notify').error(`Error while processing request: ${error.message}`);
      }
      tipsMachine(error);
      if (goback) {
        discoverAggregateController.set('searchingDatasets', false);
        discoverAggregateController.transitionToRoute('discover');
      }
    };

    let tipsMachine = function (error) {
      if (error.message.toLowerCase().indexOf('format') > -1) {
        discoverAggregateController.get('notify').info('This means that the Plenar.io API could not understand your request. Please check your query parameters, or reset your query and start over.');
      } else if (error.errors && error.errors.length > 0 && (error.errors[0].status === '504' || error.errors[0].status === '0')) {
        discoverAggregateController.get('notify').info('Some items in your request are taking too long to process. Try narrowing your search scope.');
      } else if (error.message.toLowerCase().indexOf('server error') > -1) {

      } else {
        discoverAggregateController.get('notify').info('Try resetting your query and starting over.');
      }
    };

    if (this.get('model').pointDatasets.error) {
      queryError(this.get('model').pointDatasets.error);
      return;
    }

    pointDatasets.forEach((d) => {
      const params = this.queryParamsClone();
      Ember.assign(params, { dataset_name: d.datasetName });
      const tsPromise = this.get('query').timeseries(params);

      tsPromise.then((value) => {
        if (value.error) {
          eligible--;
          queryError(value.error, false);
          return;
        }

        if (value.count === 0) {
          eligible--;
          return;  // Empty timeseries. Don't display it.
        }
        d.count = value.count;
        d.series = value.series;
        d.arrivalOrder = arrivalOrder;
        arrivalOrder++;
        timeseriesList.pushObject(d);
        processed++;
        if (processed === eligible) {
          discoverAggregateController.set('searchingDatasets', false);
        }
        // console.log(`Processed ${processed} of ${eligible} candidates.`);
      }, (reason) => {
        console.log(reason);
      });
    });
  },
});
