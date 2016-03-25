import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  // Current state of Query Maker.
  // Never overwrite parameters that were passed in.
  // These get passed down to nested components for display.
  // They get sent up to the route on submission
  _startDate: null,
  _endDate: null,
  _agg: 'week',
  _geoJSON: null,

  init() {
    //console.log('In aggregate-query-maker init');
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
    this.set('_endDate', endDate);

    let startDate = this.get('startDate');
    if (!startDate) {
      startDate = moment().subtract(90, 'days').toString(); // 90 days ago
    }
    this.set('_startDate', startDate);
    //console.log(startDate);

    let agg = this.get('agg');
    //console.log(agg);
    if (!agg) {
      this.set('_agg', 'week');
      agg = 'week';
      console.log('Set agg');
    }

  },

  actions: {
    //Actions that look up.
    submit() {
      // Need try-except block to show error if geom not provided
      this.get('submit')({
        location_geom__within: this.get('_geoJSON'),
        obs_date__ge: this.get('_startDate'),
        obs_date__le: this.get('_endDate'),
        agg: this.get('_agg')
      });
    },
    reset() {
      this.get('reset')();
    },

    // Actions that pass down.
    changedGeoJSON(geoJSON) {
      //console.log('Set geoJSON to ' + geoJSON);
      this.set('_geoJSON', geoJSON);
    },
    changedStartDate(startDate) {
      //console.log('Set start date to ' + startDate);
      this.set('_startDate', startDate);
    },
    changedEndDate(endDate) {
      //console.log('Set end date to ' + endDate);
      this.set('_endDate', endDate);
    },
    changedAgg(agg) {
      //console.log('Set agg to ' + agg);
      this.set('_agg', agg);
    }
  }
});
