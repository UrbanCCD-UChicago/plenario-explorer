import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
    /**
     * So what's the issue?
     *
     * Updating my data attribute doesn't trigger any changes
     * to the live-chart component!
     */

    io: Ember.inject.service('socket-io'),
    serverUrl: 'localhost:8081',


    // Node identifier? Or node object?
    selectedNode: null,
    // How to model incoming sensor data?
    streamingObservations: Ember.A([]),

    init() {
      this._super(...arguments);
      const socket = this.get('io').socketFor('localhost:8081');

      const appendObservations = function (newObs) {
        const series = this.get('streamingObservations');
        series.pushObject([moment(), newObs.results]);
        this.set('streamingSeries', [{
          'data': series.toArray(),
          'name': ''
        }]);
      };

      socket.on('data', appendObservations, this);

    },

    actions: {
        connect() {
        },

        disconnect() {
        }
    },

});
