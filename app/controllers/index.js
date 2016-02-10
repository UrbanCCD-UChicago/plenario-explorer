import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 41.880517,
  lng: -87.644061,
  zoom: 10,
  tileURL: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  // GeoJSON representation
  drawnShape: null,
  shapeSubmitted: false,
  startDate: '11/12/2015',
  endDate: '02/10/2016'
});
