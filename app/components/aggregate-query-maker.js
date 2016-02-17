import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  // Current state of Query Maker.
  // Never overwrite parameters that were passed in.
  _startDate: null,
  _endDate: null,
  _agg: null,
  _geoJSON: null,

  init() {
    console.log('In didReceiveAttrs');
    this._super(...arguments);
    this.initLayer();
    this.initFilterBox();
  },

  // TODO: DRY out copying/defaulting in initLayer and initFilterBox.
  // Gotta be an Ember way to do it.
  initLayer() {
    // Copy parameter geoJSON to private attribute
    // If not given, set to null.
    let geoJSON = this.get('geoJSON');
    if (!geoJSON) {
      geoJSON = null;
    }
    this.set('_geoJSON', geoJSON);
  },

  initFilterBox() {
    // Copy parameters startDate, endDate, and agg
    // to private attributes.
    // If not given, set private attributes to defaults.

    let endDate = this.get('endDate');
    if (!endDate) {
      endDate = moment().toString(); // today
    }
    this.set('endDate', endDate);

    let startDate = this.get('startDate');
    if (!startDate) {
      startDate = moment().subtract(90, 'days').toString(); // 90 days ago
    }
    this.set('startDate', startDate);

    let agg = this.get('agg');
    if (!agg) {
      agg = 'week';
    }
    this.set('agg', agg)
  },

  actions: {
    submit() {
      // Need try-except block to show error if geom not provided
      this.get('submit')({
        geoJSON: this._geoJSON,
        obs_date__ge: this._startDate,
        obs_date__le: this._endDate,
        agg: this._agg
      });
    },
    reset() {
      this.get('reset')();
    },
    changedJSON(geoJSON) {
      console.log('Changing geoJSON');
      this.set('_geoJSON', geoJSON);
    }
  }
});
