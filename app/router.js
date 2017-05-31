import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('discover', function () {
    this.route('aggregate');
  });
  this.route('event', { path: '/event/:dataset_name' });
  this.route('shape', { path: '/shape/:dataset_name' });
  this.route('node', { path: '/node/:dataset_name' });
  this.route('datadump', { path: '/datadump' }, function () {
    this.route('download', { path: '/:ticket' });
  });
  this.route('not-found', { path: '/*:path_name' });
  this.route('loading');
  this.route('err', { path: '/error/:error_message' });
  this.route('sensors');
});

export default Router;
