import E from 'ember';
import {Value} from '../models/value';
import ENV from '../config/environment';
const NETWORK = ENV.networkId;
import moment from 'moment';
import {toTypes, subsetMap} from '../utils/sensor-map';

/**
 * Parameter: nodeId
 */
export default E.Object.extend({
  query: E.inject.service(),
  // curation: E.inject.service(),

  init() {
    this._super(...arguments);

    // To prevent the charts from stretching into infinity,
    // only keep a set window of minutes on display
    if (!this.get('windowMinutes')) {
      this.set('windowMinutes', 60);
    }
  },

  /**
   * @param nodeMeta
   * @returns {Object<string, Array>}
   */
  createFor(nodeMeta, curatedTypes) {
    this.set('nodeId', nodeMeta.id);
    const allSensorsMap = toTypes(curatedTypes);
    this.set('sensorMap', subsetMap(allSensorsMap, nodeMeta.sensors));
    this.set('streams', createStreams(curatedTypes));

    this.seedStreams();
    this.initSocket();
    return this.get('streams');
  },

  seedStreams() {
    const q = this.get('query');
    // Generate the sensor and fois that need to be queried
    this.get('sensorMap').forEach((props, sensor) => {
      const fois = props.map(prop => prop.split('.', 2)[0]);
      const foiList = [...new Set(fois)].join(',');
      const nodeId = this.get('nodeId');
      q.getSensorObservations(nodeId, NETWORK, sensor, foiList)
        .then(observations => {
          if (observations.length === 0) {return;}
          const fromThisSensor = observations.filter(obs => obs.node_id === nodeId);
          const valCollections = splitObservationstoValues(fromThisSensor);
          this.prependValues(valCollections);
        });
    });
  },

  prependValues(valCollections) {
    const streams = this.get('streams');
    valCollections.forEach((values, property) => {
      // Is this a curated property?
      if (!streams[property]) {
        return;
      }
      streams[property].unshiftObjects(values);

    });
  },

  initSocket() {
    const id = this.get('nodeId');
    const sensorList = [...this.get('sensorMap').keys()];
    const socket = this.get('query').getSocketForNode(NETWORK, id, sensorList);
    socket.on('data', this.appendObservation, this);
  },

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
 * @param observedProperties
 * @returns {{}}
 */
function createStreams(observedProperties) {
  const streamsObj = {};
  for (let prop of observedProperties) {
    streamsObj[prop.id] = E.A([]);
  }
  return streamsObj;
}
