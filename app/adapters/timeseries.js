import ApplicationAdapter from './application';
import QueryConverter from '../utils/query-converter';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    let qString = new QueryConverter().fromId(id).toQueryString();
    let path = '/detail-aggregate/' + qString;
    return this.promiseFromPath(path, id);
  }
});
