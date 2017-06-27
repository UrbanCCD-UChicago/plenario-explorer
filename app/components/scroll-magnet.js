import Ember from 'ember';

export default Ember.Component.extend({

  // How long to animate the scroll over. Set to 0 for instant jump.
  animationLength: 1000,

  didRender() {
    const offset = this.$().offset().top;
    $('html, body').animate({
      scrollTop: offset,
    }, this.get('animationLength'));
    $(window).on('unload', () => {
      $(window).scrollTop(offset);
    });
  },

});
