import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  startDate: moment().subtract(90, 'days').toString(),
  endDate: moment().toString(),
  agg: 'week',
  geoJSON: null,

  refresh: true,

  modelArrived: Ember.observer('model', function() {
    const self = this;
    const notSubset = function(dset) {
      return !dset.id.startsWith('{');
    };

    this.get('model.pointDatasets').then(function(dsets) {
      const notSubsets = dsets.filter(notSubset);
      console.log(notSubsets.length);
      self.set('filteredPointDatasets', notSubsets);
    });

    this.get('model.shapeDatasets').then(function(dsets) {
      const notSubsets = dsets.filter(notSubset);
      self.set('filteredShapeDatasets', notSubsets);
    });
  }),

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
      // Any way to do this through the adapter and serializer?
      window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
    }
  }
});
