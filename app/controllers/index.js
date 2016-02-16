import Ember from 'ember';

export default Ember.Controller.extend({
  pickedString: null,
  refresh: true,
  // TODO: DRY index and aggregate controllers by sharing submit action
  actions: {
    submit: function(params) {
      this.transitionToRoute('aggregate', {queryParams: params});
      },
    reset: function() {
      // Thanks http://stackoverflow.com/questions/32862134/in-ember-is-there-a-way-to-update-a-component-without-a-full-re-render-route-tr
      this.set('refresh', false);
      const self = this;
      Ember.run.next(() =>
        {self.set('refresh', true);}
      );
    }
  }
});
