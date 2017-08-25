# Plenar.io Explorer

This is an Ember application which provides a simple interface to the [Plenar.io API](https://github.com/UrbanCCD-UChicago/plenario). The goal is to present an accessible entry point to explore the kinds of data and associations Plenar.io makes possible, rather than wrapping the complete functionality of the API

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

We also strongly recommend installing [Watchman](https://facebook.github.io/watchman/) on macOS/Linux for better live-reloading performance.

## Installation

`git clone https://github.com/UrbanCCD-UChicago/plenario-explorer.git`  
`cd plenario-explorer`  
`yarn install`

## Running / Development

You can start a local development server to see the app as you're working on it. It has live reload enabled, so changes (within the `app/` directory) appear immediately without having to restart the server.

Simply run

`yarn start`

and visit [http://localhost:4200](http://localhost:4200).

### Running Tests

Running the standard test suite on the command line, using PhantomJS:

`yarn test`

To run tests in multiple installed browsers (Chrome, Firefox, etc.) with live-reloading enabled, you can invoke Ember's test command directly:

`yarn test -- --server`

On Travis CI we run a more intensive test suite across multiple browsers, Node versions, and Ember releases. You can run the same comprehensive tests locally (be warned, these take a while without the parallel testing capability of a CI provider).

`yarn testall`

### Running ESLint

The test suite automatically lints all of the application's JavaScript files, but you can also run ESLint as a standalone process.

`yarn lint`  
`yarn lint -- --fix` (to automatically fix common formatting issues)

### Building

`yarn build` (development)

You can also build for a production environment, although for actual deployment this is handled by Travis CI. This is mostly useful because Ember reports the resulting file sizes.

`ember build -- --environment production` (production)

### Deploying

Deployment is handled by automatically by Travis CI.

## Further Reading / Useful Links

### The Plenar.io Project

* [Plenar.io](http://plenar.io)
* [UrbanCCD](http://www.urbanccd.org)
* [Computation Institute at the University of Chicago](https://www.ci.uchicago.edu)
* [Argonne National Laboratory](http://www.anl.gov)

### Ember.js Resources

* [Ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Browser Extensions
  * [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
