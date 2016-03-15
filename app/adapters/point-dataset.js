import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    const path = `/datasets&dataset_name=${id}`;
    return this.promiseFromPath(path);
  },

  findAll(store, type, sinceToken) {
    const path = '/datasets';
    return this.promiseFromPath(path);
  },

  query(store, type, query){
    const path = '/datasets';
    return this.promiseFromPath(path);
  }
});
