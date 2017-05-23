(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['pusher-js'] };
  }

  define('pusher-js', [], vendorModule);
})();
