import MockNetwork from './mock-network';

const sensorData = {
  nodes: {
    meta: {
      query: {
        network: 'plenario_development',
      },
      message: [

      ],
      total: 2,
    },
    data: [
      {
        geometry: {
          type: 'Point',
          coordinates: [
            -87.6598,
            41.8781,
          ],
        },
        type: 'Feature',
        properties: {
          info: null,
          sensors: [
            'sensor_dev_1',
            'sensor_dev_4',
          ],
          network: 'plenario_development',
          id: 'node_dev_1',
        },
      },
      {
        geometry: {
          type: 'Point',
          coordinates: [
            -87.6698,
            41.8781,
          ],
        },
        type: 'Feature',
        properties: {
          info: null,
          sensors: [
            'sensor_dev_2',
            'sensor_dev_3',
          ],
          network: 'plenario_development',
          id: 'node_dev_2',
        },
      },
    ],
  },
  sensors: {
    data: [
      {
        info: null,
        name: 'sensor_dev_1',
        properties: [
          'magnetic_field.y',
          'magnetic_field.x',
        ],
      },
      {
        info: null,
        name: 'sensor_dev_4',
        properties: [
          'gas_concentration.o2',
          'magnetic_field.z',
          'temperature.temperature',
        ],
      },
      {
        info: null,
        name: 'sensor_dev_3',
        properties: [
          'gas_concentration.n2',
          'gas_concentration.co2',
        ],
      },
      {
        info: null,
        name: 'sensor_dev_2 ',
        properties: [
          'relative_humidity.humidity',
        ],
      },
    ],
    meta: {
      message: null,
      query: {
        network: 'plenario_development',
        sensors: [
          null,
        ],
      },
      total: 4,
    },
  },
  curation: {
    curatedTypes: [
      {
        id: 'temperature.temperature',
        name: 'Temperature',
        unit: '°C',
        sensor: 'sensor_dev_4',
      },
      {
        id: 'relative_humidity.humidity',
        name: 'Relative Humidity',
        unit: '%',
        sensor: 'sensor_dev_2',
      },
      {
        id: 'gas_concentration.n2',
        name: 'Nitrogen Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_3',
      },
      {
        id: 'gas_concentration.co2',
        name: 'Carbon Dioxide Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_3',
      },
      {
        id: 'gas_concentration.o2',
        name: 'Oxygen Concentration',
        unit: 'ppm',
        sensor: 'sensor_dev_4',
      },
    ],
    curatedFeatures: [
      {
        id: 'gas_concentration',
        name: 'Gas Concentration',
        description: 'parts per million concentration of gases that affect air quality, including nitrogen dioxide and ozone',
      },
      {
        id: 'temperature',
        name: 'Temperature',
        description: 'temperature in degrees Celsius',
      },
      {
        id: 'humidity',
        name: 'Humidity',
        description: 'relative humidity',
      },
    ],
  },
};

const mockNetwork = new MockNetwork(sensorData.curation.curatedTypes, sensorData.nodes.data);


export { sensorData, mockNetwork };
