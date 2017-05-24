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
    qunit: true,
    embertest: true
  },
  globals: {
    // Browser-default, JQuery, QUnit, and Ember test helper globals are set
    // by the "env" field above

    // Leaflet:
    L: true
  },
  rules: {
    'no-console': 'warn' // We want to avoid printing to console, but they shouldn't make tests fail
  }
};
