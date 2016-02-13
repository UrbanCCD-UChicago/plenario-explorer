import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    // namedParam of layer is optional
    // (in case you want a shape on the map from the start)
    const layer = this.get('layer');
    this.layer = layer ? layer : null;
  },

  // Need to set dynamic default dates (today to 90 days ago)
  startDate: '11/12/2015',
  endDate: '02/10/2016',
  agg: 'week',

  actions: {
    submit() {
      var geoJSON = this.layer.toGeoJSON();
      this.get('submit')(geoJSON, this.startDate, this.endDate, this.agg);
    },
    reset() {
      this.get('reset')();
    }
  }
});
