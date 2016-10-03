import Ember from 'ember';
import {toFeaturesToTypes, subsetMap} from '../utils/sensor-map';

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
      const splitObsProps = toFeaturesToTypes(obsProps);
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
 *
 * @param sensorToFeatureToTypes Map<string, Map<string, Array>>
 *  Map from sensor name to Array of full property names
 * @param nodeMeta
 *  Properties of a node (not full geoJSON)
 * @param qService
 *  Handle to query service
 * @returns {Object<string, Array>}
 *  Object linking each relevant property name
 *  to a growable Ember Array of Values
 */
function createTimelines(sensorToFeatureToTypes, nodeMeta, qService, allTypes) {
  const typesFromThisNode = subsetMap(sensorToFeatureToTypes, nodeMeta.sensors);
  const q = qService;
  const timelineHash = {};
  for (let type of allTypes) {
    timelineHash[type] = [];
  }

  // For each sensor,
  typesFromThisNode.forEach((foiToTypes, sensor) => {
    // For each foi,
    foiToTypes.forEach((types) => {
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

/**
 *
 * @param arr Array<Object>
 * @returns Array<Object>
 */
function cloneArray(arr) {
  return arr.map(obj => Ember.copy(obj));
}
