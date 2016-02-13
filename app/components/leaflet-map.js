import Ember from 'ember';
/* global L */

// Expected parameters:
// layer: null for a blank canvas
//        a LeafletLayer if we want to display something
// isDrawable: whether we should enable draw controls
//             to let the user create/mutate `layer`

const lat = 41.880517;
const lng = -87.644061;
const zoom = 10;
const tileURL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

export default Ember.Component.extend({

  // Set up once the div is added to the DOM
  didInsertElement() {
    const map_options = {
      scrollWheelZoom: false,
      tapTolerance: 30,
      minZoom: 1
    };
    this.map = L.map('map', map_options).
                 setView([lat, lng], zoom);
    this.addTiles();
    if (this.get('isDrawable')) {
      this.initDrawComponent();
    }
    var layer = this.get('layer');
    if (layer) {
      layer.addTo(this.map);
      this.map.fitBounds(layer.getBounds());
    }
  },

  addTiles() {
    let tiles = L.tileLayer(tileURL);
    tiles.addTo(this.map);
  },

  initDrawComponent() {
    this.addDrawControl();
    this.addDrawListeners();
  },

  addDrawControl() {
    // Making the feature group an attribute of the map
    // so that event handlers that have access to the map
    // can get at it.
    this.map.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.map.drawnItems);

    let drawControl = new L.Control.Draw({
      edit: {
        featureGroup: this.map.drawnItems
      },
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

    // Propagate the user's drawings up to the controller.
    // Attach the reporting functions to the map
    // so that we can call them from the Leaflet event handlers.
    let self = this;
    this.map.reportDrawn = function(layer) {
      self.set('layer', layer);
    };
    this.map.reportDeleted = function() {
      self.set('layer', null);
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
  }

});
