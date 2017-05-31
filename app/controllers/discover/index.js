import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),

  modelArrived: Ember.observer('model', function () {
    const pointDatasets = this.get('model.pointDatasets');
    const withoutSillyTimes = pointDatasets.map((d) => {
      const inFuture = moment(d.obsTo).isAfter(moment());
      const inOldenTimes = moment(d.obsTo).isBefore('1899-12-31');
      if (inFuture || inOldenTimes) {
        /* eslint-disable no-param-reassign */
        d.obsFrom = null;
        d.obsTo = null;
        /* eslint-enable no-param-reassign */
      }
      return d;
    });
    this.set('processedPointDatasets', withoutSillyTimes);
  }),

  actions: {
    navigateToNode(name) {
      this.transitionToRoute(`/node/${name}`);
    },
    navigateToShape(name) {
      this.transitionToRoute(`/shape/${name}`);
    },
    navigateToPoint(name) {
      this.transitionToRoute(`/event/${name}`);
    },
    downloadShape(name, fileType) {
      this.get('query').rawShape(name, { data_type: fileType }, true);
    },
  },
});

