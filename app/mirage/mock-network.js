import {toFeaturesToTypes} from '../utils/sensor-map';
import Type from '../models/type';
import utc8601 from '../utils/utc-8601';

export default class MockNetwork {
  /**
   * Seeds MockNetwork with sensor metadata,
   * so that it can format plausible query responses.
   *
   */
  constructor(curatedTypes) {
    // Generate map from sensors to factories
    const sensorToFeatureToTypes = toFeaturesToTypes(curatedTypes);
    // For each sensor, create an array of factories
    const sensorToFactories = new Map();
    for (let [sensor, featureToTypes] of sensorToFeatureToTypes.entries()){
      const factories = [];
      for (let [feature, types] of featureToTypes) {
        factories.push(this._makeFactory(sensor, feature, types));
      }
      sensorToFactories.set(sensor, factories);
    }
    this.sensorToFactories = sensorToFactories;
  }

  /**
   *
   * @private
   * @returns Array<Function(nodeID, timestamp) -> Observation >
   */
  _makeFactory(sensor, feature, types) {
    return (nodeId, timestamp) => {
      return {
        "feature_of_interest": feature,
        "node_id": nodeId,
        "sensor": sensor,
        "results": this._generateResults(types),
        "datetime": timestamp
      };
    };
  }

  _generateResults(types) {
    const properties = types.map(type => new Type(type).property);
    const results = {};
    for (let prop of properties) {
      results[prop] = Math.random();
    }
  }

  /**
   * Doesn't depend on curation.
   * We can spit back everything from the supplied types.
   *
   * @param nodeId To be inserted verbatim into response.
   * @param types Array<String>
   *   where each string is a result type
   *   (feature_of_interest.observed_property)
   *
   * @returns Object as returned from /aggregate endpoint
   */
  aggregate(typeIds, startMoment, endMoment) {
    // Assume we only have one FOI - as the endpoint requires
    const properties = typeIds.map(t => new Type(t).property);
    const timestamps = generateTimestamps(startMoment, endMoment, 1, 'hours');
    return timestamps.map(t => {
      const bucket = {time_bucket: t};
      for (let prop of properties) {
        bucket[prop] = {
          count: Math.round(Math.rand() * 100),
          avg: Math.rand()
        };
      }
    });
  }

  /**
   * @param nodeId To be inserted verbatim into response.
   * @param sensors Array<String>
   * @param startMoment Moment when to start
   * @param endMoment Moment when to stop
   *
   * @returns Object as returned from /query endpoint
   *          with observations within the specified range
   */
  observations(nodeId, sensors, startMoment, endMoment) {
    const timestamps = generateTimestamps(startMoment, endMoment, 30, 'seconds');
    const factories = this.observationFactories(sensors);

    return timestamps.map(ts =>
      factories.map(f => f(nodeId, ts))
    ).reduce(Array.prototype.concat, []);
  }

  /**
   *
   * @param nodeId
   * @param sensors
   *
   * @returns Array<Function> Where each function will
   *                          generate an observation object
   *                          for one of the features with the sensor
   *
   */
  observationFactories(sensors) {
    return sensors.reduce((factories, sensor) =>
      factories.concat(this.sensorToFactories.get(sensor)),
      []
    );

  }
};

function generateTimestamps(startMoment, endMoment, interval, unit) {
  // Generate timestamps at 30 second sampling rate.
  const timestamps = [];
  while (startMoment < endMoment) {
    timestamps.push(utc8601(startMoment));
    startMoment.add(interval, unit);
  }
  return timestamps;
}
