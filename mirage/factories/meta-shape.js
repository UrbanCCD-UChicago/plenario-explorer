import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  attribution: faker.company.companyName(),
  description: faker.lorem.sentences(),
  view_url: faker.internet.url(),
  num_shapes: faker.random.number(50000),
  source_url: faker.internet.url(),
  bbox: {
    type: 'Polygon',
    coordinates: [
      [
        [-87.8216065907, 41.6693406136],
        [-87.8216065907, 42.0165829133],
        [-87.5262226891, 42.0165829133],
        [-87.5262226891, 41.6693406136],
        [-87.8216065907, 41.6693406136],
      ],
    ],
  },
  date_added: faker.date.past(4),
  human_name: i => `Test Shape Dataset ${i}`,
  dataset_name: i => `test_shape_dataset_${i}`,
  update_freq: faker.list.random(['daily', 'weekly', 'monthly', 'every month', 'once a year']),
});

// name: i => `test_shape_dataset_${i}`,
// type: 'shape',
// humanName: i => `Test Shape Dataset ${i}`,
// provider: faker.company.companyName(),
// description: faker.lorem.sentences(),
// dateAdded: faker.date.past(4),
// oldest: faker.date.between(moment().subtract(10, 'years'), moment().subtract(1, 'months')),
// newest: faker.date.between(moment().subtract(1, 'months'), moment().add(1, 'months')),
// lastUpdate: faker.date.between(moment().subtract(1, 'months'), moment()),
// updateFreq: faker.list.random(['daily', 'weekly', 'monthly', 'every month', 'once a year']),
// bbox: {
//   coordinates: [
//     [
//       [-87.8216065907, 41.6693406136],
//       [-87.8216065907, 42.0165829133],
//       [-87.5262226891, 42.0165829133],
//       [-87.5262226891, 41.6693406136],
//       [-87.8216065907, 41.6693406136],
//     ],
//   ],
//   type: 'Polygon',
// },
// totalCount() {
//   return this.type === 'shape' ? faker.random.number(50000) : undefined;
// },
// urls: {
//   source: faker.internet.url(),
//   view: faker.internet.url(),
// },
// downloadFormats: [
//   { name: 'Foo', ext: '.foo', downloadType: 'foo' },
//   { name: 'Bar', ext: '.bar', downloadType: 'bar' },
//   { name: 'Baz Archive', ext: '.bazip', downloadType: 'compressed' },
// ],
