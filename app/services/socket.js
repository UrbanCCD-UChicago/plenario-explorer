import Ember from 'ember';


export default Ember.Service.extend({

    // Inject the socket-io service into the object
    io: Ember.inject.service('socket-io'),
    // Socket address to listen for 
    url: "localhost:8081",

    willRender() {
        // Create the actual socket
        const socket = this.get('io').socketFor(this.get('url'));

        // Define socket event handlers, args: event name, callback, context
        socket.on('connect', this.onConnect, this);
        socket.on('message', this.onMessage);
        socket.on('data', this.onData, this);
    },

    willDestroyElement() {
        const socket = this.get('io').socketFor(this.get('url'));

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
    },
});
