import Ember from 'ember';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),
  loading: true,

  modelArrived: Ember.observer('model', function() {
    this.fetchShapeJSON();
  }),

  fetchShapeJSON() {
    // Check metadata to confirm that num_shapes falls below
    // arbitrary threshold.
    const meta = this.get('model');
    
    // Until we work out a tiling scheme,
    // don't even try if we have lots of shapes.
    if (meta.numShapes > 500) {
      this.set('giveUp', true);
      this.set('loading', false);
      return;
    }

    // If not too many shapes,
    // attempt to download shape dataset as geoJSON.
    this.get('query').rawShape(meta.datasetName, {}).then(payload => {
      this.set('geoJSON', payload);
      this.set('loading', false);
    }, reason => {
      this.get('notify').error(`Could not fetch map data: ${reason}`);
      this.set('loading', false);
    });

  },

  actions: {
    download: function(type) {
      const name = this.get('model').datasetName;
      this.get('query').rawShape(name, {data_type: type}, true);
    },
    exit: function() {
      this.transitionToRoute('index');
    }
  }



});
