import Ember from 'ember';
import moment from 'npm:moment';
import bboxPolygon from 'npm:@turf/bbox-polygon';

export default Ember.Component.extend({


  aggregationOptions: ['day', 'week', 'month', 'quarter', 'year'],
  defaultStartDate: moment().subtract(90, 'days').startOf('day'),
  defaultEndDate: moment().endOf('day'),

  startDateAsString: Ember.computed('startDate', {
    get(/* key */) {
      return this.get('startDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value, ['YYYY-MM-DD', 'M/D/YYYY'], true);
      if (momentDate.isValid()) {
        this.set('startDate', momentDate);
        this.set('isValidStartDate', true);
      } else {
        this.set('isValidStartDate', false);
      }
      return value;
    },
  }),

  endDateAsString: Ember.computed('endDate', {
    get(/* key */) {
      return this.get('endDate').format('YYYY-MM-DD');
    },
    set(key, value) {
      const momentDate = moment(value, ['YYYY-MM-DD', 'M/D/YYYY'], true);
      if (momentDate.isValid()) {
        this.set('endDate', momentDate);
        this.set('isValidEndDate', true);
      } else {
        this.set('isValidEndDate', false);
      }
      return value;
    },
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
    }
    return null;
  }),

  isForwardDateRange: Ember.computed('startDate', 'endDate', function () {
    return this.get('startDate').isSameOrBefore(this.get('endDate'));
  }),

  isNonFutureDateRange: Ember.computed('startDate', function () {
    return this.get('startDate').isSameOrBefore(moment());
  }),

  isValidDateRange: Ember.computed.and(
    'isValidStartDate',
    'isValidEndDate',
    'isForwardDateRange',
    'isNonFutureDateRange'
  ),

  formValues: Ember.computed('startDate', 'endDate', 'aggregateBy', 'queryAreaAsGeoJson', function () {
    const startDate = this.get('startDate').format('YYYY-MM-DD');
    const endDate = this.get('endDate').format('YYYY-MM-DD');
    const aggregateBy = this.get('aggregateBy');
    const withinArea = JSON.stringify(this.get('queryAreaAsGeoJson'));
    return { startDate, endDate, aggregateBy, withinArea };
  }),

  actions: {
    submitForm() {
      this.get('onSubmit')(this.get('formValues'));
    },
    resetForm() {
      this.setupInitialValues();
      this.get('onReset')();
    },
    mapDidMove(event) {
      this.set('currentMapBounds', event.target.getBounds());
    },
    userDidDrawShape(event) {
      this.set('userShapeGeoJson', event.layer.toGeoJSON());
    },
  },

  init() {
    this._super(...arguments);
    this.setupInitialValues();
  },

  setupInitialValues() {
    this.set('startDate', this.get('defaultStartDate'));
    this.set('endDate', this.get('defaultEndDate'));
    this.set('isValidStartDate', this.get('startDate').isValid());
    this.set('isValidEndDate', this.get('endDate').isValid());
    this.set('aggregateBy', 'day');
    this.set('userShapeGeoJson', null);
  },

});
