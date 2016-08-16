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
    data: Ember.A([]),

    init() {
        this._super(...arguments);
        // this.set('data', Ember.A(['foo']));
    },

    actions: {
        connect() {
            var socket = this.get('socketService');
            var data = this.get('data');
            var nodesSelected = this.get('nodeMeta').selectedNodes;
            var connectionArgs = {"node_ids": nodesSelected};

            socket.onData = event => { data.push(event.results); 
                console.log(event);
                console.log(data); };

            socket.connectionArgs = connectionArgs;
            socket.open();
        },

        disconnect() {
            var socket = this.get('socketService');
            socket.close();
        }
    },

});