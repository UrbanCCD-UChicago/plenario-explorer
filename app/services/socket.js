import Ember from 'ember';


export default Ember.Service.extend({

    // Inject the socket-io service into the object
    io: Ember.inject.service('socket-io'),

    connectionArgs: {},
    serverUrl: 'localhost:8081',

    open() {
        var serverUrl = this.get('serverUrl');
        var connectionArgs = this.get('connectionArgs');
        const socket = this.get('io').socketFor(serverUrl, connectionArgs);
        socket.on('connect', this.onConnect, this);
        socket.on('data', this.onData, this);
    },

    close() {
        const socket = this.get('io').socketFor(this.get('serverUrl'));
        socket.off('connect', this.onConnect);
        socket.off('data', this.onData);
    },

    onConnect() {},
    onData() {}
});
