import Ember from 'ember';

export default Ember.Controller.extend({
  refresh: true,
  // TODO: DRY controllers by making base controller
  // with these actions for /aggregate and /index
  actions: {
    submit: function(params) {
      const geoJSON = params.geom;
      delete params.geom;
      this.transitionToRoute('aggregate', geoJSON, {queryParams: params});
      },
    reset: function() {
      // Thanks http://stackoverflow.com/questions/32862134/in-ember-is-there-a-way-to-update-a-component-without-a-full-re-render-route-tr
      console.log('In reset');
      this.set('refresh', false);
      const self = this;
      Ember.run.next(() =>
        {self.set('refresh', true);}
      );
    }
  }
});
