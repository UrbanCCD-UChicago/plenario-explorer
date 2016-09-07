import Ember from 'ember';

export default Ember.Service.extend({
  // We'll eventually want to let network maintainers
  // curate their networks themselves.
  // For that we'd probably need some service where they can set it.
  // This service can fetch the curation from there.
  observedPropertiesFor(networkName) {
    return [
      {
        id: 'temperature.temperature',
        name: 'Temperature',
        unit: '°C',
        sensor: 'tempx'
      },
      {
        id: 'gas_concentration.h2s',
        name: 'Hydrogen Sulfide Concentration',
        unit: 'ppm',
        sensor: 'gasx'
      },
    ];
  }
});
