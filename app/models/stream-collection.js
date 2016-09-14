import E from 'ember';
import {Value} from '../models/value';
const NETWORK = 'array_of_things';
import moment from 'moment';

/**
 * Parameter: nodeId
 */
export default E.Object.extend({
  query: E.inject.service(),
  curation: E.inject.service(),

  init() {
    this._super(...arguments);

    // To prevent the charts from stretching into infinity,
    // only keep a set window of minutes on display
    if (!this.get('windowMinutes')) {
      this.set('windowMinutes', 60);
    }
  },

  createFor(nodeId) {
    this.set('nodeId', nodeId);
    const obsProps = this.get('curation').observedPropertiesFor(NETWORK);

    this.set('sensorMap', createSensorMap(obsProps));
    this.set('streams', createStreams(obsProps));

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
      // TODO: add time constraint to only fetch last hour
      const nodeId = this.get('nodeId');
      q.getSensorObservations(nodeId, NETWORK, sensor, foiList)
        .then(observations => {
          const fromThisSensor = observations.filter(obs => obs.node_id === nodeId);
          const valCollections = splitObservationstoValues(fromThisSensor);
          this.prependValues(valCollections);
        });
    });
  },

  prependValues(valCollections) {
    const streams = this.get('streams');
    valCollections.forEach((values, property) => {
      if (streams[property]) {
        streams[property].unshiftObjects(values);
      }
    });
  },

  initSocket() {
    const id = this.get('nodeId'), sensorMap = this.get('sensorMap');
    const socket = this.get('query').getSocketForNode(id, ...sensorMap.keys());
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
        const windowBorder = moment().subtract(this.get('windowMinutes'), 'minutes');
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
    let idx = stream.findIndex(val => moment(val.datetime) > windowBorder);
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
  const someList = valLists[0];
  // Map from property id to list of values
  const propertyPairs = someList.map(val => [val.id, [] ]);
  const propMap = new Map(propertyPairs);
  for (let list of valLists) {
    for (let val of list) {
      propMap.get(val.id).push(val);
    }
  }
  return propMap;
}

/**
 * sensorName => [list, of, properties]
 * @param observedProperties
 * @returns {Map}
 */
function createSensorMap(observedProperties) {
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
