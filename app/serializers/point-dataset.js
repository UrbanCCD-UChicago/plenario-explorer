import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  /*
    Serializes bare /datasets
   */
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataResponse(payload, 'pointDataset');
  },

  /*
    Serializes filtered /datasets
   */
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType){
    return this.normalizeMetadataResponse(payload, 'pointDataset', true);
  }
});
