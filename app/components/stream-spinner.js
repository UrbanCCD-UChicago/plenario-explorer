import Ember from 'ember';
// import moment from 'moment';

export default Ember.Component.extend({
  didTimeOut: false,

  init() {
    const halfMinInMs = 30 * 1000;
    Ember.run.later(() => this.set('didTimeOut', true), halfMinInMs);
    this._super(...arguments);
  },

  streamArrays: Ember.computed('streams', function () {
    return Object.values(this.get('streams')).mapBy('stream');
  }),

  dataArrived: Ember.computed('streamArrays.@each.[]', function () {
    return this.get('streamArrays').some(s => s && s.length > 0);
  }),
});
