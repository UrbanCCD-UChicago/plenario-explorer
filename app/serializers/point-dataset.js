import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    var self = this;

    var normalizeHash = function(hash) {
      let normalized = {};
      for(let key in hash) {
        if(hash.hasOwnProperty(key)) {
          const normalizedKey = self.keyForAttribute(key);
          normalized[normalizedKey] = hash[key];
        }
      }
      return normalized;
    };

    let jsonAPIFromDataset = function(plenarioDataset) {
      //console.log(plenarioDataset);
      const normalized = normalizeHash(plenarioDataset);
      console.log(normalized);
      return {
        "type": "point-dataset",
        "id": normalized.datasetName,
        "attributes": normalized
      };
    };

    /*
     Expected AJAX payload is
     {meta: {...}, objects: [{dataset1},...{datasetN}]}
     */
    const allDatasets = payload.objects.map(jsonAPIFromDataset);
    return {
      "data": allDatasets
    };
  }
});
