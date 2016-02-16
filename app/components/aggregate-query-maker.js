import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

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
      this.set('endDate', moment().toString());  // today
    }
    let startDate = this.get('startDate');
    if (!startDate) {
      this.set('startDate', moment().subtract(90, 'days').toString());
    }
    console.log(this.get('startDate'))
    let agg = this.get('agg');
    if (!agg) {
      this.set('agg', 'week');
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
        obs_date__ge: this.startDate,
        obs_date__le: this.endDate,
        agg: this.agg
      });
    },
    reset() {
      this.get('reset')();
    }
  }
});
