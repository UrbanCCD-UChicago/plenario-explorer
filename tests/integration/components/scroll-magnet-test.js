import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describe.skip('Integration | Component | scroll magnet', () => {
  setupComponentTest('scroll-magnet', {
    integration: true,
  });

  const tests = [
    { anim: 0, pageHeight: 5000 },
    { anim: 0, pageHeight: 1000 },
    // { anim: 500, pageHeight: 5000 },
    // { anim: 1000, pageHeight: 5000 },
  ];
  tests.forEach(function (test) {
    it(`scrolls to correct position (animate ${test.anim}ms, page height ${test.pageHeight})`, function () {
      this.set('padDivStyle', Ember.String.htmlSafe(`height: ${test.pageHeight / 2}`));
      this.set('animTime', test.anim);
      this.render(hbs`<div style="{{padDivStyle}}"></div>{{scroll-magnet}}<div style="{{padDivStyle}}"></div>`);

      setTimeout(function () {
        expect($(window).scrollTop()).to.equal(this.$().scrollTop());
      }.bind(this), test.anim + 1);
    });
  });
});
