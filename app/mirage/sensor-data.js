import moment from 'moment';

function generateTimestamps() {
  // Get 5 minutes of timestamps at 30 second sampling rate
  const nowStamp = moment().format();
  const timestamps = [];
  for (let secondsAgo = 30; secondsAgo <= 300; secondsAgo += 30) {
    console.log(secondsAgo);
    const now = moment(nowStamp);
    timestamps.push(now.subtract(secondsAgo, 'seconds').format());
  }
  return timestamps.reverse();
}

function generateTempObservations(nodeId) {
  const timestamps = generateTimestamps();
  return timestamps.map(ts => {
    return {
      "feature_of_interest":"temperature",
      "node_id":nodeId,
      "sensor":"tempx",
      "results":{
        "temperature": 19 + Math.floor(Math.random() * 10)
      },
      "datetime":ts
    };
  });
}

function generateGasObservations(nodeId) {
  const timestamps = generateTimestamps();
  return timestamps.map(ts => {
    return {
      "feature_of_interest":"gas_concentration",
      "node_id":nodeId,
      "sensor":"gasx",
      "results":{
        "co":null,
        "so2":null,
        "o3":null,
        "h2s": (Math.random()*(3/4)),
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
        "type": "Feature",
        "properties": {
          "info": {
            "orientation":{
              "value":"NE",
              "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
            },
            "height":{
              "value":5,
              "unit":"meters"
            }
          },
          "sensors": ["tempx", "gasx"],
          "id": "00A",
          "network_name": "array_of_things"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-87.675825, 41.852179]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": {
            "orientation":{
              "value":"SW",
              "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
            },
            "height":{
              "value":5,
              "unit":"meters"
            }
          },
          "sensors": ["tempx", "gasx"],
          "id": "00B",
          "network_name": "array_of_things"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-87.634678, 41.878874]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "info": {
            "orientation":{
              "value":"SW",
              "unit":"Cardinal directions. One of N, NE, E, SE, S, SW, W, NW"
            },
            "height":{
              "value":5,
              "unit":"meters"
            }
          },
          "sensors": ["tempx", "gasx"],
          "id": "00C",
          "network_name": "array_of_things"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-87.658195, 41.871716]
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
        "name": "temperature",
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
          "gas_concentration.h2s"
        ]
      }
    ]
  },

  featuresOfInterest: {
    "data":[
      {
        "name":"gas_concentration",
        "observed_properties":[
          {
            "type":"numeric",
            "name":"h2s",
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
          "gas_concentration",
          "temperature"
        ],
        "name":"ArrayOfThings"
      }
    ]
  },
};

export {sensorData, generateGasObservations, generateTempObservations};
