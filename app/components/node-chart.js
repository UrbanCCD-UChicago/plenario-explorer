import Ember from 'ember';

export default Ember.Component.extend({
  query: Ember.inject.service(),
  streamCollection: Ember.inject.service(),

  // Whenever the user selects a different node,
  streams: Ember.computed('nodeMeta', 'viewType', function() {
    const nodeMeta = this.get('nodeMeta');
    // Clone observed properties
    // because we are going to mutate this array.
    const obsProps = cloneArray(this.get('curation'));

    let typeHash;
    if (this.get('viewType') === 'live') {
      const coll = this.get('streamCollection');
      // Fetch a new set of streams for that node.
      // Can make general s.t. streams is swappable with timeseries
      typeHash = coll.createFor(nodeMeta, obsProps);
    }
    else {
      const allTypes = obsProps.mapBy('id');
      const splitObsProps = createSensorMapSplitByFeature(obsProps);
      typeHash = createTimelines(splitObsProps, nodeMeta, this.get('query'), allTypes);
    }

    // Insert all streams into the right observed property object.
    const propMap = {};
    for (let prop of obsProps) {
      prop.stream = typeHash[prop.id];
      propMap[prop.id] = prop;
    }
    return propMap;
  })
});

/**
 * Creates a mapping from sensors to properties
 * for EVERY curated sensor (not just the ones relevant to this node)
 *
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
 * Map with sensor names as keys,
 * list of lists of properties segregated by feature
 *
 * sensor => {foi => type}
 *
 * @returns {Map<string, Array<Array>>}
 **/
function createSensorMapSplitByFeature(observedProperties) {
  const unsplit = createSensorMap(observedProperties);
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

/**
 *
 * @param curatedProperties Map<string, Map<string, Array>>
 *  Map from sensor name to Array of full property names
 * @param nodeMeta
 *  Properties of a node (not full geoJSON)
 * @param qService
 *  Handle to query service
 * @returns {Object<string, Array>}
 *  Object linking each relevant property name
 *  to a growable Ember Array of Values
 */
function createTimelines(curatedProperties, nodeMeta, qService, allTypes) {
  const propsFromThisNode = subMap(curatedProperties, nodeMeta.sensors);
  const q = qService;
  const timelineHash = {};
  for (let type of allTypes) {
    timelineHash[type] = [];
  }

  // For each sensor,
  propsFromThisNode.forEach((foiToTypes, sensor) => {
    // For each foi,
    foiToTypes.forEach((types, _) => {
      // Grab timeseries for foi
      q.getHistoryFor(nodeMeta.id, sensor, types).then(timeseries => {
        // Add individual timeseries
        addToHash(timeseries, timelineHash, types);
      });
    });
  });

  return timelineHash;
}

function addToHash(timeseries, timelineHash, types) {
  // Make map from prop name to timeseries
  const tuples = types.map(type => [type.split('.')[1], []]);
  const propsToTimeseries = new Map(tuples);

  /*
    All buckets in timeseries,
    where bucket looks like:

   {
     n2: {
       count: 402,
       avg: 0.502523721005823
     },
     co2: {
       count: 402,
       avg: 0.502330371954922
     },
     time_bucket: "2016-09-20T16:00:00"
   }
   */

  // Split bucket into one timeseries per type
  for (let bucket of timeseries) {
    if ('count' in bucket) {continue;}
    const datetime = bucket.time_bucket;
    delete bucket.time_bucket;
    for (let prop of Object.keys(bucket)) {
      const val = bucket[prop].avg;
      if (!val) {continue;}

      const value = {
        datetime: datetime,
        value: val
      };
      propsToTimeseries.get(prop).push(value);
    }
  }

  // Push timeseries to provided hash
  const [foi,] = types[0].split('.');
  for (let [prop, ts] of propsToTimeseries) {
    const type = `${foi}.${prop}`;
    timelineHash[type].pushObjects(ts);
  }
}

function subMap(supersetMap, subsetKeys) {
  const subsetMap = new Map();
  supersetMap.forEach((val, key) => {
    if (subsetKeys.includes(key)) {
      subsetMap.set(key, val);
    }
  });
  return subsetMap;
}
/**
 *
 * @param arr Array<Object>
 * @returns Array<Object>
 */
function cloneArray(arr) {
  return arr.map(obj => Ember.copy(obj));
}
