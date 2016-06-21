import Ember from 'ember';
import Resolver from './resolver';
import "npm:babel-polyfill";
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

/* global L */

let App;

L.Icon.Default.imagePath = 'http://ember-prototype.s3-website-us-east-1.amazonaws.com/assets/images';

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  rootElement: '#ember-app',
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

Ember.onerror = function (error) {
  console.log('GLOBAL ERROR:', error.message);
  window.location = `/error/${error.message}`;  //TODO: Quick and dirty redirect...
                                                //TODO: Need to figure out how to transition to route from here.
};
