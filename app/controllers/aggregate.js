import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['obs_date__le', 'obs_date__ge', 'agg'],
  obs_date__le: null,
  obs_date__ge: null,
  agg: null
});
