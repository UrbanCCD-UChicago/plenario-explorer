module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'airbnb-base'
  ],
  env: {
    browser: true,
    es6: true,
    jquery: true,
    mocha: true,
  },
  globals: {
    // Browser, JQuery and Mocha globals are set by the "env" field above

    // Mirage
    server: true,

    // Leaflet:
    L: true
  },
  rules: {
    // These eslint-plugin-import rules don't play well with Ember
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',

    // Trailing commas in function parameters is not supported in ES2016
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],

    // Anonymous functions are idiomatic in Ember.computed properties
    'func-names': 'off',

    // Ember uses this._super and similar constructions
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],

    // Functions are hoisted anyway, and it looks nicer to have utility
    // functions at the bottom instead of cluttering the top of the file
    'no-use-before-define': ['error', { 'functions': false }],
  }
};
