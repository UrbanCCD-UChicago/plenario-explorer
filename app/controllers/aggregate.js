import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'geoJSON'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null,
  geoJSON: null,
  zoom: false,

  actions: {
    submit: function(params) {
      console.log(params);
      this.transitionToRoute('aggregate', {queryParams: params});
      this.set('zoom', true);
      const self = this;
      Ember.run.next(() => {
        self.set('zoom', false);
      });
    },

    reset: function () {
      this.transitionToRoute('index');
    },
    navigateToShape: function(name) {
      alert(`Imagine you just transitioned to ${name} shape detail page.`);
    },
    navigateToPoint: function(name) {
      alert(`Imagine you just transitioned to ${name} point detail page.`);
    },
    downloadShape: function(name, fileType) {
      alert(`Downloading shape dataset ${name} as file type ${fileType}.`);
    },
    downloadPoint: function(name, fileType) {
      alert(`Downloading point dataset ${name} as file type ${fileType}.`);
    }
  }
});
