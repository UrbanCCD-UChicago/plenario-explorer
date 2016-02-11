import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findAll (store, type, sinceToken, snapshotRecordArray) {
    let url = this.host + '/shapes';
    return this.ajax(url);
  }
});
