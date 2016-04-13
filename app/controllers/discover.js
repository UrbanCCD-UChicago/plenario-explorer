import Ember from 'ember';
import moment from 'moment';
import dateFormat from '../utils/date-format';

export default Ember.Controller.extend({
  aggController: Ember.inject.controller('discover.aggregate'),

  queryParams: ['obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within'],
  obs_date__le: dateFormat(moment().toString()),
  obs_date__ge: dateFormat(moment().subtract(90, 'days').toString()),
  agg: 'week',
  location_geom__within: null,

  queryParamsHash: Ember.computed('obs_date__le', 'obs_date__ge', 'agg', 'location_geom__within',
    function() {
      return this.getProperties(this.get('queryParams'));
    }
  ),

  refresh: true,

  _resetParams() {
    this.set('obs_date__le', dateFormat(moment().toString()));
    this.set('obs_date__ge', dateFormat(moment().subtract(90, 'days').toString()));
    this.set('agg', 'week');
    this.set('location_geom__within', null);
  },

  _detailTransition(pageName, datasetName) {
    let params = this.get('queryParams');
    delete params['obs_date__le'];
    delete params['obs_date__ge'];
    params['dataset_name'] = datasetName;
    this.transitionToRoute(pageName, {queryParams: params});
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

  _resetTemplate() {
    // Thanks http://stackoverflow.com/questions/32862134/in-ember-is-there-a-way-to-update-a-component-without-a-full-re-render-route-tr
    this.set('refresh', false);
    const self = this;
    Ember.run.next(() =>
      {self.set('refresh', true);}
    );
  },

  actions: {
    submit: function() {
      // Reflect to find if we need to transition,
      if (this._inIndex()) {
        this.transitionToRoute('discover.aggregate');
        this._resetTemplate();
      }
      // or just reload current model.
      else {
        this.get('aggController').send('submit');
      }

      // Refocus map on user-drawn shape.
      this._zoomIn();
    },
    reset: function() {
      if (this._inIndex()) {
        this._resetParams();
        this._resetTemplate();
      } else {
        this.transitionToRoute('index');
      }
    }
    // navigateToShape: function(name) {
    //   this._detailTransition('shape', name);
    // },
    // navigateToPoint: function(name) {
    //   this._detailTransition('event', name);
    // },
    // downloadShape: function(name, fileType) {
    //   // Open new tab with raw download link.
    //   window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
    // }
  }
});
