import DS from 'ember-data';

export default DS.Model.extend({
  timeseriesList: DS.hasMany('timeseries', {async: true})
});
