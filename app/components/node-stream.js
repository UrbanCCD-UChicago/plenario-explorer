import Ember from 'ember';

export default Ember.Component.extend({
    nodes: Ember.inject.service('node-meta'),
    socket: Ember.inject.service('socket'),

    actions: {
        connect() {
            var nodes = this.get('nodes');
            console.log("Streaming data for " + nodes.selectedNodes);
            this.get('socket').open({});
        },

        disconnect() {
            this.get('socket').close();
        }
    }
});