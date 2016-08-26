import Ember from 'ember';
import moment from 'moment';


    // Use all params to construct connection
    // Create Datastructure that maps foi name
    // to E.A for all FOIs.


    // Can use #each-in hbs helper to iterate over FOI name and array

export default Ember.Component.extend({
  //io: Ember.inject.service('socket-io'),
  query: Ember.inject.service('query'),



  //serverUrl: 'localhost:8081',

  // streamingObservations: Ember.A([]),

  // Need to observe node,
  // And initiate new connection when it changes

  Stream: Ember.Object.extend({
    init() {
      const [nodeId, networkId, foiList] = this.getProperties('nodeId', 'networkId', 'foiList');
      const socket = this.get('query').getSocketForNode(nodeId, networkId, foiList);

      // Assign each feature of interest an observable array
      // CORRECTION: I'll need to flatmap the FOI observed_properties
      const observationMap = {};
      foiList.forEach(featureName => {
        observationMap[featureName] = Ember.A([]);
      });
      this.set('observationMap', observationMap);
    },

    appendObservations(newObs) {
      const series = this.get('observationMap');
      series.pushObject([moment(), newObs.results]);
      this.set('streamingSeries', [{
        'data': series.toArray(),
        'name': ''
      }]);
    }

//socket.on('data', appendObservations, this);

  }),

  // connection: Ember.computed('node', function(){
    // Wipe out the old records when the node changes
    //this.set('streamingObservations', Ember.A([]));
    /*
      Add query params based on identity of node a la
     var socket = require('socket.io-client')('http://streaming.plenar.io?sensor_network=ArrayOfThings&' +
     'features_of_interest=temperature&' +
     'nodes=00A,00B&' +
     'sensors=HTU21D');
     */
    //const socket = this.get('io').socketFor('localhost:8081');

  // }),

  init() {
    this._super(...arguments);
    // this.get('query').getSensorObservations('00A', 'ArrayOfThings', ['gasx'])
    //   .then(observations => {console.log(observations);});

    const socket = this.get('query').getSocketForNode('00A', 'ArrayOfThings');

    //const socket = this.get('io').socketFor('localhost:8081');

    // const appendObservations = function (newObs) {
    //   const series = this.get('streamingObservations');
    //   series.pushObject([moment(), newObs.results]);
    //   this.set('streamingSeries', [{
    //     'data': series.toArray(),
    //     'name': ''
    //   }]);
    // };

    const logObservations = function(newObs) {
      //console.log(newObs);
    };

    socket.on('data', logObservations, this);

  }
});
