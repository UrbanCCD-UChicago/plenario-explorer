import Ember from 'ember';
import moment from 'moment';
import dateFormat from '../utils/date-format';

export default Ember.Controller.extend({

  loadingMeta: false,

  notify: Ember.inject.service(),
  aggController: Ember.inject.controller('discover.aggregate'),

  queryParams: ['center', 'obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within'],

  obs_date__le: dateFormat(moment()),
  obs_date__ge: dateFormat(moment().subtract(90, 'days')),
  agg: 'week',
  center: 'default',
  location_geom__within: null,

  _resetParams() {
    this.set('obs_date__le', dateFormat(moment()));
    this.set('obs_date__ge', dateFormat(moment().subtract(90, 'days')));
    this.set('agg', 'week');
    this.set('center', 'default');
    this.set('location_geom__within', null);
  },

  queryParamsHash: Ember.computed('obs_date__le', 'obs_date__ge',
                                  'agg', 'center', 'location_geom__within', function () {
                                    return this.getProperties(this.get('queryParams'));
                                  }),

  queryParamsClone() {
    return Ember.copy(this.get('queryParamsHash'));
  },

  // Central location to define all acceptable values for aggregate-query-maker
  // IDs for cities, their display names, and bounds (usually city limits)
  // City bounding boxes determined via https://www.mapdevelopers.com/geocode_bounding_box.php
  cities: {
    default: {
      // "Cities" named "default" are not shown to the user
      // This is a copy of Chicago
      bounds: [
        [42.023131, -87.940267], // NW corner
        [41.644335, -87.523661], // SE corner
      ],
      location: [41.795509, -87.581916],
      zoom: 10,
    },
    chicago: {
      label: 'Chicago, IL',
      bounds: [
        [42.023131, -87.940267], // NW corner
        [41.644335, -87.523661], // SE corner
      ],
      location: [41.795509, -87.581916],
      zoom: 10,
    },
    newyork: {
      label: 'New York, NY',
      bounds: [
        [40.917577, -74.259090], // NW corner
        [40.477399, -73.700272], // SE corner
      ],
      location: [40.7268362, -74.0017699],
      zoom: 10,
    },
    seattle: {
      label: 'Seattle, WA',
      bounds: [
        [47.734140, -122.459696],
        [47.491912, -122.224433],
      ],
      location: [47.6076397, -122.3258644],
      zoom: 10,
    },
    sanfrancisco: {
      label: 'San Francisco, CA',
      bounds: [
        [37.929820, -123.173825], // NW corner (yes, the city limits DO include those tiny islands)
        [37.639830, -122.281780], // SE corner
      ],
      location: [37.7618864, -122.4406926],
      zoom: 12,
    },
    austin: {
      label: 'Austin, TX',
      bounds: [
        [30.516863, -97.938383], // NW corner
        [30.098659, -97.568420], // SE corner
      ],
      location: [30.3075693, -97.7399898],
      zoom: 10,
    },
    denver: {
      label: 'Denver, CO',
      bounds: [
        [39.914247, -105.109927], // NW corner
        [39.614430, -104.600296], // SE corner
      ],
      location: [39.7534338, -104.890141],
      zoom: 11,
    },
    bristol: {
      label: 'Bristol, England, UK',
      bounds: [
        [51.544433, -2.730516], // NW corner
        [51.392545, -2.450902], // SE corner
      ],
      location: [51.4590572, -2.5909956],
      zoom: 11,
    },
    atlanta: {
      label: 'Atlanta, GA',
      bounds: [
        [33.647808, -84.551819],
        [33.887618, -84.2891076],
      ],
      location: [33.748998, -84.388113],
      zoom: 10,
    },
  },

  aggOptions: ([
    { id: 'day', label: 'day' },
    { id: 'week', label: 'week' },
    { id: 'month', label: 'month' },
    { id: 'quarter', label: 'quarter' },
    { id: 'year', label: 'year' },
  ]),

  resOptions: ([
    { id: '100', label: '100 meters' },
    { id: '200', label: '200 meters' },
    { id: '300', label: '300 meters' },
    { id: '400', label: '400 meters' },
    { id: '500', label: '500 meters' },
    { id: '1000', label: '1 kilometer' },
  ]),

  // ------------- end of central aggregate-query-maker values ---------------//

  // _zoomIn() {
  //   this.set('zoom', true);
  //   const self = this;
  //   Ember.run.next(() => {
  //     self.set('zoom', false);
  //   });
  // },

  _resetDatePickers() {
    this.set('override', true);
    Ember.run.next(() => {
      this.set('override', false);
    });
  },

  _inIndex() {
    // Thanks: https://gist.github.com/eliotsykes/8954cf64fcd0df16f519
    return Ember.getOwner(this).lookup('controller:application').currentPath === 'discover.index';
  },

  actions: {
    submit() {
      if (this.get('submitCooldown')) {
        this.get('notify').info('Cooldown active. Please wait a few seconds between query submissions.');
        return;
      }

      // Implement a cooldown on the submit button to
      // prevent double-clicks from reloading the query
      // before a new one begins (resulting in undefined behavior)
      this.set('submitCooldown', true);
      Ember.run.later(this, function () {
        this.set('submitCooldown', false);
      }, 500);

      // Reflect to find if we need to transition,
      // or just reload current model.
      if (this._inIndex()) {
        this.transitionToRoute('discover.aggregate');
      } else {
        this.get('aggController').send('submit');
      }
      // Refocus map on user-drawn shape.
      // if (this.get('location_geom__within')) {
      //   this._zoomIn();
      // }
    },
    reset() {
      if (!this._inIndex()) {
        this.transitionToRoute('index');
      }
      this._resetParams();
      this._resetDatePickers();
    },
  },
});
