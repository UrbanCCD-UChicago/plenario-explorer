import Ember from 'ember';
import SensorMap from '../utils/sensor-map';

export default Ember.Component.extend({
  query: Ember.inject.service(),
  streamCollection: Ember.inject.service(),

  /**
   * Creates map from type ids to objects containing all curated type information
   * plus a "stream" property containing an array of values of that type.
   */
  streams: Ember.computed('nodeMeta', 'viewType', function() {
    const nodeMeta = this.get('nodeMeta');
    // Clone observed properties
    // because we are going to mutate this array.
    const curatedTypes = cloneArray(this.get('curatedTypes'));
    const {toFeaturesToTypes, types} = new SensorMap(curatedTypes, nodeMeta.sensors);

    let typeHash;
    if (this.get('viewType') === 'live') {
      const coll = this.get('streamCollection');
      typeHash = coll.createFor(nodeMeta, curatedTypes);
    }
    else {
      typeHash = createTimelines(
        toFeaturesToTypes,
        nodeMeta.id,
        this.get('query'),
        types
      );
    }

    // Insert all streams into the right observed property object.
    const propMap = {};
    for (let prop of curatedTypes) {
      prop.stream = typeHash[prop.id];
      propMap[prop.id] = prop;
    }
    return propMap;
  })
});

/**
 *
 * @param toFeatureToTypes Map<string, Map<string, Array>>
 *  Map from sensor name to Array of full property names
 * @param nodeId
 *  Node unique id
 * @param qService
 *  Handle to query service
 * @param allTypes
 *  Array of types to be queried
 * @returns {Object<string, Array>}
 *  Object linking each relevant property name
 *  to a growable Ember Array of Values
 */
function createTimelines(toFeatureToTypes, nodeId, qService, allTypes) {

  const q = qService;
  const timelineHash = {};
  for (let type of allTypes) {
    timelineHash[type] = [];
  }
  // For each sensor,
  toFeatureToTypes.forEach((foiToTypes, sensor) => {
    // For each foi,
    foiToTypes.forEach((types) => {
      // Grab timeseries for foi
      q.getHistoryFor(nodeId, sensor, types).then(timeseries => {
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

/**
 *
 * @param arr Array<Object>
 * @returns Array<Object>
 */
function cloneArray(arr) {
  return arr.map(obj => Ember.copy(obj));
}
