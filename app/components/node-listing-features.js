import Ember from "ember";

export default Ember.Component.extend({
  features: Ember.computed('record', 'table.sensorMetadata', function() {
    const sensorMeta = this.get('table.sensorMetadata');
    const sensToFeat = {};
    sensorMeta.forEach(sm => {
      sensToFeat[sm.name] = [...new Set(sm.features)];
    });

    const sensors = this.get('record.properties.sensors');
    const features = new Set();

    sensors.forEach(sensor => {
      const feats = sensToFeat[sensor];
      if (feats) {
        feats.forEach(feat => {
          features.add(feat.capitalize().replace(/_/, ' '));
        });
      }
    });

    return [...features].sort();
  })

});
