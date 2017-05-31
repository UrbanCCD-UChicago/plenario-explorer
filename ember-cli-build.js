/* eslint-env node*/
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    rootURL: null,
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false,
      exclude: [
        // Images used by ember-leaflet
        'images/layers-2x.png',
        'images/layers.png',
        'images/marker-icon-2x.png',
        'images/marker-icon.png',
        'images/marker-shadow.png',
        // Additional images used by ember-leaflet-draw
        'images/spritesheet-2x.png',
        'images/spritesheet.png',
        'images/spritesheet.svg',
      ],
    },
  });

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

  // Using vendor-shims
  // shims go here

  // Bower packages
  // TODO: once Ember drops Bower support, these can be brought in through NPM natively)
  const bowDir = 'bower_components';
  // Bootstrap Core
  app.import(`${bowDir}/bootstrap/dist/js/bootstrap.min.js`);
  // app.import(`{bowDir}/bootstrap/dist/css/bootstrap.min.css`); // Disable to use Bootswatch theme
  app.import(`${bowDir}/bootstrap/dist/fonts/glyphicons-halflings-regular.woff`, { destDir: 'fonts' });
  app.import(`${bowDir}/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2`, { destDir: 'fonts' });

  // Bootstrap addons
  app.import(`${bowDir}/bootswatch/simplex/bootstrap.min.css`);
  app.import(`${bowDir}/bootstrap-datepicker/dist/js/bootstrap-datepicker.js`);
  app.import(`${bowDir}/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css`);

  return app.toTree();
};
