import E from 'ember';
import {Value} from '../models/value';
import ENV from '../config/environment';
const NETWORK = ENV.networkId;
import moment from 'moment';
import Type from '../models/type';
import SensorMap from '../utils/sensor-map';

export default E.Service.extend({
  query: E.inject.service(),

  // To prevent the charts from stretching into infinity,
  // only keep a set window of minutes on display
  windowMinutes: 60,

  /**
   * Return a hash mapping types to a mutable array
   * of sensor values.
   *
   * @param nodeMeta
   * @param curatedTypes
   * @returns {Object<string, Array>}
   */
  createFor(nodeMeta, curatedTypes) {
    this.set('nodeId', nodeMeta.id);
    const {toTypes} = new SensorMap(curatedTypes, nodeMeta.sensors);
    this.set('sensorMap', toTypes);
    // Names of types reported by sensors on this node
    const validTypes = [].concat.apply([], [...toTypes.values()]);
    curatedTypes = curatedTypes.filter(({id}) => validTypes.includes(id));
    this.set('streams', createStreams(curatedTypes));

    this.seedStreams();
    this.initSocket();
    return this.get('streams');
  },

  /**
   * Kick off queries into the recent past
   * to populate the streams.
   */
  seedStreams() {
    const q = this.get('query');
    const nodeId = this.get('nodeId');
    // Generate the sensor and fois that need to be queried
    this.get('sensorMap').forEach((types, sensor) => {
      const features = types.map(type => new Type(type).feature);
      const uniqFeatures = [...new Set(features)];
      // Need to make one call per feature
      const addToStream = observations => {
        if (observations.length === 0) {return;}
        const valCollections = splitObservationstoValues(observations);
        this.prependValues(valCollections);
      };
      for (let f of uniqFeatures) {
        q.getSensorObservations(nodeId, NETWORK, f, sensor).then(addToStream);
      }
    });
  },

  /**
   * After a recent past history returns,
   * throw its observations to the front of the correct array.
   * Takes Map from type to Array of Values
   * @param valCollections Map<string, Array<Value>>
   */
  prependValues(valCollections) {
    const streams = this.get('streams');
    valCollections.forEach((values, type) => {
      // Is this a curated type?
      if (!streams[type]) {
        return;
      }
      streams[type].unshiftObjects(values);
    });
  },

  /**
   * Create a socket for this node's sensors
   */
  initSocket() {
    const id = this.get('nodeId');
    const sensorList = [...this.get('sensorMap').keys()];
    const socket = this.get('query').getSocketForNode(NETWORK, id, sensorList);
    socket.on('data', this.appendObservation, this);
  },

  /**
   * When a socket gets an observation,
   * place it at the end of the correct stream.
   * @param obs
   */
  appendObservation(obs) {
    if (obs.node_id !== this.get('nodeId')) {return;}

    const vals = Value.adaptFromAPI(obs);
    const streams = this.get('streams');
    for (let val of vals) {
      if (streams[val.id]) {
        const stream = streams[val.id];
        // Remove observations that have fallen out of the time window
        const windowBorder = moment().subtract(this.get('windowMinutes'), 'minutes').utc().format();
        this.truncateHead(stream, windowBorder);
        // Add new observation
        stream.pushObject(val);
      }
    }
  },

  /**
   * If observations fall outside of window,
   * returns truncated stream that only contains
   * observations in that window.
   *
   * @param stream Ember array of Value models
   * @param windowBorder moment object
   */
  truncateHead(stream, windowBorder) {
    if (stream.length === 0) {return;}
    // Find where times start to come after the border
    let idx = stream.findIndex(val => val.datetime > windowBorder);
    // If all the times are stale
    if (idx === -1) {
      idx = stream.length;
    }
    // Trim them
    stream.removeAt(0, idx);
  }
});

/**
 * Takes array of observations ordered in time,
 * but potentially with a mix of types.
 * Outputs Map from type
 * to array of observations of that type.
 *
 * @param observations
 * @returns {Map<type, Array<Value>>}
 */
function splitObservationstoValues(observations) {
  // Split each operation into a list of values
  const valLists = observations.map(obs => Value.adaptFromAPI(obs));
  // Map from property id to list of values
  const propMap = new Map();
  for (let list of valLists) {
    for (let val of list) {
      if (!propMap.has(val.id)) {
        propMap.set(val.id, []);
      }
      propMap.get(val.id).push(val);
    }
  }
  return propMap;
}

/**
 *
 * @param curatedTypes
 * @returns {{}}
 */
function createStreams(curatedTypes) {
  const streamsObj = {};
  for (let cType of curatedTypes) {
    streamsObj[cType.id] = E.A([]);
  }
  return streamsObj;
}
