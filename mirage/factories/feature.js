import { Factory, faker } from 'ember-cli-mirage';
import _ from 'npm:lodash';

export default Factory.extend({
  // properties(i) {
  //   return [
  //     {
  //       common_name: `Property Type ${i}: ${this.name}`,
  //       name: faker.lorem.words(1),
  //       type: 'FLOAT',
  //     },
  //   ];
  // },
  // name: i => `property_type_${i}`,
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
});

// {
//   properties: [
//     {
//       common_name: 'Light Intensity: 500nm',
//       name: '500nm',
//       type: 'FLOAT',
//     },
//     {
//       common_name: 'Light Intensity: 940nm',
//       name: '940nm',
//       type: 'FLOAT',
//     },
//     {
//       common_name: 'Light Intensity: 640nm',
//       name: '640nm',
//       type: 'FLOAT',
//     },
//     {
//       common_name: 'Light Intensity: 700nm',
//       name: '700nm',
//       type: 'FLOAT',
//     },
//     {
//       common_name: 'Light Intensity: 365nm',
//       name: '365nm',
//       type: 'FLOAT',
//     },
//   ],
//     name: 'light_intensity',
// }
