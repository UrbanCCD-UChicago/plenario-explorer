import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';
import Pusher from 'npm:pusher-js';

export default Ember.Service.extend({
    init() {
        this._super(...arguments);
        this.set('pusher', new Pusher(ENV.APP.PUSHER.key, { authEndpoint: ENV.APP.PUSHER.auth }));
    },

    subscribe(channelName, callback) {
        const channel = this.get('pusher').subscribe(channelName);
        channel.bind('data', callback);
    },

    unsubscribe(channelName) {
        this.get('pusher').unsubscribe(channelName);
    }
});
