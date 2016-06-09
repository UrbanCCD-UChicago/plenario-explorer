import Ember from 'ember';
//import moment from 'moment';
//import dateFormat from '../utils/date-format';

export default Ember.Controller.extend({
  // obs_date__ge: dateFormat(moment().subtract(90, 'days').toString()),
  // obs_date__le: dateFormat(moment().toString()),
  // agg: 'week',
  // location_geom__within: null,
  //
  // queryParams: Ember.computed(
  //   'obs_date__le',
  //   'obs_date__ge',
  //   'agg',
  //   'location_geom__within',
  //   function() {
  //     return {
  //       obs_date__ge: this.get('obs_date__ge'),
  //       obs_date__le: this.get('obs_date__le'),
  //       agg: this.get('agg'),
  //       location_geom__within: this.get('location_geom__within')
  //     };
  //   }
  // ),
  //
  // refresh: true,
  //
  // _detailTransition(pageName, datasetName) {
  //   let params = this.get('queryParams');
  //   delete params['obs_date__le'];
  //   delete params['obs_date__ge'];
  //   params['dataset_name'] = datasetName;
  //   this.transitionToRoute(pageName, {queryParams: params});
  // },
  //
  // actions: {
  //   submit: function() {
  //     this.transitionToRoute('aggregate', {queryParams: this.get('queryParams')});
  //   },
  //   reset: function() {
  //     // Thanks http://stackoverflow.com/questions/32862134/in-ember-is-there-a-way-to-update-a-component-without-a-full-re-render-route-tr
  //     this.set('refresh', false);
  //     const self = this;
  //     Ember.run.next(() =>
  //       {self.set('refresh', true);}
  //     );
  //   },
  //
  //   navigateToShape: function(name) {
  //     this._detailTransition('shape', name);
  //   },
  //   navigateToPoint: function(name) {
  //     this._detailTransition('event', name);
  //   },
  //
  //
  //   downloadShape: function(name, fileType) {
  //     // Open new tab with raw download link.
  //     window.open(`http://plenar.io/v1/api/shapes/${name}?data_type=${fileType}`);
  //   }
  // }
});
