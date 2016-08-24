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
        "sensors": ["trs4", "xr9"],
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
        "sensors": ["trs4", "xr9"],
        "location":{
          "lat":41.8851,
          "lon":-87.7468
        }
      }
    ]
  },

  // nodesMocked: {
  //   'data':
  //   [
  //     {
  //       "type": "Feature",
  //       "properties": {
  //         "network_name": "ArrayOfThings",
  //         "id": "00A"
  //       },
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [
  //           -87.6298,
  //           41.8781
  //         ]
  //       }
  //     },
  //     {
  //       "type": "Feature",
  //       "properties": {
  //         "network_name": "ArrayOfThings",
  //         "id": "00B",
  //         "sensors": []
  //       },
  //       "geometry": {
  //         "type": "Point",
  //         "coordinates": [
  //           -87.7468,
  //           41.8851
  //         ]
  //       }
  //     }
  //   ]
  // },

  sensors: {
    "data": [
      {
        "info": {
          "datasheet": "http://www.mcs.anl.gov/research/projects/waggle/downloads/datasheets/chemsense/so2.pdf",
          "range": "0 to 20 ppm",
          "accuracy": "+-3% of reading"
        },
        "name": "Temperature",
        "id": "trs4",
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
        "id": "xr9",
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
          "00A"
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

export default sensorData;
