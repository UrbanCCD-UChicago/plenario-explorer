import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  /*
    Serializes bare /datasets
   */
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataMultiple(payload, 'pointDataset');
  },

  /*
    Serializes filtered /datasets
   */
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataMultiple(payload, 'pointDataset', true);
  },

  /*
    Serializes /datasets?dataset_name=foo
   */
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataSingle(payload, 'pointDataset');
  }
});
