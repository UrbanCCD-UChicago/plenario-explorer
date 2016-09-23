import Ember from 'ember';

export default Ember.Component.extend({
  query: Ember.inject.service(),
  curation: Ember.inject.service(),
  live: false,

  // Whenever the user selects a different node,
  streams: Ember.computed('nodeMeta', 'viewType', function() {
    const nodeMeta = this.get('nodeMeta');
    const obsProps = this.get('curation').observedPropertiesFor('array_of_things');


    let typeHash;
    if (this.get('viewType') === 'live') {
      // TODO: Stream manager is really more a service than a model...
      const coll = Ember.getOwner(this).lookup('model:stream-collection');
      // Fetch a new set of streams for that node.
      // Can make general s.t. streams is swappable with timeseries
      typeHash = coll.createFor(nodeMeta.id);
    }
    else {
      const allTypes = obsProps.mapBy('id');
      const splitObsProps = this.get('curation').createSensorMapSplitByFeature();
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
