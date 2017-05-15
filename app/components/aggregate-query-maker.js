import Ember from "ember";
import ENV from "plenario-explorer/config/environment";

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),

  baseMapTileUrl: ENV.baseMapTileUrl,

  drawOptions: {
    'rectangle': true,
    'polyline': false,
    'polygon': false,
    'circle': false,
    'marker': false
  },

  init() {
    this._super(...arguments);
    if(this.get('center'))
    {
      if(this.get('center') in this.get('cities'))
      {
        // Translate an initial location to coordinates
        // 'centerCoords' is the raw-coordinates from of the human-readable 'center'
        // 'centerZoom' is the raw zoom level from the human-readable 'center'
        this.set('centerCoords', this.get(`cities.${this.get('center')}.location`));
        this.set('centerZoom',   this.get(`cities.${this.get('center')}.zoom`));
      } else if (this.get('center').split(',').length === 3) {
        let splits = this.get('center').split(',');
        this.set('centerCoords', [parseFloat(splits[0]), parseFloat(splits[1])]);
        this.set('centerZoom',   parseFloat(splits[2]));
      } else {
        this.get('notify').warning(`Unknown city "${this.get('center')}". Try selecting a city from the "Center map on" menu.`);
        this.set('center', 'chicago');
      }
    }
    this.set('teleportState', {center: this.get('center')});
  },

  cities: {},

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

  didUpdateAttrs() {
    this.set('teleportState.center', this.get('center'));
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

  //If the 'center' query parameter changes, then recenter the map
  changedCenter: Ember.observer('teleportState.center', function() {
    const city = this.get('teleportState.center');
    this.set('center', this.get('teleportState.center'));
    if(city in this.get('cities')) {
      this.set('centerCoords', this.get(`cities.${city}.location`));
      this.set('centerZoom',   this.get(`cities.${city}.zoom`));
    }
  }),

  actions: {
    //Collapse the opened introduction without refreshing the page.
    dismissIntro(){
      $("#collapse-intro").collapse("hide");
    },
    mapMovedByUser(newcenter){
      let self = this;
      Ember.run.next(function () {
        if (self.isDestroyed) { return; } //Workaround to fix testing
        self.set('center', newcenter);
      });
    },
    updateQueryGeoJSON(event) {
      this.ensureSingleDrawnFeature(event);
      this.set('geoJSON', JSON.stringify(event.layer.toGeoJSON()));
    }
  }

});
