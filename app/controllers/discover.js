import Ember from 'ember';
import moment from 'moment';
import dateFormat from '../utils/date-format';

export default Ember.Controller.extend({

  loadingMeta: false,

  aggController: Ember.inject.controller('discover.aggregate'),

  queryParams: ['obs_date__le', 'obs_date__ge','agg', 'location_geom__within', 'center'],

  'obs_date__le': dateFormat(moment()),
  'obs_date__ge': dateFormat(moment().subtract(90, 'days')),
  'agg': 'week',
  'center': 'chicago',
  'location_geom__within': null,

  _resetParams() {
    this.set('obs_date__le', dateFormat(moment()));
    this.set('obs_date__ge', dateFormat(moment().subtract(90, 'days')));
    this.set('agg', 'week');
    this.set('center', 'chicago');
    this.set('location_geom__within', null);
  },

  queryParamsHash: Ember.computed('obs_date__le', 'obs_date__ge',
                                  'agg', 'center', 'location_geom__within', function() {
      return this.getProperties(this.get('queryParams'));
    }),

  queryParamsClone() {
    return Ember.copy(this.get('queryParamsHash'));
  },

  //Central location to define all acceptable values for aggregate-query-maker
  //IDs for cities, their locations and zoom.

  cities: {
    "00default": {label: "Select a city to teleport to it.", location: [41.795509, -87.581916], zoom: 10},
    "chicago": {label: "Chicago", location: [41.795509, -87.581916], zoom: 10},
    "newyork": {label: "New York", location:[40.7268362,-74.0017699], zoom: 10},
    "seattle": {label: "Seattle", location:[47.6076397,-122.3258644], zoom: 11},
    "sanfrancisco": {label: "San Francisco", location:[37.7618864,-122.4406926], zoom: 12},
    "austin": {label: "Austin", location:[30.3075693,-97.7399898], zoom: 10},
    "denver": {label: "Denver", location:[39.7534338,-104.890141], zoom: 11},
    "bristol": {label: "Bristol, UK", location:[51.4590572,-2.5909956], zoom: 11}
  },

  aggOptions: ([
    {id: 'day', label: 'day'},
    {id: 'week', label: 'week'},
    {id: 'month', label: 'month'},
    {id: 'quarter', label: 'quarter'},
    {id: 'year', label: 'year'}
  ]),

  resOptions: ([
    {id: '100', label: '100 meters'},
    {id: '200', label: '200 meters'},
    {id: '300', label: '300 meters'},
    {id: '400', label: '400 meters'},
    {id: '500', label: '500 meters'},
    {id: '1000', label: '1 kilometer'}
  ]),

  //------------- end of central aggregate-query-maker values ---------------//

  _zoomIn() {
    this.set('zoom', true);
    const self = this;
    Ember.run.next(() => {
      self.set('zoom', false);
    });
  },

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
    submit: function() {
      if(this.get('submitCooldown')) {
        console.log("Cooldown active.");
        return;
      }

      // Implement a cooldown on the submit button to
      // prevent double-clicks from reloading the query
      // before a new one begins (resulting in undefined behavior)
      this.set('submitCooldown', true);
      Ember.run.later(this, function(){
        this.set('submitCooldown', false);
      }, 500);

      // Reflect to find if we need to transition,
      if (this._inIndex()) {
        this.transitionToRoute('discover.aggregate');
      }
      // or just reload current model.
      else {
        this.get('aggController').send('submit');
      }
      // Refocus map on user-drawn shape.
      if (this.get('location_geom__within')) {
        this._zoomIn();
      }
    },
    reset: function() {
      if (! this._inIndex()) {
        this.transitionToRoute('index');
      }
      this._resetParams();
      this._resetDatePickers();
    }
  }
});
