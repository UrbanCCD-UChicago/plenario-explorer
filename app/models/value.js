import Ember from 'ember';

class Value {
  constructor(initHash) {
    Ember.merge(this, initHash);
    this.id = `${this.featureOfInterest}.${this.observedProperty}`;
  }

  static adaptFromAPI(record) {
    const initHashProto = {
      'featureOfInterest': record.feature_of_interest,
      'nodeId': record.node_id,
      'sensor': record.sensor,
      'datetime': record.datetime
    };

    // Potentially a sparse mapping of properties like
    //   "results":{
    //     "co":null,
    //     "so2":null,
    //     "o3":null,
    //     "h2s":Math.floor(Math.random() * 100),
    //     "no2":null
    //   }
    const results = record.results;

    // Construct one value for each non-null observed property
    const values = [];
    // console.log(results);
    for (let obsProp of Object.keys(results)) {
      // console.log(obsProp);
      const initHash = Ember.copy(initHashProto);
      // Properties will frequently be null.
      // Best to just not pass those along.
      if (results[obsProp]) {
        initHash.observedProperty = obsProp;
        initHash.value = results[obsProp];
        values.push(new Value(initHash));
      }
    }
    return values;
  }

}

export {Value};