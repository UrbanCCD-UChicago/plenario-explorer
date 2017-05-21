import Ember from "ember";
import ENV from "plenario-explorer/config/environment";

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),

  baseMapTileUrl: ENV.baseMapTileUrl,
  defaultMapBounds: [[49.384472, -124.771694], [24.520833, -66.947028]], // contiguous 48 US states
  defaultMapCenter: [39.833333, -98.583333], // center of contiguous 48 US states
  defaultMapZoom: 5,

  drawOptions: {
    'polyline': true,
    'polygon': true,
    'circle': false,
    'rectangle': true,
    'marker': false
  },

  mapZoom: 4,

  mapCenter: Ember.computed("center", function() {
    const center = this.get("center");
    const cities = this.get("cities");
    if(center) {
      if(center in cities) {
        return cities[center].location;
      } else if(center.split(",").length === 2) {
        return center.split(",");
      }
    } else {
      return this.get('defaultMapCenter');
    }
  }),

  //IDs to populate the dropdown box. Computed from the cities dict above.
  citiesList: Ember.computed('cities', function(){
    let list = Object.keys(this.get('cities')).map(key => {
      return {id: key, label: this.get(`cities.${key}.label`)};
    });
    list.sort((first, second) => {
      if(first.id < second.id) {
        return -1;
      }
      else {
        return 1;
      }
    });
    return list;
  }),

  init() {
    this._super(...arguments);
    this.zoomToCenter();
  },

  didInsertElement() {
    this._super(...arguments);
    if(this.get("geoJSON")) {
      this.zoomToDrawnShape();
      // Draw the user's shape back (so if they load from the URL it's still rendered)
      this.drawUserShape();
    }
  },

  zoomToCenter() {
    const center = this.get("center");
    const cities = this.get("cities");
    if(center in cities) {
      this.set("mapZoom", cities[center].zoom);
    } else {
      this.set("mapZoom", this.get("defaultMapZoom"));
    }
  },

  zoomToDrawnShape() {
    const geoJSONLayer = L.geoJSON(JSON.parse(this.get("geoJSON")));
    this.get("leafletMap").fitBounds(geoJSONLayer.getBounds());
  },

  drawUserShape() {
    const geoJSON = JSON.parse(this.get("geoJSON"));
    const layer = L.geoJSON(geoJSON);
    layer.addTo(this.get("leafletMap"));
  },

  inTextCenter(point) {
    // Returns true if we have a text value of center (i.e. a city name)
    // and the point is within the center's bounds; returns false otherwise.
    const center = this.get("center");
    if(center.split(',').length !== 2) {
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
    map.eachLayer(layer => {
      // Don't remove our base tile layer
      if (!layer._url) {
        layer.remove();
      }
    });
    map.addLayer(newLayer); // Put the new layer back
  },

  actions: {
    //Collapse the opened introduction without refreshing the page.
    dismissIntro(){
      $("#collapse-intro").collapse("hide");
    },
    teleportToCity(cityName) {
      this.set("center", cityName);
      this.zoomToCenter();
    },
    mapMoved(event) {
      // Programmatic moves generate events with the "hard" property
      // Only update center if the user leaves the bounds of the
      // selected city (or already had a numeric center)
      if(!event.hard) {
        const newCenter = event.target.getCenter();
        if (!this.inTextCenter(newCenter)) {
          this.set("center", `${newCenter.lat},${newCenter.lng}`);
        }
      }

    },
    userDrewShape(event) {
      this.ensureSingleDrawnFeature(event);
      this.set('geoJSON', JSON.stringify(event.layer.toGeoJSON()));
    },
    cacheMapRef(event) {
      this.set("leafletMap", event.target);
    },
    submitAndZoom() {
      if(this.get("geoJSON")) {
        this.zoomToDrawnShape();
      }
      this.sendAction("submit");
    }

  }

});
