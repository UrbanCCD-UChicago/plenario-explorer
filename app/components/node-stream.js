import Ember from 'ember';

export default Ember.Component.extend({
    /**
     * So what's the issue?
     * 
     * Updating my data attribute doesn't trigger any changes
     * to the live-chart component!
     */

    nodeMeta: Ember.inject.service('node-meta'),
    socketService: Ember.inject.service('socket'),

    init() {
        this._super(...arguments);
        this.set('data', Ember.A([]));
        this.set('computedData', Ember.computed(function () {
            this.get('data');
        }));
    },

    didRender() {
        Ember.debug(this.get('data'));
    },

    actions: {
        connect() {
            var connectionArgs = {"node_ids": nodesSelected};
            var nodesSelected = this.get('nodeMeta').selectedNodes;
            var socket = this.get('socketService');

            socket.onConnect = () => {console.log("Connection established!")},
            socket.onData = event => {
                this.get('data').push(event.results);
                Ember.debug(this.get('computedData'));
            };
            socket.connectionArgs = connectionArgs;
            socket.open();
        },

        disconnect() {
            var socket = this.get('socketService');
            socket.close();
        }
    },

});