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
    const numColors = 7;
    let curColorIndex = 0;
    _.forEach(model.events, (event) => {
      if ((event.aggregatedEvents && event.aggregatedEvents.length > 0) ||
        (event.geoJSON && event.geoJSON.features.length > 0)) {
        event.colorIndex = curColorIndex; // eslint-disable-line no-param-reassign
        curColorIndex = (curColorIndex + 1) % numColors;
      } else {
        event.colorIndex = -1; // eslint-disable-line no-param-reassign
      }
    });
    _.forEach(model.shapes, (shape) => {
      if ((shape.aggregatedEvents && shape.aggregatedEvents.length > 0) ||
        (shape.geoJSON && shape.geoJSON.features.length > 0)) {
        shape.colorIndex = curColorIndex; // eslint-disable-line no-param-reassign
        curColorIndex = (curColorIndex + 1) % numColors;
      } else {
        shape.colorIndex = -1; // eslint-disable-line no-param-reassign
      }
    });

    return model;
  },

});
