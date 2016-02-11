import DS from "ember-data";

export default DS.RESTAdapter.extend({
  host: 'http://plenar.io/v1/api'
});
