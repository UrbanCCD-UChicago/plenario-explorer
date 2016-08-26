import Ember from 'ember';
/* global L */

// Possible parameters:
// geoJSON: JSON.parsed geoJSON for a layer to be displayed.
// layer: preformatted Leaflet layer, ready to display.
// lat, lng, zoom: Leaflet view parameters


export default Ember.Component.extend({

  // Chi-town...our beloved default view.
  lat: 41.795509,
  lng: -87.581916,
  zoom: 10,
  tileURL: 'https://{s}.tiles.mapbox.com/v3/datamade.hn83a654/{z}/{x}/{y}.png',

  center: Ember.computed('lat', 'lng', 'zoom', function () {
    return [[this.get('lat'), this.get('lng')], this.get('zoom')];
  }),

  /**
   * Run side-effectful map setup functions.
   * Override and call super to add custom setup.
   */
  setUpMap() {
    this.addMap();
    this.addTiles();
    this.addLayer();
    const map = this.get('map');
    map.fitBounds(this.get('layer').getBounds());
    map.addLayer(this.get('layer'));
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
    let tiles = L.tileLayer(this.get('tileURL'));
    tiles.addTo(this.get('map'));
  },

  /**
   * Mutate layer attribute before it is added to the map
   * e.g. by making it drawable.
   * Default behavior is transforming geoJSON to Leaflet layer
   * and making it the layer.
   */
  addLayer() {
    if (this.get('geoJSON')) {
      this.set('layer', L.geoJson(this.get('geoJSON')));
    }
    this.get('map').addLayer(this.get('layer'));
  },

  didInsertElement() {
    this._super(...arguments);
    this.setUpMap();
    // Ember.run.scheduleOnce('afterRender', this, function () {
    //   this.setUpMap();
    // });
  }
});



  // drawElements: function() {
  //   var layer = this.initLayer();
  //   if (this.get('isDrawable')) {
  //     // Even if layer is null,
  //     // we still need to make a "hidden" layer
  //     // for the user to draw on.
  //     this.makeDrawableLayer(layer);
  //   }
  //   else if (!!layer) {
  //     // Display an immutable layer
  //     this.map.addLayer(layer);
  //   }
  //
  //   // Whether it's mutable or immutable,
  //   // If we have a layer we should zoom in on it.
  //   if (!!layer) {
  //     this.map.fitBounds(layer.getBounds());
  //   }
  // },
  //
  // createLegend() {
  //   const div = this.get('legendDiv');
  //   if (div) {
  //     const legend = L.control({position: 'bottomright'});
  //     legend.onAdd = function() {
  //       return div;
  //     };
  //     legend.addTo(this.map);
  //   }
  // },

  // initLayer() {
  //   let layer;
  //   // Did the caller supply a layer to display as-is?
  //   let preformatted = this.get('layer');
  //   if (!!preformatted) {
  //     layer = preformatted;
  //   }
  //   else {
  //     // Make a layer out of geoJSON
  //     let geoJSON = this.get('geoJSON');
  //     layer = this.geoJSONtoLayer(geoJSON);
  //   }
  //   return layer;
  // },

  // geoJSONtoLayer(geoJSON) {
  //   // Return valid Leaflet layer or null
  //   if (!geoJSON){
  //     return null;
  //   }
  //   try {
  //     if (typeof(geoJSON) === 'string') {
  //       geoJSON = JSON.parse(geoJSON);
  //     }
  //
  //     if (this.get('changeColor')) {
  //       const selectedIcon = new this.SelectedIcon();
  //       const clicked = this.get('clicked');
  //     }
  //     else if(this.get('displayPopup')) {
  //
  //     }
  //
  //
  //     // Add popups
  //
  //     const onEachFeature = function(feature, layer) {
  //       const props = feature.properties;
  //       if (props && Object.keys(props).length > 0) {
  //         let table = '<table>';
  //         for (const key of Object.keys(props)) {
  //           table += `<tr><td>${key}&nbsp;</td><td>&nbsp;${props[key]}</td></tr>`;
  //         }
  //         table += '</table>';
  //         layer.bindPopup(table);
  //         layer.on({ click: function(marker) {
  //           // Action up.
  //           this.setIcon(selectedIcon);
  //           clicked(marker);
  //         }});
  //       }
  //     };
  //
  //     return L.geoJson(geoJSON, {
  //       onEachFeature: onEachFeature
  //     });
  //   }
  //   catch (e) {
  //     // Wasn't valid GeoJSON
  //     return null;
  //   }
  // },

  // makeDrawableLayer(layer) {
  //   this.addDrawControl(layer);
  //   this.addDrawListeners();
  // },

