import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  //IMPORTANT: Be sure to keep "host" in sync with "queryRoot" in the query service.
  host: 'http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com',
  namespace: '/v1/api'
});
