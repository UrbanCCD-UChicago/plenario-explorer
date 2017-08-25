/* eslint-env node */

/*
 This testem config is intended for use on our continuous integration providers. It tests against 3
 browsers at a time, and fails if one of the specified browsers is missing, because a missing
 launcher indicates something wrong with the CI instance's base configuration.
 */

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 3,
  tap_quiet_logs: true,
  ignore_missing_launchers: false,
  launch_in_ci: [
    'PhantomJS',
    'Chrome',
    'Firefox',
  ],
};
