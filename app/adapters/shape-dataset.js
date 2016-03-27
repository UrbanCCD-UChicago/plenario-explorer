import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findAll (store, type, sinceToken, snapshotRecordArray) {
    const path = '/shapes';
    return this.promiseFromPath(path);
  }
});
