import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),
    nodes: Ember.inject.service('node-meta'),

    model() {
        "use strict";
        var ajax = this.get('ajax');
        var ajaxPromise = ajax.request('/sensor-networks/ArrayOfThings/nodes');

        return ajaxPromise.then(result => {
            
            // JSON => GeoJSON
            result = result.data.map(function(json) {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": json.id,
                        "info": json.info,
                        "popupContent": "I'm a node."
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [json.location.lat, json.location.lon]
                    }
                }
            });

            console.log(result);
            return { 
                "data": result,
                "selected": this.get('nodes').get('selectedNodes')
            };
        });
    }
});
