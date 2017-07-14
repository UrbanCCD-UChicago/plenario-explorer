import Ember from 'ember';
import { mocha } from 'mocha';
import { setResolver } from 'ember-mocha';
import resolver from './helpers/resolver';

setResolver(resolver);

mocha.setup({
  // Mocha's default time settings are too aggressive for how slow Ember is as a baseline
  // while the office internet is terrible:
  timeout: 15000, // (yes it's that bad)
  // timeout: 5000,
  slow: 500,
});


/*
  Mocha lacks the QUnit flag to hide the test container. This recreates something similar,
  but with inverted semantics since the container is big and in the way anyway and we usually
  want it off.
  Adapted from https://github.com/emberjs/ember-mocha/issues/33
 */
if (window.location.search.indexOf('showcontainer') < 0) {
  Ember.$('#ember-testing-container').css({
    visibility: 'hidden',
  });
}
