import Ember from 'ember';

export default Ember.Controller.extend({
  refresh: true,
  actions: {
    submit: function(params) {
      console.log(params);
      this.transitionToRoute('aggregate', {queryParams: params});
      },
    reset: function() {
      // Thanks http://stackoverflow.com/questions/32862134/in-ember-is-there-a-way-to-update-a-component-without-a-full-re-render-route-tr
      this.set('refresh', false);
      const self = this;
      Ember.run.next(() =>
        {self.set('refresh', true);}
      );
    },
    navigateToShape: function(name) {
      alert(`Imagine you just transitioned to ${name} shape detail page.`);
    },
    navigateToPoint: function(name) {
      alert(`Imagine you just transitioned to ${name} point detail page.`);
    }
  }
});
