module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
    jquery: true,
    qunit: true
  },
  globals: {
    // Browser-default, JQuery and QUnit globals are set by the "env" field above

    // Mirage
    server: true,

    // Leaflet:
    L: true
  },
  rules: {
  }
};
