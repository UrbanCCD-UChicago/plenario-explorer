/* eslint-disable no-underscore-dangle */
// TODO: refactor so we can remove the ESLint exception
import Type from '../models/type';

/**
 * Given a curated list of types
 * and sensors that we care about,
 * generates data structures about what types
 * are relevant when querying particular sensors
 * and features of interest.
 *
 * Curated types are not maintained in the Plenario API.
 * They are maintained separately and stored as JSON on S3.
 * (It's a nice abstraction for this particular web app,
 * but probably not generally useful.)
 *
 * A curated type looks like:
 * {
 *   "id": "temperature.temperature",
 *   "name": "Temperature",
 *   "unit": "°C",
 *   "sensor": "sensor_dev_4"
 * }
 *
 */
export default class SensorMap {
  constructor(curatedTypes, sensors) {
    this.toTypes = _toTypes(curatedTypes);
    this.toFeaturesToTypes = _toFeaturesToTypes(curatedTypes);
    // If the user passed in a list of sensors,
    // pare down to just those sensors.
    if (sensors) {
      this.toTypes = _subsetMap(sensors, this.toTypes);
      this.toFeaturesToTypes = _subsetMap(sensors, this.toFeaturesToTypes);
      let allTypes = [];
      for (const types of this.toTypes.values()) {
        allTypes = allTypes.concat(types);
      }
      this.types = allTypes;
    } else {
      this.types = curatedTypes.mapBy('id');
    }
    const repeatedFeatures = this.types.map(t => new Type(t).feature);
    this.features = [...new Set(repeatedFeatures)];
    this.featuresToTypes = _groupTypesByFeature(this.types);
  }
}

/**
 * Creates a mapping from sensors to types
 * for EVERY curated sensor (not just the ones relevant to this node)
 *
 * sensorName => [list, of, types]
 * @param curatedTypes
 * @returns {Map<string, Array<string>>}
 */
function _toTypes(curatedTypes) {
  // All sensor names with an empty list
  const sensorListPairs = curatedTypes.map(prop => [prop.sensor, []]);
  // Map ensures no duplicates
  const sensorMap = new Map(sensorListPairs);
  // Add all property ids to the sensor reporting them
  for (const type of curatedTypes) {
    const { sensor, id } = type;
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
function _toFeaturesToTypes(curatedTypes) {
  const unsplit = _toTypes(curatedTypes);
  const sensorToFoi = new Map();

  unsplit.forEach((types, sensor) => {
    const foiToType = _groupTypesByFeature(types);
    sensorToFoi.set(sensor, foiToType);
  });

  return sensorToFoi;
}

function _groupTypesByFeature(types) {
  const featToType = new Map();
  // Emulate a Python defaultdict
  for (const type of types) {
    const [foi] = type.split('.');
    // Have we seen this FOI before?
    if (featToType.has(foi)) {
      // Yes. Append.
      featToType.get(foi).push(type);
    } else {
      // No, first time. Create.
      featToType.set(foi, [type]);
    }
  }
  return featToType;
}

function _subsetMap(subsetKeys, supersetMap) {
  const m = new Map();
  supersetMap.forEach((val, key) => {
    if (subsetKeys.includes(key)) {
      m.set(key, val);
    }
  });
  return m;
}
