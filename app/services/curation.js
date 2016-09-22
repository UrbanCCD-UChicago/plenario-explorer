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
        sensor: 'sensor_dev_4'
      },
      {
        id: 'humidity.humidity',
        name: 'Relative Humidity',
        unit: '%',
        sensor: 'sensor_dev_2'
      },
      {
        id: 'gas_concentration.n2',
        name: 'Nitrogen Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_3'
      },
      {
        id: 'gas_concentration.co2',
        name: 'Carbon Dioxide Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_3'
      },
      {
        id: 'gas_concentration.o2',
        name: 'Oxygen Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_4'
      }
    ];
  },

  /**
   * Map with sensor names as keys,
   * list of observed properties as values.
   * @returns {Map<string, Array>}
   */
  createSensorMap() {
    const observedProperties = this.observedPropertiesFor();
    // All sensor names with an empty list
    const sensorListPairs = observedProperties.map(prop => [prop.sensor, []]);
    // Map ensures no duplicates
    const sensorMap = new Map(sensorListPairs);
    // Add all property ids to the sensor reporting them
    for (let prop of observedProperties) {
      const {sensor, id} = prop;
      sensorMap.get(sensor).push(id);
    }
    return sensorMap;
  },

  /**
   * Map with sensor names as keys,
   * list of lists of properties segregated by feature
   *
   * sensor => {foi => type}
   *
   * @returns {Map<string, Array<Array>>}
   */
  createSensorMapSplitByFeature() {
    const unsplit = this.createSensorMap();
    const sensorToFoi = new Map();

    unsplit.forEach((types, sensor) => {
      const foiToProp = new Map();
      for (let type of types) {
        const [foi,] = type.split('.');
        // Have we seen this FOI before?
        if (foiToProp.has(foi)) {
          foiToProp.get(foi).push(type);
        }
        // First time
        else {
          foiToProp.set(foi, [type]);
        }
      }
      sensorToFoi.set(sensor, foiToProp);
    });

    return sensorToFoi;
  }
});
