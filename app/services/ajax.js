import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'plenario-explorer/config/environment';

export default AjaxService.extend({
  host: ENV.host,
  namespace: '/v1/api',
});
