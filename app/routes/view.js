import Ember from 'ember';
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

});
