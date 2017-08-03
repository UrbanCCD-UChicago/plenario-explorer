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
        event.isFalsePositive = true; // eslint-disable-line no-param-reassign
      }
    });
    _.forEach(model.shapes, (shape) => {
      if (shape.geoJSON && shape.geoJSON.features.length > 0) {
        shape.colorIndex = curColorIndex; // eslint-disable-line no-param-reassign

        // We need to add the colorIndex property to each individual feature, too, because
        // Leaflet is under the impression that no one would ever want to color all of the Points
        // in a single FeatureCollection the same color, and turns them each into an individual,
        // totally oprhaned layer on its own with no reference to where it came from. Seriously,
        // why are so many popular JS libraries such utter steaming garbage?
        _.forEach(shape.geoJSON.features, (elem) => { elem.properties.colorIndex = curColorIndex; });
        curColorIndex = (curColorIndex + 1) % numColors;
      } else {
        shape.isFalsePositive = true; // eslint-disable-line no-param-reassign
      }
    });

    // eslint-disable-next-line no-param-reassign
    model.falsePositives = _.concat(
      _.remove(model.events, 'isFalsePositive'),
      _.remove(model.shapes, 'isFalsePositive')
    );

    return model;
  },

});
