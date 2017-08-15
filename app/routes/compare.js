import _ from 'npm:lodash';
import ENV from 'plenario-explorer/config/environment';
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
    // We're doing a lot of manipulation of the model here, and it's wasteful to keep making
    // copies all over the place. Just modify it all in place.
    /* eslint-disable no-param-reassign */
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
      if (shape.totalCount > ENV.data.maxShapeItemsToDisplay) {
        shape.isTooLarge = true;
      } else if (shape.totalCount <= 0) {
        shape.isFalsePositive = true;
      } else {
        shape.colorIndex = curColorIndex;

        // We need to add the colorIndex property to each individual feature, too, because
        // Leaflet turns them each into an individual, totally orphaned layer with no reference
        // to where it came from. Seriously.
        _.forEach(shape.geoJSON.features, (elem) => {
          elem.properties.colorIndex = curColorIndex;
        });
        curColorIndex = (curColorIndex + 1) % numColors;
      }
    });

    // eslint-disable-next-line no-param-reassign
    model.falsePositives = _.concat(
      _.remove(model.events, 'isFalsePositive'),
      _.remove(model.shapes, 'isFalsePositive')
    );
    /* eslint-enable no-param-reassign */

    return model;
  },

});
