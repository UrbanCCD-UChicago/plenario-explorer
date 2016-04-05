import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataMultiple(payload, 'shapeDataset');
  },
  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType){
    return this.normalizeMetadataSingle(payload, 'shapeDataset', true);
  }
});
