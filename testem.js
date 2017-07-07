/* eslint-env node */

/*
 This testem config is intended for use by developers when they check the project out on their own
 development machines. It will attempt to open whichever browsers are available on the local system,
 but won't error out if it can't find one of the listed ones. That's not something we want to happen
 on a continuous integration platform, where a missing launcher indicates something wrong with the
 CI instance's base configuration.
 */

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: 5,
  tap_quiet_logs: true,
  ignore_missing_launchers: true,
  launch_in_ci: [
    'PhantomJS',
  ],
  launch_in_dev: [
    'PhantomJS',
    'IE9',
    'IE10',
    'IE11',
    'Edge',
    'Chrome',
    'Opera',
    'Firefox',
    'Safari',
  ],
};
