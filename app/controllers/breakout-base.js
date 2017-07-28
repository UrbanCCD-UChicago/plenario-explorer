import Ember from 'ember';
import _ from 'npm:lodash';
import turfDifference from 'npm:@turf/difference';
import moment from 'npm:moment';

export default Ember.Controller.extend({

  queryParameters: ['startDate', 'endDate', 'aggregateBy', 'withinArea'],

  allDatasets: Ember.computed.union('model.events', 'model.shapes'),
  spatialDatasets: Ember.computed.filter(
    'allDatasets',
    ds => (ds.geoJSON && ds.geoJSON.features.length > 0)
  ),
  temporalDatasets: Ember.computed.filter(
    'allDatasets',
    ds => (ds.aggregatedEvents && ds.aggregatedEvents.length > 0)
  ),

  mapBounds: Ember.computed('spatialDatasets', function () {
    const datasets = this.get('spatialDatasets');

    const allGeoJSONLayers = [];

    _.forEach(datasets, ds => allGeoJSONLayers.push(L.geoJSON(ds.geoJSON)));

    const mapBounds = L.featureGroup(allGeoJSONLayers).getBounds();
    return mapBounds.isValid() ? mapBounds : undefined;
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

  chartData: Ember.computed('plottedDatasets', function () {
    const timeseriesData = this.get('plottedDatasets');

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
