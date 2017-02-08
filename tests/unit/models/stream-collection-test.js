// import Ember from 'ember';
// import { moduleFor, test } from 'ember-qunit';
// import {promisify} from '../../../utils/promisify';
// import moment from 'moment';
// import wait from 'ember-test-helpers/wait';
//
// const now = moment().format();
// const aLittleBitAgo = moment().subtract(30, 'seconds').format();
//
//
// const queryStub = Ember.Service.extend({
//   getSensorObservations() {
//     // Caller expects Promise with
//     // array of observations.
//     return promisify([
//       {
//         "feature_of_interest":"gas_concentration",
//         "node_id":'00A',
//         "sensor":"gasx",
//         "results":{
//           "co": 1,
//           "so2": 56,
//           "o3": 12,
//           // The one we care about is h2s.
//           "h2s": 42,
//           "no2": 22
//         },
//         "datetime": aLittleBitAgo
//       }
//     ]);
//   },
//   getSocketForNode() {
//     return {
//       on(messageStr, callback, context) {
//         // messageStr should be 'data'
//         const obs = {
//           "feature_of_interest":"gas_concentration",
//           "node_id":'00A',
//           "sensor":"gasx",
//           "results":{
//             "co": 1,
//             "so2":56,
//             "o3": 12,
//             "h2s": 45,
//             "no2": 22
//           },
//           "datetime": now
//         };
//         // Return the observation in a quarter second
//         Ember.run.later(() => callback.call(context, obs), 250);
//
//       }
//     };
//   },
// });
//
// const curationStub = Ember.Service.extend({
//   observedPropertiesFor() {
//     return [
//       {
//         id: 'gas_concentration.h2s',
//         name: 'Hydrogen Sulfide Concentration',
//         unit: 'ppm',
//         sensor: 'gasx'
//       }
//     ];
//   }
// });
//
//
// moduleFor('model:stream-collection', 'Integration | Component | stream collection', {
//   unit: true,
//
//   beforeEach: function () {
//     this.register('service:query', queryStub);
//     this.register('service:curation', curationStub);
//     this.inject.service('query', { as: 'query' });
//     this.inject.service('curation', { as: 'curation' });
//   }
//
// });
//
// test('it initializes the streams', function(assert) {
//   const done = assert.async();
//   const streamsCollection = this.subject();
//   // Effectively disables stream truncation
//   streamsCollection.set('windowMinutes', 5256000);
//   const streams = streamsCollection.createFor('00A');
//   wait().then(() => {
//     assert.ok('gas_concentration.h2s' in streams);
//     const vals = streams['gas_concentration.h2s'].mapBy('value');
//     assert.deepEqual(vals, [42, 45]);
//     done();
//   });
// });
//
// const valueTimes = [
//   '2016-09-09T17:21:30+00:00',
//   '2016-09-09T17:22:30+00:00',
//   '2016-09-09T17:23:30+00:00',
//   '2016-09-09T17:24:30+00:00'
// ];
// const mockValues = valueTimes.map(time => ({'datetime': time}));
// function format(dateStr) {
//   return moment(dateStr).utc().format();
// }
//
// test('stream truncation works on expected case', function(assert) {
//   const mockStream = Ember.A(mockValues);
//   const cutoffTime = format('2016-09-09T17:22:31+00:00');
//   this.subject().truncateHead(mockStream, cutoffTime);
//   assert.equal(mockStream.length, 2);
//
//   const expectedStillInWindow = valueTimes.slice(2);
//   assert.deepEqual(mockStream.mapBy('datetime'), expectedStillInWindow);
// });
//
// test('stream truncation works on empty stream', function(assert) {
//   const emptyStream = Ember.A([]);
//   const cutoffTime = format('2016-09-09T17:22:31+00:00');
//   this.subject().truncateHead(emptyStream, cutoffTime);
//   assert.deepEqual(emptyStream, Ember.A([]));
// });
//
// test('stream truncation works when entire stream is old', function(assert) {
//   const mockStream = Ember.A(mockValues);
//   const cutoffTime = format('2016-09-09T17:25:31+00:00');
//   this.subject().truncateHead(mockStream, cutoffTime);
//   assert.deepEqual(mockStream, Ember.A([]));
// });
//
// test('stream truncation works when entire stream is new', function(assert) {
//   const mockStream = Ember.A(mockValues);
//   const cutoffTime = format('2016-09-09T17:20:31+00:00');
//   this.subject().truncateHead(mockStream, cutoffTime);
//   assert.deepEqual(Ember.A(mockValues), mockStream);
// });
