module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
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
    qunit: true,
    embertest: true,
  },
  globals: {
    // Browser, JQuery and QUnit globals are set by the "env" field above

    // Mirage
    server: true,

    // Leaflet:
    L: true,

    // Custom test helpers
    waitFor: true,
  },
  rules: {
    // These eslint-plugin-import rules don't play well with Ember
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',

    // Ember uses this._super and similar constructions
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],

    // Anonymous functions are idiomatic in Ember.computed properties
    'func-names': 'off',

    // Conflicts with the Ember `this._super(...arguments)` idiom
    // TODO: move all our init() calls to init(...args)?
    'prefer-rest-params': 'off',

    // AirBnB disallows all loops anyway, so they don't have this rule
    // relaxed for for-loop declarations. We do use some loops.
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],

    // AirBnB disallows loops, preferring functional programming paradigms.
    // We allow them. TODO: stop allowing them
    'no-restricted-syntax': 'off',

    // Trailing commas in function parameters is not supported in ES2016
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],

    // Functions are hoisted anyway, and it looks nicer to have utility
    // functions at the bottom instead of clutting the top of the file
    'no-use-before-define': ['error', { 'functions': false }],

    // The Ember test boilerplate violates this, so it's not worth manually
    // changing every file
    'import/first': 'off',
  }
};
