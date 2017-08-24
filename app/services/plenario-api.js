import Ember from 'ember';
import _ from 'npm:lodash';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Service.extend({

  ajax: Ember.inject.service(),

  appParamsToApiParamsMap: {
    datasetNames: 'dataset_name__in',
    startDate: 'obs_date__ge',
    endDate: 'obs_date__le',
    aggregateBy: 'agg',
    withinArea: 'location_geom__within',
    useSimpleBbox: 'simple_bbox',
    downloadType: 'data_type',
  },

  downloadFormats: {
    shape: [
      { name: 'GeoJSON', ext: '.geojson', downloadType: 'json' },
      { name: 'ESRI Shapefile', ext: '.shp/.shx/.dbf', downloadType: 'shapefile' },
      { name: 'KML (Google Earth)', ext: '.kml', downloadType: 'kml' },
    ],
    event: [
      { name: 'JSON', ext: '.json', downloadType: 'json' },
      { name: 'GeoJSON', ext: '.geojson', downloadType: 'geojson' },
      { name: 'Comma-separated values', ext: '.csv', downloadType: 'csv' },
    ],
  },

  init() {
    this.fetch = this.fetch(this);
    this.adapter = this.adapter(this);
  },

  /* eslint-disable brace-style */
  fetch(service) {
    const ajax = service.get('ajax');
    return {

      core: (function () { return {
        metadata: (function () { return {

          events(datasetNames, startDate, endDate, withinArea, useSimpleBbox) {
            // TODO: in future, if API treats 'dataset_name__in' as an includes operation
            // and not an iterable list of datasets to query, should be able to just pass
            // datasetNames straight through, instead of filtering them client-side below
            const qp = service.adapter.mapQueryParamNames(
              { startDate, endDate, withinArea, useSimpleBbox }
            );

            Ember.Logger.debug('Calling /datasets with params: ', qp);

            return ajax.request('datasets', { data: qp })
              .then(response => response.objects)
              .then(this._standardize)
              .then((datasets) => {
                if (!datasetNames) {
                  return datasets;
                }
                return _.filter(datasets, dataset => _.includes(datasetNames, dataset.name));
              });
          },

          shapes(datasetNames, withinArea, useSimpleBbox) {
            const qp = !withinArea ? undefined :
              service.adapter.mapQueryParamNames({ withinArea, useSimpleBbox });

            Ember.Logger.debug('Calling /shapes with params: ', qp);

            return ajax.request('shapes', { data: qp })
              .then(response => response.objects)
              .then(this._standardize)
              .then((shapes) => {
                if (!datasetNames) {
                  return shapes;
                }
                return _.filter(shapes, shape => _.includes(datasetNames, shape.name));
              });
          },

          _standardize(metadataObjects) {
            return _.chain(metadataObjects)
              .map(mO => ({
                name: mO.dataset_name,
                type: mO.num_shapes ? 'shape' : 'event',
                humanName: mO.human_name,
                provider: mO.attribution,
                description: mO.description,
                dateAdded: mO.date_added,
                oldest: mO.obs_from,
                newest: mO.obs_to,
                lastUpdate: mO.last_update,
                updateFreq: mO.update_freq,
                bbox: mO.bbox,
                totalCount: mO.num_shapes ? mO.num_shapes : undefined,
                urls: {
                  source: mO.source_url,
                  view: mO.view_url,
                },
                downloadFormats: mO.num_shapes ?
                  service.downloadFormats.shape :
                  service.downloadFormats.event,
              }))
              .sortBy(['name', 'provider'])
              .value();
          },

        }; }()),

        data: (function () { return {

          timeseries(datasetNames, startDate, endDate, aggregateBy, withinArea) {
            const qp = service.adapter.mapQueryParamNames(
              { datasetNames, startDate, endDate, aggregateBy, withinArea }
            );
            Ember.Logger.debug('Calling /timeseries with params: ', qp);
            return ajax.request('timeseries', { data: qp })
              .then(response => response.objects)
              .then(timeseries => _.map(timeseries, ts => ({
                name: ts.dataset_name,
                aggregatedEvents: ts.items,
                totalCount: ts.count,
              })));
          },

          timeseriesFor(eventMetadataObjects, startDate, endDate, aggregateBy, withinArea) {
            if (eventMetadataObjects.length < 1) {
              return Ember.RSVP.resolve([]);
            }

            const datasetNames = _.map(eventMetadataObjects, mO => mO.name);
            return this.timeseries(datasetNames, startDate, endDate, aggregateBy, withinArea)
              .then((timeseriesData) => {
                _.forEach(eventMetadataObjects, ((mO) => {
                  const matchedTs = _.find(timeseriesData, td => td.name === mO.name);
                  _.assign(mO, matchedTs);
                }));
                return eventMetadataObjects;
              });
          },

          grids(datasetNames, startDate, endDate, aggregateBy, withinArea) {
            const qp = service.adapter.mapQueryParamNames(
              { startDate, endDate, aggregateBy, withinArea }
            );

            Ember.Logger.debug('Calling /grid with params: ', qp, 'for each of: ', datasetNames);

            return Ember.RSVP.all(
              _.map(datasetNames, datasetName =>
                ajax.request('grid', { data: _.assign({ dataset_name: datasetName }, qp) })
                  .then(grid => ({ name: grid.properties.dataset, geoJSON: grid }))
              )
            );
          },

          gridsFor(eventMetadataObjects, startDate, endDate, aggregateBy, withinArea) {
            if (eventMetadataObjects.length < 1) {
              return Ember.RSVP.resolve([]);
            }

            const datasetNames = _.map(eventMetadataObjects, mO => mO.name);
            return this.grids(datasetNames, startDate, endDate, aggregateBy, withinArea)
              .then((grids) => {
                _.forEach(eventMetadataObjects, ((mO) => {
                  const matchedGrid = _.find(grids, g => g.name === mO.name);
                  _.assign(mO, matchedGrid);
                }));
                return eventMetadataObjects;
              });
          },

          shapes(datasetNames, withinArea) {
            const qp = service.adapter.mapQueryParamNames({ withinArea });
            return Ember.RSVP.all(
              _.map(datasetNames, datasetName =>
                ajax.request(`shapes/${datasetName}`, { data: qp })
                // TODO: switch to using response properties for name, when it has some
                  .then(shape => ({
                    name: datasetName,
                    geoJSON: shape,
                    totalCount: shape.features.length,
                  }))
              )
            );
          },

          shapesFor(shapeMetadataObjects, withinArea) {
            if (shapeMetadataObjects.length < 1) {
              return Ember.RSVP.resolve([]);
            }

            const datasetNames = _.chain(shapeMetadataObjects)
              .filter(mO => mO.totalCount < ENV.data.maxShapeItemsToDisplay)
              .map(mO => mO.name)
              .value();
            return this.shapes(datasetNames, withinArea)
              .then((shapes) => {
                _.forEach(shapeMetadataObjects, ((mO) => {
                  const matchedShape = _.find(shapes, g => g.name === mO.name);
                  _.assign(mO, matchedShape);
                }));
                return shapeMetadataObjects;
              });
          },

        }; }()),
      }; }()),

      networks: (function () { return {

        metadata: (function () { return {

          nodes(network, withinArea) {
            const qp = service.adapter.mapQueryParamNames({ withinArea });

            Ember.Logger.debug(`Calling /${network}/nodes with params: `, qp);

            return ajax.request(`/sensor-networks/${network}/nodes`, { data: qp })
              .then(r => r.data);
          },

          features(network, withinArea) {
            const qp = service.adapter.mapQueryParamNames({ withinArea });

            // Fix the query parameter names because this uses different ones
            if (qp.location_geom__within) {
              qp.geom = qp.location_geom__within;
              delete qp.location_geom__within;
            }

            return ajax.request(`/sensor-networks/${network}/features`, { data: qp })
              .then(
                r => r.data,
                r => (r.payload.error.match(/^No features found within /) ? [] : r.payload.error)
              ).then(
                data => _.chain(data)
                  .map(feat =>
                    ({
                      name: feat.name,
                      humanName: _.chain(feat.name)
                        .words()
                        .join(' ')
                        .startCase()
                        .value(),
                      provider: _.chain(network)
                        .words()
                        .join(' ')
                        .startCase()
                        .value(),
                      properties: _.filter(feat.properties, 'common_name'),
                    }))
                  .filter(feat => feat.properties.length > 0)
                  .value()
              );
          },

        }; }()),

        data: (function () { return {

          observations(network, feature, sensors, startDate, endDate, nodes, withinArea) {
            const qp = service.adapter.mapQueryParamNames({ startDate, endDate, withinArea });

            // Fix the query parameter names because this uses all completely different ones
            if (qp.location_geom__within) {
              qp.geom = qp.location_geom__within;
              delete qp.location_geom__within;
            }
            if (qp.obs_date__ge) {
              qp.start_datetime = qp.obs_date__ge;
              delete qp.obs_date__ge;
            }
            if (qp.obs_date__le) {
              qp.end_datetime = qp.obs_date__le;
              delete qp.obs_date__le;
            }

            qp.feature = feature;
            qp.sensors = sensors.join(',');
            qp.nodes = nodes.join(',');

            return ajax.request(`/sensor-networks/${network}/query`, { data: qp });
          },

        }; }()),

      }; }()),
    };
  },
  /* eslint-enable brace-style */

  /* eslint-disable brace-style */
  adapter(service) { return {

    mapQueryParamNames(appQueryParamsHash) {
      const qp = _.mapKeys(
        appQueryParamsHash,
        (value, key) => service.appParamsToApiParamsMap[key]
      );

      // Stringify the dataset name list as necessary
      if (qp.dataset_name__in && qp.dataset_name__in.length === 1) {
        qp.dataset_name = qp.dataset_name__in[0];
        delete qp.dataset_name__in;
      } else if (qp.dataset_name__in) {
        qp.dataset_name__in = qp.dataset_name__in.join(',');
      }

      // Stringify the search geometry so JQuery.ajax doesn't choke to death on it
      if (qp.location_geom__within instanceof Object) {
        qp.location_geom__within = JSON.stringify(qp.location_geom__within);
      }

      return _.pickBy(qp, value => value !== undefined && value !== null);
    },

    buildDownloadURL(metadataObject, appQueryParamsHash) {
      const baseURL = `${ENV.ajax.host}/${ENV.ajax.namespace}`;
      const qp = this.mapQueryParamNames(appQueryParamsHash);

      let endpoint;

      switch (metadataObject.type) {
        case 'event':
          endpoint = 'datadump';
          qp.dataset_name = metadataObject.name;
          break;
        case 'shape':
          endpoint = `shapes/${metadataObject.name}`;
          break;
        default:
          Ember.Logger.error('Invalid dataset metadata');
      }

      const qpStr = _.chain(qp)
        .toPairs()
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
        .value();

      return `${baseURL}/${endpoint}?${qpStr}`;
    },

  }; },
  /* eslint-enable brace-style */

});
