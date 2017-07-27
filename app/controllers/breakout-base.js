import Ember from 'ember';
import _ from 'npm:lodash';
import turfDifference from 'npm:@turf/difference';
import moment from 'npm:moment';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'aggregateBy', 'withinArea'],

  allDatasets: Ember.computed.union('model.events', 'model.shapes'),

  mapBounds: Ember.computed('model', function () {
    const griddedEvents = this.get('griddedEvents');
    const shapes = this.get('model.shapes');

    const allGeoJSONLayers = [];

    _.forEach(griddedEvents, event => allGeoJSONLayers.push(L.geoJSON(event.geoJSON)));
    _.forEach(shapes, shape => allGeoJSONLayers.push(L.geoJSON(shape.geoJSON)));

    return L.featureGroup(allGeoJSONLayers).getBounds();
  }),

  mapSearchLimit: Ember.computed('withinArea', function () {
    const areaString = this.get('withinArea');

    if (!areaString) {
      return undefined;
    }

    const worldGeoJSON = { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[-1800, -90], [1800, -90], [1800, 90], [-1800, 90], [-1800, -90]]] } };
    const areaGeoJSON = JSON.parse(areaString);

    return turfDifference(worldGeoJSON, areaGeoJSON);
  }),

  griddedEvents: Ember.computed.filter('model.events', (event => event.geoJSON)),

  chartData: Ember.computed('model', function () {
    const timeseriesData = _.filter(this.get('model.events'), 'aggregatedEvents');

    if (!timeseriesData || timeseriesData.length < 1) {
      return undefined;
    }

    return timeseriesData.map(timeseries => ({
      name: timeseries.humanName,
      colorIndex: timeseries.colorIndex,
      data: timeseries.aggregatedEvents
        .map(item => ({ x: moment(item.datetime).valueOf(), y: item.count })),
    }));
  }),

});
