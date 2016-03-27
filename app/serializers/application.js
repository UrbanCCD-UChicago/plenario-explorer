import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  /*
    Translate snake_cased keys in Plenario JSON responses to camelCase
   */
  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).camelize();
  },
  
  /*
   Take a Plenario /datasets or /shapes response formatted like
   {meta: {...}, objects: [{dataset1},...{datasetN}]}
   and reformat it as a JSONAPI document
   */
  normalizeMetadataResponse(payload, type){
    // Normalize each consituent metadata object
    let normalizeDataset = function(plenarioDataset){
      const normalized = this._normalizeHash(plenarioDataset);
      return {
        "type": type,
        "id": normalized.datasetName,
        "attributes": normalized
      };
    };

    // And place them in the toplevel "data" of the JSONAPI document
    const allDatasets = payload.objects.map(normalizeDataset, this);
    return {
      "data": allDatasets
    };
  },
  
  /*
   Make every snake_cased key camelCased
   */
  _normalizeHash(hash) {
    let normalized = {};
    for(let key in hash) {
      if(hash.hasOwnProperty(key)) {
        const normalizedKey = this.keyForAttribute(key);
        normalized[normalizedKey] = hash[key];
      }
    }
    return normalized;
  }
});
