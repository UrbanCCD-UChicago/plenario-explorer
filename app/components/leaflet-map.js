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
  _layer: null,

  // On first render, create map and add all layers and controls
  didInsertElement() {
    console.log('Init map')
    this.initMap();
    this.putStuffOnMap();
  },

  // On subsequent renders,
  //
  didUpdateAttrs() {
    console.log('Update map');
    this.updateDrawComponent();
  },

  updateDrawComponent() {
    let layer = this.initLayer();
    if (layer) {
      this.map.drawnItems.addLayer(layer);
      this.map.fitBounds(layer.getBounds());
    }
  },

  putStuffOnMap() {
    var layer = this.initLayer();
    console.log(layer);

    if (this.get('isDrawable')) {
      this.initDrawComponent(layer);
    }
    if (layer) {
      console.log('Tryna fit');
      this.map.fitBounds(layer.getBounds());
    }
  },

  initLayer() {
    var geoJSON = this.get('geoJSON');
    console.log(geoJSON);
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
      console.log(layer);
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
      console.log(JSON.stringify(layer.toGeoJSON()));
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
