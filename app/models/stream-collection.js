import E from 'ember';
import {Value} from '../models/value';
const NETWORK = 'array_of_things';

export default E.Object.extend({
  query: E.inject.service(),
  curation: E.inject.service(),

  init() {
    this._super(...arguments);

    const obsProps = this.get('curation').observedPropertiesFor(NETWORK);
    this.set('sensorMap', createSensorMap(obsProps));
    this.set('streams', createStreams(obsProps));
    this.seedStreams();
    this.initSocket();
  },

  seedStreams() {
    const q = this.get('query');
    // Generate the sensor and fois that need to be queried
    this.get('sensorMap').forEach((props, sensor) => {
      const fois = props.map(prop => prop.split('.', 2)[0]);
      const foiList = [...new Set(fois)].join(',');
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
      if (streams.has(val.id)) {
        streams.get(val.id).pushObject(val);
      }
    }
  },

  prependValues(valCollections) {
    const streams = this.get('streams');
    valCollections.forEach((values, property) => {
      if (streams.has(property)) {
        streams.get(property).unshift(...values);
      }
    });
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
 * property id => Ember Array of Observations
 * @param observedProperties
 * @returns {Map}
 */
function createStreams(observedProperties) {
  const propStreamPairs = observedProperties.map(
    prop => [prop.id, E.A([])]
  );
  return new Map(propStreamPairs);
}
