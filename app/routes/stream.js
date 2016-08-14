import Ember from 'ember';

export default Ember.Route.extend({
    // Grab our query service to make calls to Plenario for data
    query: Ember.inject.service(),
    nodes: Ember.inject.service('node-meta'),

    // The model hook kindly waits until the data finish loading
    // before returning and rendering the template
    model() {
        // First thing's first: grab all nodes and their locations
        // This has nothing to do with sockets, we are just populating 
        // the map
        
        // var nodeGeoJSON = requestNodeGeoJSON()        
        // For now let's fake it.
        // Grab from our DB
        return {
            "data": [{
                "type": "Feature",
                "properties": {
                    "name": "ArrayOfThings-1",
                    "sensors": "Temperature, Humidity",
                    "popupContent": "Gimme all your data."
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [-87.58191, 41.79550]
                }
            }],
            "selected": this.get('nodes').get('selectedNodes')
        }
    }
});
