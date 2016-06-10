[![Build Status](https://travis-ci.org/UrbanCCD-UChicago/plenario-explorer.svg?branch=master)](https://travis-ci.org/UrbanCCD-UChicago/plenario-explorer)
# Plenario Explorer

This is an [Ember](http://emberjs.com/) application that fetches data from the plenar.io API.
Because it only communicates with Plenario through its API, you can run and develop it
without a Plenario backend development environment.
In theory, you could deploy this as a static page.
However, it is meant to be deployed inside of the plenar.io [Flask application](https://github.com/UrbanCCD-UChicago/plenario),
where it is stuffed inside of a div in a Jinja template.

Below are instructions on how to set up your development environment.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

