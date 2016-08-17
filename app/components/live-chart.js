
import Ember from 'ember';

export default Ember.Component.extend({

    series: null,  // Will be passed in from node-stream

    didInsertElement() {
        this._super(...arguments);
        this.$().highcharts({
            chart: {
                events: {
                    load: () => {
                    }
                }
            },
            series: this.get('series'),
        });
    },

    willDestroyElement() {
    }
});
