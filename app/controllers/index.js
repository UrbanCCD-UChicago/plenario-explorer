import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 41.880517,
  lng: -87.644061,
  zoom: 10,
  tileURL: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  drawnShape: null
});
