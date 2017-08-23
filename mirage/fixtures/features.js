export default [
  {
    properties: [
      {
        common_name: 'Atmospheric Pressure',
        name: 'pressure',
        type: 'INT',
      },
    ],
    name: 'atmospheric_pressure',
  },
  {
    properties: [
      {
        name: 'x',
        type: 'INT',
      },
      {
        name: 'y',
        type: 'INT',
      },
      {
        name: 'z',
        type: 'INT',
      },
    ],
    name: 'acceleration',
  },
  {
    properties: [
      {
        common_name: 'Light Intensity: 500nm',
        name: '500nm',
        type: 'FLOAT',
      },
      {
        common_name: 'Light Intensity: 940nm',
        name: '940nm',
        type: 'FLOAT',
      },
      {
        common_name: 'Light Intensity: 640nm',
        name: '640nm',
        type: 'FLOAT',
      },
      {
        common_name: 'Light Intensity: 700nm',
        name: '700nm',
        type: 'FLOAT',
      },
      {
        common_name: 'Light Intensity: 365nm',
        name: '365nm',
        type: 'FLOAT',
      },
    ],
    name: 'light_intensity',
  },
  {
    properties: [
      {
        common_name: 'Gas Concentration: SO2',
        name: 'so2',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: H2S',
        name: 'h2s',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: NO2',
        name: 'no2',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: O3',
        name: 'o3',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: CO',
        name: 'co',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: Oxidizing Gases',
        name: 'oxidizing_gases',
        type: 'FLOAT',
      },
      {
        common_name: 'Gas Concentration: Reducing Gases',
        name: 'reducing_gases',
        type: 'FLOAT',
      },
    ],
    name: 'gas_concentration',
  },
  {
    properties: [
      {
        common_name: 'Relative Humidity',
        name: 'humidity',
        type: 'FLOAT',
      },
    ],
    name: 'relative_humidity',
  },
  {
    properties: [
      {
        name: 'x',
        type: 'INT',
      },
      {
        name: 'y',
        type: 'INT',
      },
      {
        name: 'z',
        type: 'INT',
      },
    ],
    name: 'orientation',
  },
  {
    properties: [
      {
        common_name: 'Temperature',
        unit: 'celsius',
        name: 'temperature',
        type: 'FLOAT',
      },
      {
        unit: 'celsius',
        name: 'internal_temperature',
        type: 'FLOAT',
      },
    ],
    name: 'temperature',
  },
  {
    properties: [
      {
        name: 'x',
        type: 'FLOAT',
      },
      {
        name: 'y',
        type: 'FLOAT',
      },
      {
        name: 'z',
        type: 'FLOAT',
      },
    ],
    name: 'magnetic_field',
  },
];
