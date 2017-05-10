/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'plenario-explorer',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.networkId = 'array_of_things_chicago';
  ENV.defaultNode = '0000001e0610ba72';
  ENV.curationHost = 'http://sensor-curation.s3-website-us-east-1.amazonaws.com';

  if (environment === 'development') {

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV.host = 'http://plenario-private.us-east-1.elasticbeanstalk.com'; // FIXME: dev server

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.host = 'http://plenar.io';
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV['ember-cli-mirage'] = {
      enabled: true,
      directory: 'app/mirage'
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
  ENV.APP.PUSHER.auth = 'https://gm76b1jzz1.execute-api.us-east-1.amazonaws.com/development'; // FIXME: dev server

  return ENV;
};


