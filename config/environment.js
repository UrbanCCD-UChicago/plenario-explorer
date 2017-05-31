/* jshint node: true */

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'plenario-explorer',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  ENV.networkId = 'array_of_things_chicago';
  ENV.defaultNode = '0000001e0610ba72';

  ENV.maxShapeThreshold = 500;

  ENV.defaultMapLat = 41.8781;
  ENV.defaultMapLng = -87.6298;
  ENV.defaultMapZoom = 10;
  ENV.baseMapTileUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
    ENV.host = 'http://plenar.io';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.host = 'http://plenar.io';
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';
    ENV['ember-cli-mirage'] = {
      enabled: true,
      directory: 'app/mirage',
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.host = 'http://plenar.io';
  }

  ENV.APP.PUSHER = {};
  ENV.APP.PUSHER.key = 'c6851f0950381b69a136';
  ENV.APP.PUSHER.auth = 'https://8k1tgwbine.execute-api.us-east-1.amazonaws.com/test/pusher/auth';

  return ENV;
};

