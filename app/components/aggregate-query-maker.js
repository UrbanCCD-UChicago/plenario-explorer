import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),

  baseMapTileUrl: ENV.baseMapTileUrl,
  defaultMapBounds: [[49.384472, -124.771694], [24.520833, -66.947028]], // contiguous 48 US states
  defaultMapCenter: [39.833333, -98.583333], // center of contiguous 48 US states
  defaultMapZoom: 3,

  drawOptions: {
    polyline: true,
    polygon: true,
    circle: false,
    rectangle: true,
    marker: false,
  },

  mapZoom: 4,

  mapCenter: Ember.computed('center', function () {
    const center = this.get('center');
    const cities = this.get('cities');
    if (center) {
      if (center in cities) {
        return cities[center].location;
      } else if (center.split(',').length === 2) {
        return center.split(',');
      } else if ('default' in cities) {
        this.get('notify').warning(`Unknown city "${center}". Try selecting a city from the "Center map on" menu.`);
        return cities.default.location;
      }
    }
    return this.get('defaultMapCenter');
  }),

  // IDs to populate the dropdown box. Computed from the cities dict above.
  citiesList: Ember.computed('cities', function () {
    const cities = this.get('cities');
    const list = Object.keys(cities).filter(key => key !== 'default').map(key => ({ id: key, label: this.get(`cities.${key}.label`) }));
    list.sort((first, second) => {
      if (first.id < second.id) {
        return -1;
      }

      return 1;
    });
    return list;
  }),

  init() {
    this._super(...arguments);
    this.zoomToCenter();
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('geoJSON')) {
      // Draw the user's shape back (so if they load from the URL it's still rendered)
      this.drawUserShape();
      this.zoomToDrawnShape();
    }
  },

  zoomToCenter() {
    const center = this.get('center');
    const cities = this.get('cities');
    if (center in cities) {
      this.set('mapZoom', cities[center].zoom);
    } else if ('default' in cities) {
      this.set('mapZoom', cities.default.zoom);
    } else {
      this.set('mapZoom', this.get('defaultMapZoom'));
    }
  },

  zoomToDrawnShape() {
    try {
      const geoJSONLayer = L.geoJSON(JSON.parse(this.get('geoJSON')));
      this.get('leafletMap').fitBounds(geoJSONLayer.getBounds());
    } catch (err) {
      // We already display an error notification when the user tries to
      // submit a query with invalid geoJSON. We just don't want to try
      // to zoom to it if it's invalid.
    }
  },

  drawUserShape() {
    try {
      const geoJSON = JSON.parse(this.get('geoJSON'));
      const layer = L.geoJSON(geoJSON);
      layer.addTo(this.get('leafletMap'));
    } catch (err) {
      // We already display an error notification when the user tries to
      // submit a query with invalid geoJSON. We just don't want to try
      // to draw it on the map if it's invalid.
    }
  },

  inTextCenter(point) {
    // Returns true if we have a text value of center (i.e. a city name)
    // and the point is within the center's bounds; returns false otherwise.
    const center = this.get('center');
    if (center && center.split(',').length !== 2) {
      const latLngBounds = L.latLngBounds(this.get(`cities.${center}.bounds`));
      return latLngBounds.contains(point);
    }
    return false;
  },

  ensureSingleDrawnFeature(event) {
    // To ensure the user can only have one drawn region, every time the
    // user draws a new shape we have to clear the map and then re-add
    // the newest shape. This is the method recommended by Leaflet.Draw.
    const map = event.target;
    const newLayer = event.layer; // Cache newly drawn layer
    map.eachLayer((layer) => {
      // Don't remove our base tile layer
      // eslint-disable-next-line no-underscore-dangle
      if (!layer._url) {
        layer.remove();
      }
    });
    map.addLayer(newLayer); // Put the new layer back
  },

  actions: {
    teleportToCity(event) {
      const selectElement = event.target;
      const cityName = selectElement.value;
      selectElement.selectedIndex = 0;
      this.set('center', cityName);
      this.zoomToCenter();
    },
    mapMovedByUser(event) {
      // Only update center if the user leaves the bounds of the
      // selected city (or already had a numeric center)
      const newCenter = event.target.getCenter();
      if (!this.inTextCenter(newCenter)) {
        this.set('center', `${newCenter.lat},${newCenter.lng}`);
      }
    },
    userDrewShape(event) {
      this.ensureSingleDrawnFeature(event);
      this.set('geoJSON', JSON.stringify(event.layer.toGeoJSON()));
    },
    cacheMapRef(event) {
      this.set('leafletMap', event.target);
    },
    submitAndZoom() {
      if (this.get('geoJSON')) {
        this.zoomToDrawnShape();
      }
      this.sendAction('submit');
    },

  },

});
