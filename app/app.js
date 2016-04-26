import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

/* global L */

let App;

L.Icon.Default.imagePath = '/assets/images';

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  rootElement: '#ember-app',
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
