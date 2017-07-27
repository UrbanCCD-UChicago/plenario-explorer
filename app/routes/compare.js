import _ from 'npm:lodash';
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

  afterModel(model) {
    _.forEach(model.events, (event, index) => {
      event.colorIndex = index % 7; // eslint-disable-line no-param-reassign
    });
    _.forEach(model.shapes, (shape, index) => {
      shape.colorIndex = (model.events.length + index) % 7; // eslint-disable-line no-param-reassign
    });

    return model;
  },

});
