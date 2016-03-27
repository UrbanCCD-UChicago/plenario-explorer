import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    return this.normalizeMetadataResponse(payload, 'shapeDataset');
  }
});
