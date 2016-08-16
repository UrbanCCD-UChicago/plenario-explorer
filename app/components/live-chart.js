
import Ember from 'ember';

export default Ember.Component.extend({
    /**
     * So what's the issue here?
     * 
     * I'm not getting any data from my node-stream parent!
     * 
     * Why is that?
     * 
     * It is pushing objects into the data array but the changes
     * are not being propogated to me!
     */

    promiseWhile() {
        "use strict";
        var currentVal = new Promise(function(resolve, reject) {
            setTimeout(() => {
                var dataPoint = this.get('data').shift;
                if (dataPoint !== 'undefined')
                    resolve(dataPoint);
                else
                    reject(new Error("foo!"));
            }, 3000);
        }) 
    },

    didInsertElement() {
        this._super(...arguments);
        this.$().highcharts({
            chart: {
                events: {
                    load: () => {
                        var series = this.series[0];

                        promiseWhile.then(function(result) {
                            var x = (new Date).getTime();
                            var y = result;
                            series.addPoint([x, y]);
                        });
                    }
                }
            },
            series: [{
                data: []
            }]
        });
    },

    willDestroyElement() {
    }
});
