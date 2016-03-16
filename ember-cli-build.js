/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/leaflet/dist/leaflet.js');
  app.import('bower_components/leaflet/dist/leaflet.css');
  app.import('bower_components/leaflet-draw/dist/leaflet.draw.js');
  app.import('bower_components/leaflet-draw/dist/leaflet.draw.css');
  app.import('bower_components/bootswatch/simplex/bootstrap.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/datatables.net/js/jquery.dataTables.js');
  app.import('bower_components/datatables.net-bs/js/dataTables.bootstrap.js');
  app.import('bower_components/datatables.net-bs/css/dataTables.bootstrap.css');
  app.import('bower_components/urijs/src/URI.js');
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
