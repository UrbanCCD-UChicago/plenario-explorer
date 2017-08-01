import Ember from 'ember';
import _ from 'npm:lodash';
import BreakoutPageAbstractRoute from './breakout-base';

export default BreakoutPageAbstractRoute.extend({

  beforeModel(transition) {
    const dataset = transition.params.view.datasetNames;
    const queryParams = transition.queryParams;

    // If there is more than one dataset name, automatically redirect to the 'comapre' route instead
    if (dataset.includes(',') === true) {
      this.transitionTo('compare', `${dataset}`, { queryParams });
    }
  },

  afterModel(model) {
    console.log(model);
    const primaryDataset = _.concat([], model.events, model.shapes, model.features)[0];

    if (!primaryDataset.aggregatedEvents || !primaryDataset.aggregatedEvents.length ||
      !primaryDataset.geoJSON || !primaryDataset.geoJSON.features.length) {
      // TODO: redirect to the unfiltered version of the dataset so we can actually show something
    }

    Ember.set(model, 'primaryDataset', primaryDataset);

    return model;
  },

});
