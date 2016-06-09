import Ember from 'ember';
/* global L */

// Possible parameters:
// geoJSON: geoJSON for a layer to be displayed
// isDrawable: whether we should enable draw controls
//             to let the user create/mutate `layer`
// layer: preformatted Leaflet layer, ready to display.
// legend: HTML div to insert in the bottom right-hand corner of the map.
//
// (We expect a combination of geoJSON and isDrawable for
//  the main query pages and layer + legend for grid display)


// Chi-town...our beloved default view.
const lat = 41.795509;
const lng = -87.581916;
const zoom = 10;
const tileURL = 'https://{s}.tiles.mapbox.com/v3/datamade.hn83a654/{z}/{x}/{y}.png';

export default Ember.Component.extend({

  center: [[lat, lng], zoom],

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.addMap();
      this.addTiles();
      this.drawElements();
      this.createLegend();
    });
  },

  addMap() {
    const map_options = {
      scrollWheelZoom: false,
      tapTolerance: 30,
      minZoom: 1
    };
    this.set('map', L.map('map', map_options).setView(...this.get('center')));
  },

  addTiles() {
    let tiles = L.tileLayer(tileURL);
    tiles.addTo(this.get('map'));
  },

  drawElements: function() {
    var layer = this.initLayer();
    if (this.get('isDrawable')) {
      // Even if layer is null,
      // we still need to make a "hidden" layer
      // for the user to draw on.
      this.makeDrawableLayer(layer);
    }
    else if (!!layer) {
      // Display an immutable layer
      this.map.addLayer(layer);
    }

    // Whether it's mutable or immutable,
    // If we have a layer we should zoom in on it.
    if (!!layer) {
      this.map.fitBounds(layer.getBounds());
    }
  },

  createLegend() {
    const div = this.get('legendDiv');
    if (div) {
      const legend = L.control({position: 'bottomright'});
      legend.onAdd = function() {
        return div;
      };
      legend.addTo(this.map);
    }
  },

  initLayer() {
    let layer;
    // Did the caller supply a layer to display as-is?
    let preformatted = this.get('layer');
    if (!!preformatted) {
      layer = preformatted;
    }
    else {
      // Make a layer out of geoJSON
      let geoJSON = this.get('geoJSON');
      layer = this.geoJSONtoLayer(geoJSON);
    }
    return layer;
  },

  geoJSONtoLayer(geoJSON) {
    // Return valid Leaflet layer or null
    if (!geoJSON){
      return null;
    }
    try {
      if (typeof(geoJSON) === 'string') {
        geoJSON = JSON.parse(geoJSON);
      }

      // Add popups
      const onEachFeature = function(feature, layer) {
        const props = feature.properties;
        if (props) {
          let table = '<table>';
          for (const key of Object.keys(props)) {
            table += `<tr><td>${key}&nbsp;</td><td>&nbsp;${props[key]}</td></tr>`;
          }
          table += '</table>';
          layer.bindPopup(table);
        }
      };
      return L.geoJson(geoJSON, {
        onEachFeature: onEachFeature
      });
    }
    catch (e) {
      // Wasn't valid GeoJSON
      return null;
    }
  },

  makeDrawableLayer(layer) {
    this.addDrawControl(layer);
    this.addDrawListeners();
  },

  addDrawControl(layer) {
    // Making the feature group an attribute of the map
    // so that event handlers that have access to the map
    // can get at it.
    this.map.drawnItems = new L.FeatureGroup();
    if (layer) {
      this.map.drawnItems.addLayer(layer);
    }
    this.map.addLayer(this.map.drawnItems);

    var editOptions = {
      featureGroup: this.map.drawnItems
    };
    if (layer) {
      editOptions['edit'] = false;
      editOptions['remove'] = false;
    }

    let drawControl = new L.Control.Draw({
      edit: editOptions,
      draw: {
        circle: false,
        marker: false
      }
    });
    this.map.addControl(drawControl);
  },

  addDrawListeners() {
    // Only allow the user to draw one vector at a time.
    this.map.on('draw:created', this.drawCreate);
    this.map.on('draw:edited', this.drawEdit);
    this.map.on('draw:drawstart', this.drawDelete);
    this.map.on('draw:deleted', this.drawDelete);

    // Attach the reporting functions to the map
    // so that we can call them from the Leaflet event handlers.
    let self = this;
    this.map.reportDrawn = function(layer) {
      self.set('geoJSON', JSON.stringify(layer.toGeoJSON()));
    };
    this.map.reportDeleted = function() {
      self.set('geoJSON', null);
    };
  },

  drawCreate(e){
    this.drawnItems.clearLayers();
    this.drawnItems.addLayer(e.layer);
    this.reportDrawn(e.layer);
  },
  drawDelete(){
    this.drawnItems.clearLayers();
    this.reportDeleted();
  },
  drawEdit(e){
    let layer = e.layers.getLayers()[0];
    this.reportDrawn(layer);
  },

  // On subsequent renders,
  // make sure we're zoomed in on the drawn geom.
  shouldZoom: Ember.observer('zoom', function() {
    if (this.get('zoom')){

      let layer = this.map.drawnItems.getLayers()[0];
      this.map.fitBounds(layer.getBounds());
    }
  }),

  shouldReset: Ember.observer('geoJSON', function() {
    // Check for when we went from having geoJSON
    // to not having geoJSON.
    // That means the user drew something and deleted it.
    if (!this.get('geoJSON')) {
      this.map.drawnItems.clearLayers();
    }
  }),

  //If center changes, then recenter the map
  changedCenter: Ember.observer('center', function() {
    this.get('map').setView(new L.LatLng(...this.get('center')[0]), this.get('center')[1]);
  }),

});
