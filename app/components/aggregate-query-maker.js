import Ember from 'ember';

export default Ember.Component.extend({
  // Need to set dynamic default dates (today to 90 days ago)
  startDate: '02/01/2016',
  endDate: '02/10/2016',
  agg: 'week',

  formatDateTime(dt) {
    const date = new Date(dt);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
  },

  didReceiveAttrs() {
    this._super(...arguments);
    // namedParam of layer is optional
    // (in case you want a shape on the map from the start)
    const layer = this.get('layer');
    this.set('layer', layer ? layer : null);
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
        geom: geoJSON,
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
