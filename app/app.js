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
  if(error.message.toLowerCase().indexOf("uri")>-1) {
    window.location = `/explore/error/${error.message}`;
  }
	//TODO: Quick and dirty redirect...
	//This will route to, in any case, to either a 404 or error page
	//and will nicely deposit the user back to the explore index.
	//as long as the root is /explore.
  //TODO: Need to figure out how to transition to route from here.
  //TODO: One possible solution is to catch the error in the router
  //and modify the target route.
};
