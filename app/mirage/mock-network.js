import SensorMap from '../utils/sensor-map';
import Type from '../models/type';
import utc8601 from '../utils/utc-8601';
import moment from 'moment';
import Ember from 'ember';

export default class MockNetwork {
  /**
   * Seeds MockNetwork with sensor metadata,
   * so that it can format plausible query responses.
   *
   */
  constructor(curatedTypes, nodeMetadata) {
    const sensorMap = new SensorMap(curatedTypes);
    this.sensorToFactories = this._sensorToFactories(sensorMap.toFeaturesToTypes);
    this.featureToFactory = this._featureToFactory(sensorMap.featuresToTypes);
    this.nodeToSensors = this._nodeToSensorsMap(nodeMetadata);
  }

  _sensorToFactories(toFeaturesToTypes) {
    // For each sensor, create an array of factories
    const sensorToFactories = new Map();
    // const featureToFactory = new Map();
    for (let [sensor, featureToTypes] of toFeaturesToTypes.entries()){
      const factories = [];
      for (let [feature, types] of featureToTypes) {
        const factory = this._makeFactory(sensor, feature, types);
        factories.push(factory);
        // featureToFactory.set(feature, factory);
      }
      sensorToFactories.set(sensor, factories);
    }
    return sensorToFactories;
  }

  _featureToFactory(featureToTypes) {
    const featureToFactory = new Map();
    for (let [feat, types] of featureToTypes.entries()) {
      const factory = this._makeFactory('unknown', feat, types);
      featureToFactory.set(feat, factory);
    }
    return featureToFactory;
  }

  _nodeToSensorsMap(nodeMetadata) {
    const tuples = nodeMetadata.map(n => [n.properties.id, n.properties.sensors]);
    return new Map(tuples);
  }

  /**
   *
   * @private
   * @returns Array<Function(nodeID, timestamp) -> Observation >
   */
  _makeFactory(sensor, feature, types) {
    return (nodeId, timestamp) => {
      return {
        "feature": feature,
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
    return results;
  }

  /**
   * Doesn't depend on curation.
   * We can spit back everything from the supplied types.
   *
   * @param type String
   *   where each string is a result type
   *   (feature_of_interest.observed_property)
   *
   * @param startMoment
   * @param endMoment
   *
   * @returns Array as returned from /aggregate endpoint's data property
   */
  aggregate(type, startMoment, endMoment) {
    // Assume we only have one FOI - as the endpoint requires
    // const properties = typeIds.map(t => new Type(t).property);
    const timestamps = generateTimestamps(startMoment, endMoment, 1, 'hours');
    const {property} = new Type(type);
    return timestamps.map(t => {
      const bucket = {time_bucket: t};
      bucket[property] = {
        count: Math.round(Math.random() * 100),
        avg: Math.random()
      };
      return bucket;
    });
  }

  /**
   * @param nodeId To be inserted verbatim into response.
   * @param feature string feature of interest
   * @param startMoment Moment when to start
   * @param endMoment Moment when to stop
   *
   * @returns Object as returned from /query endpoint
   *          with observations within the specified range
   */
  observations(nodeId, feature, startMoment, endMoment) {
    const timestamps = generateTimestamps(startMoment, endMoment, 30, 'seconds');
    const factory = this.featureToFactory.get(feature);
    return timestamps.map(ts => factory(nodeId, ts));

    // const listPerTs = timestamps.map(ts =>
      // Array of observations from each factory
      // factories.map(f => f(nodeId, ts))
    // );
    // return [].concat.apply([], listPerTs);
  }

  /**
   *
   * @param sensors
   *
   * @returns Array<Function> Where each function will
   *                          generate an observation object
   *                          for one of the features with the sensor
   *
   */
  observationFactories(sensors) {
    const sToF = this.sensorToFactories;
    let factories = [];
    for (let s of sensors) {
      if (sToF.has(s)) {
        factories = factories.concat(sToF.get(s));
      }
    }
    return factories;
  }

  /**
   * Returns mock socket with an on method.
   * on(namespace, callback(observation), context)
   * @returns {{on: (function(*, *, *=))}}
   */
  getMockSocket(nodeId) {
    const sensors = this.nodeToSensors.get(nodeId);
    const factories = this.observationFactories(sensors);

    const mockSocket = {
      on(_, callback, context) {
        function emit() {
          const now = utc8601(moment());
          for (let f of factories) {
            const obs = f(nodeId, now);
            callback.call(context, obs);
          }
        }
        const seconds = 3;
        const ms = seconds*1000;
        function emitOnDelay() {
          emit();
          Ember.run.later(emitOnDelay, ms);
        }
        emitOnDelay();
      }
    };
    return mockSocket;
  }
}

function generateTimestamps(startMoment, endMoment, interval, unit) {
  // Generate timestamps at 30 second sampling rate.
  const timestamps = [];
  while (startMoment < endMoment) {
    timestamps.push(utc8601(startMoment));
    startMoment.add(interval, unit);
  }
  return timestamps;
}

