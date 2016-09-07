import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import {promisify} from '../../../utils/promisify';
import moment from 'moment';
import wait from 'ember-test-helpers/wait';

const now = moment().format();
const aLittleBitAgo = moment().subtract(30, 'seconds').format();


const queryStub = Ember.Service.extend({
  getSensorObservations() {
    // Caller expects Promise with
    // array of observations.
    return promisify([
      {
        "feature_of_interest":"gas_concentration",
        "node_id":'00A',
        "sensor":"gasx",
        "results":{
          "co": 1,
          "so2": 56,
          "o3": 12,
          // The one we care about is h2s.
          "h2s": 42,
          "no2": 22
        },
        "datetime": aLittleBitAgo
      }
    ]);
  },
  getSocketForNode() {
    return {
      on(messageStr, callback, context) {
        // messageStr should be 'data'
        const obs = {
          "feature_of_interest":"gas_concentration",
          "node_id":'00A',
          "sensor":"gasx",
          "results":{
            "co": 1,
            "so2":56,
            "o3": 12,
            "h2s": 45,
            "no2": 22
          },
          "datetime": now
        };
        // Return the observation in a half second
        Ember.run.later(() => callback.call(context, obs), 500);

      }
    };
  },
});

const curationStub = Ember.Service.extend({
  observedPropertiesFor() {
    return [
      {
        id: 'gas_concentration.h2s',
        name: 'Hydrogen Sulfide Concentration',
        unit: 'ppm',
        sensor: 'gasx'
      }
    ];
  }
});


moduleFor('model:stream-collection', 'Integration | Component | stream collection', {
  unit: true,

  beforeEach: function () {
    this.register('service:query', queryStub);
    this.register('service:curation', curationStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "locationService" within each test
    this.inject.service('query', { as: 'query' });
    this.inject.service('curation', { as: 'curation' });
    console.log('Survived stubbing');
  }

});

test('it renders', function(assert) {
  console.log(this.subject(), 'hey');
  const done = assert.async();
  const someThing = this.subject();
  wait().then(() => {
    console.log(someThing);
    console.log(someThing.get('streams'));
    console.log('Oh I get it');
    assert.ok(false);
    done();
  });
});
