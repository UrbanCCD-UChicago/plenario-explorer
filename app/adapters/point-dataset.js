import ApplicationAdapter from './application';
import QueryConverter from '../utils/query-converter'

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
    console.log(query);
    const qString = new QueryConverter().fromHash(query).toQueryString();
    let path = '/datasets' + qString;
    console.log(path);
    return this.promiseFromPath(path);
  }
});
