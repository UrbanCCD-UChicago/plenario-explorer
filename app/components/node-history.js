import Ember from 'ember';
import ENV from '../config/environment';

/*
  [
    {
      n2: {
        std: 0.2904306472778,
        count: 186
      },
      co2: {
        std: 0.297191058317052,
        count: 186
      },
      time_bucket: "2016-09-20T14:00:00"
    },
    {
      n2: {
        std: 0.289785143009181,
        count: 262
      },
      co2: {
        std: 0.301242919218185,
        count: 262
      },
      time_bucket: "2016-09-20T15:00:00"
    },
    {
      n2: {
        std: 0.284751283328011,
        count: 185
      },
      co2: {
        std: 0.298932801862078,
        count: 185
      },
      time_bucket: "2016-09-20T15:00:00"
    },
    {
      n2: {
        std: 0.282654606260039,
        count: 244
      },
      co2: {
        std: 0.28008172427535,
        count: 244
      },
      time_bucket: "2016-09-20T16:00:00"
    },
    {
      n2: {
        std: 0.298634869690546,
        count: 219
      },
      co2: {
        std: 0.293394462076403,
        count: 219
      },
      time_bucket: "2016-09-20T16:00:00"
    },
    {
      n2: {
        std: 0.297290377064934,
        count: 271
      },
      co2: {
        std: 0.287818444629968,
        count: 271
      },
      time_bucket: "2016-09-20T17:00:00"
    },
    {
      n2: {
        std: 0.292975071399474,
        count: 192
      },
      co2: {
        std: 0.289170812937442,
        count: 192
      },
      time_bucket: "2016-09-20T17:00:00"
    },
    {
      n2: {
        std: 0.287687583747607,
        count: 254
      },
      co2: {
        std: 0.285963939921832,
        count: 254
      },
      time_bucket: "2016-09-20T18:00:00"
    },
    {
      n2: {
        std: 0.298789935411605,
        count: 193
      },
      co2: {
        std: 0.287472043982196,
        count: 193
      },
      time_bucket: "2016-09-20T18:00:00"
    },
    {
      n2: {
        std: 0.279659004783487,
        count: 261
      },
      co2: {
        std: 0.298785814527463,
        count: 261
      },
      time_bucket: "2016-09-20T19:00:00"
    },
    {
      n2: {
        std: 0.284561483719461,
        count: 228
      },
      co2: {
        std: 0.290812443880957,
        count: 228
      },
      time_bucket: "2016-09-20T20:00:00"
    },
    {
      n2: {
        std: 0.301261187306086,
        count: 203
      },
      co2: {
        std: 0.281873071143716,
        count: 203
      },
      time_bucket: "2016-09-20T19:00:00"
    }
  ]
*/

export default Ember.Component.extend({
  curation: Ember.inject.service(),
  query: Ember.inject.service(),

  timelines: Ember.computed('node', function() {
    const node = this.get('node');
    const allCuratedSensors = this.get('curation').createSensorMap();
    const sensorsFromThisNode = subMap(allCuratedSensors, node.sensors);
    // For each sensor,
    const q = this.get('query');
    sensorsFromThisNode.forEach( (propertyList, sensor) => {
      q.historyFor(node.id, sensor, propertyList)
      .then(timeseries => {
        // Format and add to some data structure
      });
    });

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
function createTimelines(curatedProperties, nodeMeta, qService) {
  const propsFromThisNode = subMap(curatedProperties, nodeMeta.sensors);
  const q = qService;
  const timelineHash = {};

  // For each sensor,
  propsFromThisNode.forEach((foiToTypes, sensor) => {
    // For each foi,
    foiToTypes.forEach((types, _) => {
      // Grab timeseries for foi
      q.getHistoryFor(nodeMeta.id, sensor, types).then(timeseries => {
        // Add individual timeseries
        addToHash(timeseries, timelineHash);
      });
    });
  });

  return timelineHash;
}

function addToHash() {

}

function propsPerFOI() {

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
