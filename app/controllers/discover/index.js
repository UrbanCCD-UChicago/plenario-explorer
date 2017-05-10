import Ember from "ember";
import moment from "moment";

export default Ember.Controller.extend({
  query: Ember.inject.service(),

  modelArrived: Ember.observer('model', function() {
    const pointDatasets = this.get('model.pointDatasets');
    const withoutSillyTimes = pointDatasets.map(d => {
      const inFuture = moment(d.obsTo).isAfter(moment());
      const inOldenTimes = moment(d.obsTo).isBefore('1899-12-31');
      if (inFuture || inOldenTimes) {
        d.obsFrom = null;
        d.obsTo = null;
      }
      return d;
    });
    this.set('processedPointDatasets', withoutSillyTimes);
  }),

  actions: {
    navigateToNode: function(name) {
      this.transitionToRoute(`/node/${name}`);
    },
    navigateToShape: function(name) {
      this.transitionToRoute(`/shape/${name}`);
    },
    navigateToPoint: function(name) {
      this.transitionToRoute(`/event/${name}`);
    },
    downloadShape: function(name, fileType) {
      this.get('query').rawShape(name, {data_type: fileType}, true);
    }
  }
});

