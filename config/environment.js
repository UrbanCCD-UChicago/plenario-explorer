/* eslint-env node */

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
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    ajax: {
      host: 'http://plenar.io',
      namespace: 'v1/api',
    },

    animation: {
      scrollingBaseDuration: 750, // ms
      stateChangeBaseDuration: 100, // ms
    },

    geography: {
      featuredPlaces: [
        {
          label: 'Bristol, England, United Kingdom',
          bounds: [[51.5444317, -2.7183704], [51.3972838, -2.5104192]],
        },
        {
          label: 'Chicago, IL',
          isDefault: true,
          bounds: [[42.0230219, -87.940101], [41.643919, -87.5239841]],
        },
        {
          label: 'Denver, CO',
          bounds: [[39.9142087, -105.1098845], [39.6143154, -104.5996889]],
        },
        {
          label: 'Detroit, MI',
          bounds: [[42.450232, -83.287959], [42.255192, -82.910423]],
        },
        {
          label: 'Los Angeles, CA',
          bounds: [[34.337306, -118.6681902], [33.7036216, -118.1552947]],
        },
        {
          label: 'New York, NY',
          bounds: [[40.9161785, -74.25909], [40.477399, -73.7001809]],
        },
        {
          label: 'Pittsburgh, PA',
          bounds: [[40.501201, -80.095517], [40.36152, -79.865728]],
        },
        {
          label: 'San Francisco, CA',
          bounds: [[37.9298443, -123.173825], [37.6403143, -122.28178]],
        },
        {
          label: 'Seattle, WA',
          bounds: [[47.7341357, -122.459696], [47.4810022, -122.224433]],
        },
        {
          label: 'Austin, TX',
          bounds: [[30.0986648, -97.938383], [30.516863, -97.561489]],
        },
        {
          label: 'New Orleans, LA',
          bounds: [[29.8654809, -90.14003], [30.1994687, -89.6251763]],
        },
        {
          label: 'Philadelphia, PA',
          bounds: [[39.867005, -75.2802977], [40.1379593, -74.9558314]],
        },
        {
          label: 'Edmonton, Alberta, Canada',
          bounds: [[53.3956433, -113.7136622], [53.7160698, -113.2714783]],
        },
        {
          label: 'Atlanta, GA',
          bounds: [[33.647808, -84.551819], [33.887618, -84.2891076]],
        },
      ],
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // Set production-specific environment variables here
  }

  return ENV;
};
