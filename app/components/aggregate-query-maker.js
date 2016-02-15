import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  formatDateTime(dt) {
    const date = new Date(dt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.initLayer();
    this.initFilterBox();
  },

  initLayer() {
    // namedParam of layer is optional
    // (in case you want a shape on the map from the start)
    let layer = this.get('layer');
    console.log(layer);
    // Is the layer non-null, but it isn't a Leaflet Layer object?
    if (layer && !layer.addTo) {
      try {
        if (typeof(layer) === 'string') {
          layer = JSON.parse(layer);
        }
        // We should have a raw geoJSON object
        layer = L.geoJson(layer);
      }
      catch (e) {
        // Wasn't valid GeoJSON
        layer = null;
      }
    }

    this.set('layer', layer);
  },

  initFilterBox() {
    // Need to set dynamic default dates (today to 90 days ago)
    let endDate = this.get('endDate');
    if (!endDate) {
      this.set('endDate', moment());  // today
    }
    let startDate = this.get('startDate');
    console.log(startDate)
    console.log(startDate)
    if (!startDate) {
      this.set('startDate', moment().subtract('days', 90));
    }
    let agg = this.get('agg');
    if (!agg) {
      this.set('agg', 'week')
    }
  },

  actions: {
    submit() {
      // Need try-except block to show error if geom not provided
      try {
        var geoJSON = JSON.stringify(this.get('layer').toGeoJSON());
      }
      catch (e) {
        console.log('We need an error popup here.');
        return;
      }
      this.get('submit')({
        geoJSON: geoJSON,
        obs_date__ge: this.formatDateTime(this.startDate),
        obs_date__le: this.formatDateTime(this.endDate),
        agg: this.agg
      });
    },
    reset() {
      this.get('reset')();
    }
  }
});
