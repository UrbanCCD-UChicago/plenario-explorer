import Ember from 'ember';

export default Ember.Component.extend({

  // How long to animate the scroll over. Set to 0 for instant jump.
  animationLength: 1000,

  didRender() {
    $('html, body').animate({
      scrollTop: this.$().offset().top,
    }, this.get('animationLength'));
  },

});
