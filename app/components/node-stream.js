import Ember from 'ember';

export default Ember.Component.extend({
    nodes: Ember.inject.service('node-meta'),
    socket: Ember.inject.service('socket'),

    actions: {
        connect() {
            this.get('socket').willRender();
        },

        disconnect() {
            this.get('socket').willDestroyElement();
        }
    }
});