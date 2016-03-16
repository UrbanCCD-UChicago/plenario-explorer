import ApplicationAdapter from './application';
import QueryConverter from '../utils/query-converter';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  findRecord(store, type, id, snapshot) {
    let qString = QueryConverter.fromId(id).toQueryString();
    let path = 'detail-aggregate/' + qString;
    return this.promiseFromPath(path, id);
  }
});
