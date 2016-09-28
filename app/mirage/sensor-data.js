import moment from 'moment';

function generateTimestamps() {
  // Get 5 minutes of timestamps at 30 second sampling rate
  const nowStamp = moment().format();
  const timestamps = [];
  for (let secondsAgo = 30; secondsAgo <= 300; secondsAgo += 30) {
    // console.log(secondsAgo);
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
    "meta": {
      "query": {
        "network_name": "plenario_development"
      },
      "message": [

      ],
      "total": 2
    },
    "data": [
      {
        "geometry": {
          "type": "Point",
          "coordinates": [
            -87.6598,
            41.8781
          ]
        },
        "type": "Feature",
        "properties": {
          "info": null,
          "sensors": [
            "sensor_dev_1",
            "sensor_dev_4"
          ],
          "network_name": "plenario_development",
          "id": "node_dev_1"
        }
      },
      {
        "geometry": {
          "type": "Point",
          "coordinates": [
            -87.6698,
            41.8781
          ]
        },
        "type": "Feature",
        "properties": {
          "info": null,
          "sensors": [
            "sensor_dev_2",
            "sensor_dev_3"
          ],
          "network_name": "plenario_development",
          "id": "node_dev_2"
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
    "meta": {
      "query": {
        "network_name": "plenario_development"
      },
      "message": [

      ],
      "total": 1
    },
    "data": [
      {
        "sensors": [
          "sensor_dev_3",
          "sensor_dev_2",
          "sensor_dev_1",
          "sensor_dev_4"
        ],
        "info": {
          "description": "A developer network that does not contain any live nodes. Experimentation highly encouraged.",
          "author": "Jesse"
        },
        "nodes": [
          "node_dev_1",
          "node_dev_2"
        ],
        "features_of_interest": [
          "magnetic_field",
          "gas_concentration",
          "temperature",
          "relative_humidity"
        ],
        "name": "plenario_development"
      }
    ]
  },
  curation: [
    {
      "id": "temperature.temperature",
      "name": "Temperature",
      "unit": "°C",
      "sensor": "sensor_dev_4"
    },
    {
      "id": "humidity.humidity",
      "name": "Relative Humidity",
      "unit": "%",
      "sensor": "sensor_dev_2"
    },
    {
      "id": "gas_concentration.n23",
      "name": "Nitrogen Concentration3",
      "unit": "ppm3",
      "sensor": "sensor_dev_3"
    },
    {
      "id": "gas_concentration.co2",
      "name": "Carbon Dioxide Concentration",
      "unit": "ppm",
      "sensor": "sensor_dev_3"
    },
    {
      "id": "gas_concentration.o2",
      "name": "Oxygen Concentration",
      "unit": "ppm",
      "sensor": "sensor_dev_4"
    }
  ]
};



export {sensorData, generateGasObservations, generateTempObservations};
