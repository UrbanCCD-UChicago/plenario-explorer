import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Controller.extend({
  query: Ember.inject.service(),
  notify: Ember.inject.service(),

  mapTileUrl: ENV.baseMapTileUrl,

  modelArrived: Ember.observer('model', function () {
    this.fetchShapeJSON();
  }),

  fetchShapeJSON() {
    this.set('loading', true);
    this.set('giveUp', false);
    // Check metadata to confirm that num_shapes falls below
    // arbitrary threshold.
    const meta = this.get('model');

    // Until we work out a tiling scheme,
    // don't even try if we have lots of shapes.
    if (meta.numShapes > ENV.maxShapeThreshold) {
      this.set('loading', false);
      this.set('giveUp', true);
      return;
    }

    // If not too many shapes,
    // attempt to download shape dataset as geoJSON.
    this.get('query').rawShape(meta.datasetName, {}).then((payload) => {
      if (payload.features.length <= 0) {
        this.set('loading', false);
        this.set('giveUp', true);
        return;
      }
      this.set('geoJSON', payload);
      this.set('bounds', L.geoJson(payload).getBounds());
      this.set('loading', false);
    }, (reason) => {
      this.get('notify').error(`Could not fetch map data: ${reason}`);
      this.set('loading', false);
    });
  },

  actions: {
    download(type) {
      const name = this.get('model').datasetName;
      this.get('query').rawShape(name, { data_type: type }, true);
    },
    exit() {
      this.transitionToRoute('index');
    },
  },

});
