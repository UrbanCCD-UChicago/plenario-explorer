import Ember from 'ember';
/* global L */

// Expected parameters:
// geoJSON: geoJSON for a layer to be displayed
// isDrawable: whether we should enable draw controls
//             to let the user create/mutate `layer`

const lat = 41.880517;
const lng = -87.644061;
const zoom = 10;
const tileURL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

export default Ember.Component.extend({
  // Leaflet layer that should be displayed.
  _layer: null,

  // On first render, create map, add layer, and add controls
  didInsertElement() {
    this.initMap();
    var layer = this.initLayer();
    if (this.get('isDrawable')) {
      this.initDrawComponent(layer);
    }
    if (layer) {
      this.map.fitBounds(layer.getBounds());
    }
    // Consider factoring out layer addition
    // into common helper
  },

  // On subsequent renders,
  // make sure we're zoomed in on the drawn geom.
  didUpdateAttrs() {
    this.updateDrawComponent();
  },

  updateDrawComponent() {
    let layer = this.initLayer();
    if (layer) {
      this.map.drawnItems.addLayer(layer);
      this.map.fitBounds(layer.getBounds());
    }
  },

  initLayer() {
    var geoJSON = this.get('geoJSON');
    var layer = this.geoJSONtoLayer(geoJSON);
    this.set('_layer', layer);
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
      // We should have a raw geoJSON object
      return L.geoJson(geoJSON);
    }
    catch (e) {
      // Wasn't valid GeoJSON
      return null;
    }
  },

  initMap() {
    const map_options = {
      scrollWheelZoom: false,
      tapTolerance: 30,
      minZoom: 1
    };
    this.map = L.map('map', map_options).
    setView([lat, lng], zoom);
    this.addTiles();
  },

  addTiles() {
    let tiles = L.tileLayer(tileURL);
    tiles.addTo(this.map);
  },

  initDrawComponent(layer) {
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

    // Propagate the user's drawings up to the containing component.
    // Attach the reporting functions to the map
    // so that we can call them from the Leaflet event handlers.
    let self = this;
    this.map.reportDrawn = function(layer) {
      self.set('_layer', layer);
      self.get('changedJSON')(JSON.stringify(layer.toGeoJSON()));
    };
    this.map.reportDeleted = function() {
      self.set('_layer', null);
      self.get('changedJSON')(null);
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
