import Ember from 'ember';
import BreakoutPageAbstractRoute from './breakout-base';

export default BreakoutPageAbstractRoute.extend({

  beforeModel(transition) {
    const datasets = transition.params.compare.datasetNames;
    const queryParams = transition.queryParams;

    // If there is only one dataset name, automatically redirect to the 'view' route instead
    if (datasets.includes(',') === false) {
      this.transitionTo('view', `${datasets}`, { queryParams });
    }
  },

  afterModel(resolvedModel) {
    // Ember.assert('grids.length != timesets.length', resolvedModel.data.timeseries.length === resolvedModel.data.grids.length);
    console.log(resolvedModel);
  },

});
