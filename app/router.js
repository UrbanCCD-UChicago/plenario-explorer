import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('discover', function() {
    this.route('aggregate');
  });
  this.route('event', {path: '/event/:dataset_name'});
  this.route('shape', {path: '/shape/:dataset_name'});
  this.route('loading');
});

export default Router;
