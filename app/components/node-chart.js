import Ember from 'ember';
//import moment from 'moment';

export default Ember.Component.extend({
  query: Ember.inject.service('query'),

  /**
   Create mapping from sensor name
   to all observed properties we want to take from it.
   'sensor' => ['foi.property1', 'foi.property2']
   **/
  sensorMap: Ember.computed('node.curatedMapping', function() {
    // TODO: Get curatedMapping from proper source (model)
    const sensorMap = new Map(), curation = this.get('node.curatedMapping');
    // console.log(this.get('node'));
    for (let property of Object.keys(curation)) {
      const sensorName = curation[property];
      let propertyList = sensorMap.get(sensorName);
      if (!propertyList) {
        propertyList = [];
        sensorMap.set(sensorName, propertyList);
      }
      propertyList.push(property);
    }
    return sensorMap;
  }),

  seedTimeline(timeline, nodeId, sensor, property) {
    const q = this.get('query');
    q.getSensorObservations(nodeId, 'ArrayOfThings', sensor)
    .then(observations => {
      // Streaming observations might "beat" the historical observations in,
      // so throw historical observations onto front.
      const trimmed = observations.map(obs => {
        return {'val': obs.results[property],
          'datetime': obs.datetime};
      });
      timeline.unshift(...trimmed);
    });
  },

  /**
   * Create the data structure that will be used to store live observations.
   * foi: {property: [observations], prop2: [observations]}
   * **/
  streams: Ember.computed('sensorMap', function() {
    const sensorMap = this.get('sensorMap'),
      streams = {},
      nodeId = this.get('node.id');
    // Leaf-level map from observed property
    // to observable array of observations.
    sensorMap.forEach((list, sensor) => {
      for (let namespacedProperty of list) {
        // Split on first `.` only.
        // Can have weird cases like particulate.2.5
        // for particulate matter of length 2.5
        const [foi, property] = namespacedProperty.split('.', 2);
        if (!(foi in streams)) {
          streams[foi] = {};
        }
        const timeline = Ember.A([]);
        streams[foi][property] = timeline;
        this.seedTimeline(timeline, nodeId, sensor, property);
      }
    });
    return streams;
  }),

  /*
    We need to trigger this ourselves.
   */
  openSocket: Ember.on('didReceiveAttrs',Ember.observer('node.id', 'sensorMap', function() {
    // console.log('Opening socket');
    // Close old socket?
    const id = this.get('node.id'), sensorMap = this.get('sensorMap');
    const socket = this.get('query').getSocketForNode(id, ...sensorMap.keys());
    socket.on('data', this.appendObservation, this);
  })),

  appendObservation(newObs) {
    // console.log('Got obs', newObs);
    const streams = this.get('streams');
    const foi = newObs.feature_of_interest;
    if (!(foi in streams)) {
      return; // We don't care about this feature.
    }
    // Throw onto correct stream...
    const results = newObs.results;
    const sensorMap = this.get('sensorMap');
    for (let property in results) {
      const shouldAdd = sensorMap.get(newObs.sensor).includes(`${foi}.${property}`);
      if (shouldAdd) {
        // console.log()
        const record = {'val': results[property], 'datetime': newObs.datetime};
        streams[foi][property].pushObject(record);
        // console.log(streams[foi][property]);
      }
    }
  }



});
