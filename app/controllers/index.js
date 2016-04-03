import Ember from 'ember';
import QueryConverter from '../utils/query-converter';

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
      // transitionTo(...)
      alert(`Imagine you just transitioned to ${name} shape detail page.`);
    },
    navigateToPoint: function(name) {
      // transitionTo(...)
      alert(`Imagine you just transitioned to ${name} point detail page.`);
    },
    downloadShape: function(name, fileType) {
      // Open new tab with raw download link.
      //console.log(`${name} ${fileType}`);
      // Any way to do this through the adapter and serializer?
      window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
    }
  }
});
