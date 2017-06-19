import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({

  host: 'http://plenar.io',
  namespace: 'v1/api',

});
