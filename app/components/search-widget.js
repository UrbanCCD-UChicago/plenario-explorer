import Ember from 'ember';
import moment from 'npm:moment';
import bboxPolygon from 'npm:@turf/bbox-polygon';
import ENV from 'plenario-explorer/config/environment';

export default Ember.Component.extend({

  aggregationOptions: ['day', 'week', 'month', 'quarter', 'year'],
  defaultStartDate: moment().subtract(90, 'days').startOf('day'),
  defaultEndDate: moment().endOf('day'),

  mapCenter: [41.889839, -87.623143],
  mapZoom: 10,
  teleportCities: ENV.geography.featuredCities.sortBy('label'),

  userPassedShapeInUrl: Ember.observer('predrawnShapeGeoJson', function () {
    // If we get passed an existing shape, pretend it was drawn by the user
    const predrawnShape = this.get('predrawnShapeGeoJson');
    if (predrawnShape) {
      this.set('predrawnShapeGeoJson', null);
      this.set('userShapeGeoJson', predrawnShape);
      this.zoomToBounds(L.geoJSON(predrawnShape).getBounds());
    }
  }),

  userChoseJumpTarget: Ember.observer('jumpToBounds', function () {
    let targetBounds = this.get('jumpToBounds');
    if (!targetBounds) {
      return;
    }

    if (Array.isArray(targetBounds)) {
      targetBounds = L.latLngBounds(targetBounds);
    }
    Ember.run.once(this, 'zoomToBounds', targetBounds);
    Ember.run.once(() => {
      $('#teleport-control option:selected').prop('selected', false);
      $('#teleport-control option:first').prop('selected', 'selected');
    });
  }),

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
    mapDidLoad(event) {
      this.set('leafletMap', event.target);
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
    this.setProperties({
      startDate: this.get('defaultStartDate'),
      endDate: this.get('defaultEndDate'),
      isValidStartDate: this.get('defaultStartDate').isValid(),
      isValidEndDate: this.get('defaultEndDate').isValid(),
      aggregateBy: 'day',
      userShapeGeoJson: null,
    });
  },

  zoomToBounds(bounds) {
    const targetZoom = this.get('leafletMap').getBoundsZoom(bounds);
    const targetCenter = bounds.getCenter();
    this.set('mapCenter', targetCenter);
    this.set('mapZoom', targetZoom);
    // This extra, very un-Ember-like step works around an issue where changing both the map center
    // and zoom simultaneously behaves erratically
    this.get('leafletMap').fitBounds(bounds);
  },

});
