import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('aggregate');
  this.route('points');
  this.route('display', {path: 'display/:dataset_name'});
  this.route('event');
  this.route('loading');
});

export default Router;
