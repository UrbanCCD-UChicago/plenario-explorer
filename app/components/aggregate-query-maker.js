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

  defaults: {
    'startDate': moment().subtract(90, 'days').toString(),
    'endDate': moment().toString(),
    'agg': 'week',
    'geoJSON': null
  },

  init() {
    this._super(...arguments);
    this.setDefaults();
  },

  setDefaults() {
    let defaults = this.defaults;
    for (let attr in defaults) {
      let val = this.get(attr);
      if (!val) {
        val = defaults[attr];
      }
      this.set('_' + attr, val);
    }
  },

  actions: {
    //Actions that look up.
    submit() {
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
