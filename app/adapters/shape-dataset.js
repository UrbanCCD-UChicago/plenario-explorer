import ApplicationAdapter from './application';
import QueryConverter from '../utils/query-converter';

export default ApplicationAdapter.extend({
  findAll (store, type, sinceToken, snapshotRecordArray) {
    const path = '/shapes';
    return this.promiseFromPath(path);
  },

  query(store, type, query){
    const qString = new QueryConverter().fromHash(query).toQueryString();
    let path = '/shapes' + qString;
    return this.promiseFromPath(path);
  }
});
