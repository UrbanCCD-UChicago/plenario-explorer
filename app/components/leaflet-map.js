import Ember from 'ember';
/* global L */

export default Ember.Component.extend({
  // Set up once the div is added to the DOM
  didInsertElement() {
    const map_options = {
      scrollWheelZoom: false,
      tapTolerance: 30,
      minZoom: 1
    };
    this.map = L.map('map', map_options).setView([this.get('lat'), this.get('lng')], this.get('zoom'));
    this.addTiles();
    this.initDrawComponent();
  },

  addTiles() {
    let tiles = L.tileLayer(this.get('tileURL'));
    tiles.addTo(this.map);
  },

  initDrawComponent() {
    // Making the feature group an attribute of the map
    // so that event handlers that have access to the map
    // can get at it.
    this.map.drawnItems = new L.FeatureGroup();
    // And then
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

    // Only allow the user to draw one vector at a time.
    this.map.on('draw:created', this.drawCreate);
    this.map.on('draw:edited', this.drawEdit);
    this.map.on('draw:drawstart', this.drawDelete);
    this.map.on('draw:deleted', this.drawDelete);

    // Propagate the user's drawings up to the controller.
    let self = this;
    this.map.reportDrawn = function(layer) {
      self.set('drawnShape', layer.toGeoJSON());
    };
    this.map.reportDeleted = function() {self.set('drawnShape', null);};
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
