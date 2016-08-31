export default class ObservedProperty{
  all() {
    return allProperties;
  }
};

const allProperties = [
  {
    id: 'temperature.temperature',
    name: 'Temperature',
    unit: '°C',
    sensor: 'tempx'
  },
  {
    id: 'gas_concentration.h2s',
    name: 'Hydrogen Sulfide Concentration',
    unit: 'ppm',
    sensor: 'gasx'
  },
];
