import Ember from 'ember';
import moment from 'moment';
import dateFormat from '../utils/date-format';

export default Ember.Controller.extend({
  aggController: Ember.inject.controller('discover.aggregate'),

  queryParams: {
    'obs_date__le': dateFormat(moment().toString()),
    'obs_date__ge': dateFormat(moment().subtract(90, 'days').toString()), 
    'agg': 'week',
    'location_geom__within': null
  },

  _resetParams() {
    this.set('obs_date__le', dateFormat(moment().toString()));
    this.set('obs_date__ge', dateFormat(moment().subtract(90, 'days').toString()));
    this.set('agg', 'week');
    this.set('location_geom__within', null);
  },

  _zoomIn() {
    this.set('zoom', true);
    const self = this;
    Ember.run.next(() => {
      self.set('zoom', false);
    });
  },

  _inIndex() {
    // Thanks: https://gist.github.com/eliotsykes/8954cf64fcd0df16f519
    return Ember.getOwner(this).lookup('controller:application').currentPath === 'discover.index';
  },

  actions: {
    submit: function() {
      // Reflect to find if we need to transition,
      if (this._inIndex()) {
        this.transitionToRoute('discover.aggregate');
      }
      // or just reload current model.
      else {
        this.get('aggController').send('submit');
      }
      // Refocus map on user-drawn shape.
      this._zoomIn();
    },
    reset: function() {
      if (! this._inIndex()) {
        this.transitionToRoute('index');
      }
      this._resetParams();
    }
  }
});
