// This component is essentially impossible to test meaniningfully in an integration test,
// since it depends on manipulating the user's scroll position on the page as a whole.
// If we ever manage to write actual tests, remove the following line:
/* eslint-disable */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | scroll magnet', () => {
  setupComponentTest('scroll-magnet', {
    integration: true,
  });
});
