/* eslint-disable array-callback-return */
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route('search', function () {
    this.route('results');
  });
  this.route('compare', { path: '/compare/:datasetNames' });
  this.route('view', { path: '/view/:datasetNames' });
});

export default Router;
