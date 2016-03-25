import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  /*
    Make every snake_cased key camelCased
   */
  normalizeHash(hash) {
    let normalized = {};
    for(let key in hash) {
      if(hash.hasOwnProperty(key)) {
        const normalizedKey = this.keyForAttribute(key);
        normalized[normalizedKey] = hash[key];
      }
    }
    return normalized;
  },

  /*
    Translate a Plenario dataset (an object from /datasets)
    into a JSONAPI object.
   */
  jsonAPIFromDataset(plenarioDataset) {
    const normalized = this.normalizeHash(plenarioDataset);
    return {
      "type": "point-dataset",
      "id": normalized.datasetName,
      "attributes": normalized
    };
  },

  /*
    Take a Plenario /datasets response formatted like
   {meta: {...}, objects: [{dataset1},...{datasetN}]}
   and reformat it as a JSONAPI document
   */
  normalizeDatasetsResponse(store, primaryModelClass, payload, id, requestType){
    const allDatasets = payload.objects.map(this.jsonAPIFromDataset, this);
    return {
      "data": allDatasets
    };
  },

  /*
    Serializes bare /datasets
   */
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeDatasetsResponse(...arguments);
  },

  /*
    Serializes filtered /datasets
   */
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType){
    return this.normalizeDatasetsResponse(...arguments);
  }
});
