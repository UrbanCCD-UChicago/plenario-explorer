import DS from 'ember-data';
import Ember from 'ember';
import QueryConverter from '../utils/query-converter';

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
  normalizeMetadataResponse(payload, type, useId=false){
    // Normalize each consituent metadata object.
    let normalizeDataset = function(plenarioDataset){
      const normalized = this._normalizeHash(plenarioDataset);
      let id;
      if (useId) {
        // If the adapter has inserted an id, use it
        id = normalized.id;
        // and remove it from the attributes hash.
        delete normalized.id;
      }
      else {
        // Otherwise just use datasetName
        id = normalized.datasetName;
      }
      return {
        "type": type,
        "id": id,
        "attributes": normalized
      };
    };

    // Place each object in the toplevel "data" of the JSONAPI document.
    console.log(payload);
    const allDatasets = payload.objects.map(normalizeDataset, this);
    return {
      "data": allDatasets
    };
  },

  /*
   Uniquely identify the subset of a dataset we're viewing
   by baking the query parameters used to create the subset
   into the ID.
  */
  _makeId(datasetName, params){
    params['dataset_name'] = datasetName;
    return new QueryConverter().fromHash(params).toId();
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
