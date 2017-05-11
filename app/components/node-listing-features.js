import Ember from "ember";

export default Ember.Component.extend({
  features: Ember.computed('record', 'curation', function() {
    const sensors = this.get('record.properties.sensors');

    // TODO: we want to map the available sensors to the set of features they collectively measure
    return sensors; // For now just returning the raw sensor identifiers for the node
  })
});
