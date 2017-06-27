import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({

  actions: {
    doSearch(queryParams) {
      this.transitionToRoute('search.results', { queryParams });
    },
    resetSearch() {
      const scrollAnimationTime = ENV.animation.scrollingBaseDuration / 2;
      $('html, body').animate({ scrollTop: 0 }, scrollAnimationTime);
      Ember.run.later(this, 'transitionToRoute', 'search', scrollAnimationTime);
    },
  },

});
