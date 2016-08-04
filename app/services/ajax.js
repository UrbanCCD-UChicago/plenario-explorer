import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  //IMPORTANT: Be sure to keep "host" in sync with "queryRoot" in the query service.
  host: 'http://plenar.io',
  namespace: '/v1/api'
});
