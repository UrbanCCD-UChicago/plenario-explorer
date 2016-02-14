import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('aggregate', {path: '/aggregate/:geojson'});
  this.route('points');
});

export default Router;
