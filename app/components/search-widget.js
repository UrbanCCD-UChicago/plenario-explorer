import Ember from 'ember';
import moment from 'npm:moment';
import bboxPolygon from 'npm:@turf/bbox-polygon';

export default Ember.Component.extend({


  aggregationOptions: ['hour', 'day', 'week'],

  startDateAsString: Ember.computed('startDate', {
    get(key) {
      return this.get('startDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value);
      if (momentDate.isValid()) {
        this.set('startDate', momentDate);
        return momentDate.format();
      }
      return false;
    }
  }),

  endDateAsString: Ember.computed('endDate', {
    get(key) {
      return this.get('endDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value);
      if (momentDate.isValid()) {
        this.set('endDate', momentDate);
        return momentDate.format();
      }
      return false;
    }
  }),

  queryAreaAsGeoJson: Ember.computed('currentMapBounds', 'userShapeGeoJson', function () {
    if (this.get('userShapeGeoJson') !== null && this.get('userShapeGeoJson') !== undefined) {
      return this.get('userShapeGeoJson');
    } else if (this.get('currentMapBounds')) {
      return bboxPolygon(
        this.get('currentMapBounds').toBBoxString()
          .split(',')
          .map(coord => Number(coord))
      );
    } else {
      return null;
    }
  }),

  formValues: Ember.computed('startDate', 'endDate', 'aggregateBy', 'queryAreaAsGeoJson', function () {
    const startDateString = this.get('startDate').format();
    const endDateString = this.get('endDate').format();
    const aggregateBy = this.get('aggregateBy');
    const queryAreaAsGeoJsonString = JSON.stringify(this.get('queryAreaAsGeoJson'));
    return { startDateString, endDateString, aggregateBy, queryAreaAsGeoJsonString };
  }),

  actions: {
    submitForm() {
      this.get('onSubmit')(this.get('formValues'));
    },
    resetForm() {
      this.setupInitialValues();
    },
    mapDidMove(event) {
      this.set('currentMapBounds', event.target.getBounds());
    },
    userDidDrawShape(event) {
      this.set('userShapeGeoJson', event.layer.toGeoJSON());
    }
  },

  init() {
    this._super(...arguments);
    this.setupInitialValues();
  },

  setupInitialValues() {
    this.set('startDate', moment().subtract(7, 'days').startOf('day'));
    this.set('endDate', moment().endOf('day'));
    this.set('aggregateBy', 'day');
    this.set('userShapeGeoJson', null);
  },

});
