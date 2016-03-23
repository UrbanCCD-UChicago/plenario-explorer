import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: function(attr, method) {
    //console.log('In the hook;');
    return Ember.String.underscore(attr).camelize();
  }
});
