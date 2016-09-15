import Ember from 'ember';

export default Ember.Service.extend({
  // We'll eventually want to let network maintainers
  // curate their networks themselves.
  // For that we'd probably need some service where they can set it.
  // This service can fetch the curation from there.
  observedPropertiesFor() {
    return [
      {
        id: 'temperature.temperature',
        name: 'Temperature',
        unit: '°C',
        sensor: 'SENSOR_DEV_4'
      },
      {
        id: 'humidity.humidity',
        name: 'Relative Humidity',
        unit: '%',
        sensor: 'SENSOR_DEV_2'
      },
      {
        id: 'gas_concentration.n2',
        name: 'Nitrogen Concentration',
        unit: 'ppm',
        sensor: 'SENSOR_DEV_3'
      },
      {
        id: 'gas_concentration.co2',
        name: 'Carbon Dioxide Concentration',
        unit: 'ppm',
        sensor: 'SENSOR_DEV_3'
      },
      {
        id: 'gas_concentration.o2',
        name: 'Oxygen Concentration',
        unit: 'ppm',
        sensor: 'SENSOR_DEV_4'
      }
    ];
  }
});
