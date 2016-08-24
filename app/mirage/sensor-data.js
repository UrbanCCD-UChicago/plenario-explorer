import moment from 'moment';

function generateTimestamps() {
  // Get 5 minutes of timestamps at 30 second sampling rate
  const now = moment();
  const timestamps = [];
  for (let secondsAgo = 30; secondsAgo <= 300; secondsAgo += 30) {
    timestamps.push(now.subtract(secondsAgo, 'seconds').format());
  }
  return timestamps;
}

function generateTempObservations(nodeId) {
  const timestamps = generateTimestamps();
  return timestamps.map(ts => {
    return {
      "feature_of_interest":"temperature",
      "node_id":nodeId,
      "sensor":"tempx",
      "results":{
        "temperature": Math.floor(Math.random() * 100)
      },
      "datetime":ts
    };
  });
}

function generateGasObservations(nodeId) {
  const timestamps = generateTimestamps();
  return timestamps.map(ts => {
    return {
      "feature_of_interest":"gasconcentration",
      "node_id":nodeId,
      "sensor":"gasx",
      "results":{
        "co":null,
        "so2":null,
        "o3":null,
        "h2s":Math.floor(Math.random() * 100),
        "no2":null
      },
      "datetime":ts
    };
  });
}

const sensorData = {
  nodes: {
    "data":
    [
      {
        "info":{
          "orientation":{
            "value":"NE",
            "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
          },
          "height":{
            "value":5,
            "unit":"meters"
          }
        },
        "network_name":"ArrayOfThings",
        "id":"00A",
        "sensors": ["tempx", "gasx"],
        "location":{
          "lat":41.8781,
          "lon":-87.6298,
        }
      },
      {
        "info":{
          "orientation":{
            "value":"NE",
            "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
          },
          "height":{
            "value":5,
            "unit":"meters"
          }
        },
        "network_name":"ArrayOfThings",
        "id":"00B",
        "sensors": ["tempx", "gasx"],
        "location":{
          "lat":41.8851,
          "lon":-87.7468
        }
      }
    ]
  },

  sensors: {
    "data": [
      {
        "info": {
          "datasheet": "http://www.mcs.anl.gov/research/projects/waggle/downloads/datasheets/chemsense/so2.pdf",
          "range": "0 to 20 ppm",
          "accuracy": "+-3% of reading"
        },
        "name": "Temperature",
        "id": "tempx",
        "observed_properties": [
          "temperature.temperature"
        ]
      },
      {
        "info": {
          "datasheet": "http://www.mcs.anl.gov/research/projects/waggle/downloads/datasheets/chemsense/h2s.pdf",
          "range": "0 to 20 ppm",
          "accuracy": "+-3% of reading"
        },
        "name": "Hydrogen Sulfide",
        "id": "gasx",
        "observed_properties": [
          "gasConcentration.H2S"
        ]
      }
    ]
  },

  featuresOfInterest: {
    "data":[
      {
        "name":"gasConcentration",
        "observed_properties":[
          {
            "type":"numeric",
            "name":"H2S",
            "unit":"ppm",
            "description":"Hydrogen Sulfide concentration"
          }
        ]
      },
      {
        "name":"temperature",
        "observed_properties":[
          {
            "type":"double precision",
            "name":"temperature",
            "unit":"degrees Celsius"
          }
        ]
      }
    ]
  },

  network: {
    "data": [
      {
        "info":{
          "website":"aot.org",
          "contact":"admin@aot.org"
        },
        "nodes":[
          "00A", "00B"
        ],
        "features_of_interest":[
          "gasConcentration",
          "temperature"
        ],
        "name":"ArrayOfThings"
      }
    ]
  }
};

export {sensorData, generateGasObservations, generateTempObservations};