//   addDrawControl(layer) {
//     // Making the feature group an attribute of the map
//     // so that event handlers that have access to the map
//     // can get at it.
//     this.map.drawnItems = new L.FeatureGroup();
//     if (layer) {
//       this.map.drawnItems.addLayer(layer);
//     }
//     this.map.addLayer(this.map.drawnItems);
//
//     var editOptions = {
//       featureGroup: this.map.drawnItems
//     };
//     if (layer) {
//       editOptions['edit'] = false;
//       editOptions['remove'] = false;
//     }
//
//     let drawControl = new L.Control.Draw({
//       edit: editOptions,
//       draw: {
//         circle: false,
//         marker: false
//       }
//     });
//     this.map.addControl(drawControl);
//   },
//
//   addDrawListeners() {
//     // Only allow the user to draw one vector at a time.
//     this.map.on('draw:created', this.drawCreate);
//     this.map.on('draw:edited', this.drawEdit);
//     this.map.on('draw:drawstart', this.drawDelete);
//     this.map.on('draw:deleted', this.drawDelete);
//
//     // Attach the reporting functions to the map
//     // so that we can call them from the Leaflet event handlers.
//     let self = this;
//     this.map.reportDrawn = function(layer) {
//       self.set('geoJSON', JSON.stringify(layer.toGeoJSON()));
//     };
//     this.map.reportDeleted = function() {
//       self.set('geoJSON', null);
//     };
//   },
//
//   drawCreate(e){
//     this.drawnItems.clearLayers();
//     this.drawnItems.addLayer(e.layer);
//     this.reportDrawn(e.layer);
//   },
//   drawDelete(){
//     this.drawnItems.clearLayers();
//     this.reportDeleted();
//   },
//   drawEdit(e){
//     let layer = e.layers.getLayers()[0];
//     this.reportDrawn(layer);
//   },
//
//   // On subsequent renders,
//   // make sure we're zoomed in on the drawn geom.
//   shouldZoom: Ember.observer('zoom', function() {
//     if (this.get('zoom') && this.map.drawnItems.getLayers().length > 0){
//       let layer = this.map.drawnItems.getLayers()[0];
//       layer.setStyle({color: '#03f'});
//       this.set('autopilot', true);
//       this.map.fitBounds(layer.getBounds());
//     }
//   }),
//
//   shouldReset: Ember.observer('geoJSON', function() {
//     // Check for when we went from having geoJSON
//     // to not having geoJSON.
//     // That means the user drew something and deleted it.
//     if (!this.get('geoJSON')) {
//       this.map.drawnItems.clearLayers();
//     }
//   }),
//
//   //This autopilot flag is an internal signal to updateCenter to determine
//   //whether the map movement was due to the user dragging/scrolling the map
//   //or if it was initiated by an automatic change in center.
//   autopilot: false,
//
//   //If center changes, then recenter the map
//   changedCenter: Ember.observer('center', function() {
//     this.set('autopilot', true);
//     let self = this;
//     self.get('map').setView(new L.LatLng(...self.get('center')[0]), self.get('center')[1]);
//     //Autopilot is stopped after map is done moving. See listeners above.
//   }),
//
//   //Scope here seems a bit different, eh?
//   //It's because it's bound to a map event ('moveend') way up in didInsertElement
//   updateCenter(self) {
//     if(!this.get('autopilot')) {
//       self.sendAction('mapMovedByUser', [[self.map.getCenter().lat, self.map.getCenter().lng], self.map.getZoom()]);
//     }
//   },
// });
