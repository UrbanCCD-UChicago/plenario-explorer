import Ember from 'ember';

export default Ember.Component.extend({
    series: null,

    didInsertElement() {
        this._super(...arguments);
        this.$().highcharts({
            series: [{
                data: [100, 99, 50, 49, 9]
            }]
        });
    },

    willDestroyElement() {
    }
});
