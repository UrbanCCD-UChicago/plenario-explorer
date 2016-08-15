import Ember from 'ember';


export default Ember.Service.extend({

    // Inject the socket-io service into the object
    io: Ember.inject.service('socket-io'),
    serverUrl: 'localhost:8081',

    /**
     * Open a connection to the socket.io server with connection arguments
     * specifying what node data to stream.
     * 
     * @param {Object} connectionArgs
     */
    open(connectionArgs) {
        var serverUrl = this.get('serverUrl');
        const socket = this.get('io').socketFor(serverUrl, connectionArgs);

        socket.on('connect', this.onConnect, this);
        socket.on('message', this.onMessage, this);
        socket.on('data', this.onData, this);
    },

    close() {
        const socket = this.get('io').socketFor(this.get('serverUrl'));

        // Remove listeners from the event pool so they can't be invoked
        socket.off('connect', this.onConnect);
        socket.off('message', this.onMessage);
        socket.off('data', this.onData);
    },

    onConnect(event) {
        console.log("Connection opened! Requesting last hour of sensor data");
        console.log(event);
    },

    onMessage(event) {
        console.log("Received a message.");
        console.log(event);
    },

    onData(event) {
        console.log("Received the filtered data, now displaying...");
        console.log(event);
        return event;
    },
});
