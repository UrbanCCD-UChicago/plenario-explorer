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
    // Only keep a set window of minutes on display
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
      q.getSensorObservations(this.get('nodeId'), NETWORK, sensor, foiList)
        .then(observations => {
          const valCollections = splitObservationstoValues(observations);
          this.prependValues(valCollections);
        });
    });
  },

  initSocket() {
    const id = this.get('nodeId'), sensorMap = this.get('sensorMap');
    const socket = this.get('query').getSocketForNode(id, ...sensorMap.keys());
    socket.on('data', this.appendObservation, this);
  },

  appendObservation(obs) {
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
        // Replace stream
        // streams[val.id] = truncated;
      }
    }
  },

  prependValues(valCollections) {
    const streams = this.get('streams');
    valCollections.forEach((values, property) => {
      if (streams[property]) {
        streams[property].unshift(...values);
      }
    });
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
    // Find where times start to come after the border
    const idx = stream.findIndex(val => moment(val.datetime) > windowBorder);
    // If all times are before the border
    if (idx === -1) {
      // Don't mutate
      return E.A([]);
    }
    stream.removeObjects(0, idx + 1);
    // return stream.slice(idx);
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
  // const propStreamPairs = observedProperties.map(
  //   prop => [prop.id, E.A([])]
  // );
  //
  // return new Map(propStreamPairs);
}

// // Vielen Dank, Herr Rauschmeyer
// // http://www.2ality.com/2015/08/es6-map-json.html
// function strMapToObj(strMap) {
//   let obj = Object.create(null);
//   for (let [k,v] of strMap) {
//     // We don’t escape the key '__proto__'
//     // which can cause problems on older engines
//     obj[k] = v;
//   }
//   return obj;
// }
