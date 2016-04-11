import Ember from 'ember';

/**
 * Grabs and caches all dataset metadata.
 */
export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  camelizeHash: function(hash) {
    let normalized = {};
    for(let key in hash) {
      if(hash.hasOwnProperty(key)) {
        const normalizedKey = Ember.String.underscore(key).camelize();
        normalized[normalizedKey] = hash[key];
      }
    }
    return normalized;
  },

  init() {
    this._super(...arguments);
    //console.log('launching queries');
    const eventParams = {
      data: {include_columns: true}
    };
    this.set('events', this.get('ajax').request('/datasets', eventParams));
    this.set('shapes', this.get('ajax').request('/shapes'));
  },

  _getMetadata(type) {
    const self = this;
    return this.get(type).then(function(doc) {
      return doc.objects.map(self.camelizeHash);
    },function(reason) {
      console.log(`Failed to load ${type}. Reason: ${reason}.`);
    });
  },

  /**
   * Return all event metadata objects
   * in the cache.
   * @returns {*}
     */
  allEventMetadata() {
    //const all = this._getMetadata('events');
    //console.log(all);
    return this._getMetadata('events');
  },

  /**
   * Return all shape metadata objects
   * in the cache.
   * @returns {*}
   */
  allShapeMetadata() {
    return this._getMetadata('shapes');
  },

  /**
   * Look through metadata cache
   * and return metadata of event dataset with given name
   * if available. Else return null.
   *
   * @param name
   * @returns {*}
   */
  eventMetadata(name) {
    const allEventDatasets = this._getMetadata('events');
    return this._findDataset(name, allEventDatasets);
  },

  /**
   * Look through metadata cache
   * and return metadata of shape dataset with given name
   * if available. Else return null.
   *
   * @param name
   * @returns {*}
   */
  shapeMetadata(name) {
    const allEventDatasets = this._getMetadata('shapes');
    return this._findDataset(name, allEventDatasets);
  },

  _findDataset(name, datasets) {
    for (const dset of datasets) {
      if (dset.dataset_name === name) {
        return dset;
      }
    }
  },

  /**
   * Return timeseries array
   * embedded within event metadata object.
   *
   * @param name
   * @param params
     */
  timeseries(name, params) {
  },

  /**
   * Return grid response geoJSON.
   *
   * @param name
   * @param params
     */
  grid(name, params) {
    // Return single grid response
  },

  /**
   * Return list of event metadata objects
   * that are within the given time and space bounding box.
   * @param params
     */
  eventCandidates(params) {
    // Return array of event dataset metadata
    // within time and space bounding box.
  },

  /**
   * Return list of shape metadata objects
   * that are within the given space bounding box.
   * @param params
     */
  shapeSubsets(geoJSON) {
  },

  /**
   * return geoJSON of shape dataset
   * @param name
     */
  rawShape(name) {
  }
});
