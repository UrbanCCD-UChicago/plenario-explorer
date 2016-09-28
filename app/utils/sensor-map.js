/**
 * These functions take a list of curated types.
 * Curated types are not maintained in the Plenario API.
 * They are maintained separately and stored as JSON on S3.
 * A curated type looks like:
 * {
 *   "id": "temperature.temperature",
 *   "name": "Temperature",
 *   "unit": "°C",
 *   "sensor": "sensor_dev_4"
 * }
 *
 */

/**
 * Creates a mapping from sensors to types
 * for EVERY curated sensor (not just the ones relevant to this node)
 *
 * sensorName => [list, of, types]
 * @param curatedTypes
 * @returns {Map<string, Array<string>>}
 */
function toTypes(curatedTypes) {
  // All sensor names with an empty list
  const sensorListPairs = curatedTypes.map(prop => [prop.sensor, []]);
  // Map ensures no duplicates
  const sensorMap = new Map(sensorListPairs);
  // Add all property ids to the sensor reporting them
  for (let type of curatedTypes) {
    const {sensor, id} = type;
    sensorMap.get(sensor).push(id);
  }
  return sensorMap;
}

/**
 * Map with sensor names as keys,
 * list of lists of types segregated by feature
 *
 * sensor => {foi => [types]}
 *
 * @returns {Map<string, Map<string, Array>>}
 **/
function toFeaturesToTypes(curatedTypes) {
  const unsplit = toTypes(curatedTypes);
  const sensorToFoi = new Map();

  unsplit.forEach((types, sensor) => {
    const foiToType = new Map();
    // Emulate a Python defaultdict
    for (let type of types) {
      const [foi,] = type.split('.');
      // Have we seen this FOI before?
      if (foiToType.has(foi)) {
        // Yes. Append.
        foiToType.get(foi).push(type);
      }
      // No, first time. Create.
      else {
        foiToType.set(foi, [type]);
      }
    }
    sensorToFoi.set(sensor, foiToType);
  });

  return sensorToFoi;
}

export {toTypes, toFeaturesToTypes};
