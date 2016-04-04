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

  _normalizeDataset(plenarioDataset, type, useId) {
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
  },

  /*
   Take a Plenario /datasets or /shapes response formatted like
   {meta: {...}, objects: [{dataset1},...{datasetN}]}
   and reformat it as a JSONAPI document
   */
  normalizeMetadataMultiple(payload, type, useId=false){
    // Normalize each consituent metadata object.

    // Partially apply useId and type
    const normalize = function(dataset) {
      return this._normalizeDataset(dataset, type, useId);
    };

    // Place each object in the toplevel "data" of the JSONAPI document.
    const allDatasets = payload.objects.map(normalize, this);
    return {
      "data": allDatasets
    };
  },

  /*
   Normalize a Plenario /datasets or /shapes response 
   that we expect to have just one record.
   */
  normalizeMetadataSingle(payload, type, useId=false) {
    const dataset = payload.objects[0];
    return {
      "data": this._normalizeDataset(dataset, type, useId)
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
