import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
  //host: 'http://plenario-app-venusaur.us-east-1.elasticbeanstalk.com',
  host: 'http://plenar.io',
  namespace: '/v1/api'
});
