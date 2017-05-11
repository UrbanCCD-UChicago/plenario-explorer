import Ember from "ember";
import ENV from "plenario-explorer/config/environment";
export default Ember.Component.extend({
  mapTileUrl: ENV.baseMapTileUrl,

  didReceiveAttrs() {
    this._super(...arguments);
    // Leaflet wants coordinates in [lat, lng] (or [y, x]), our responses have it in [lng, lat]
    this.set('center', this.get('record.geometry.coordinates').slice().reverse());
    // Setting a 0-area maxBound on a Leaflet map locks it to center
    this.set('maxBounds', [this.get('center'), this.get('center')]);
  }
});
