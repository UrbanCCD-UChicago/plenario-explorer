/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    baseURL: null,
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false
    }
  });

  app.import('bower_components/leaflet/dist/leaflet-src.js');
  app.import('bower_components/leaflet/dist/leaflet.css');
  app.import('bower_components/leaflet-draw/dist/leaflet.draw.js');
  app.import('bower_components/leaflet-draw/dist/leaflet.draw.css');
  app.import('bower_components/bootswatch/simplex/bootstrap.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
    destDir: 'fonts'
  });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {
    destDir: 'fonts'
  });
  app.import('bower_components/urijs/src/URI.js');
  app.import('vendor/leaflet-label/leaflet.label-src.js');
  app.import('vendor/leaflet-label/leaflet.label.css');
  app.import('bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
  app.import('bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
