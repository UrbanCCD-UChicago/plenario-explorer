(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['geojson-validation'] };
  }

  define('geojson-validation', [], vendorModule);
})();
