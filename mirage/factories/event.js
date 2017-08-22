import { Factory, faker } from 'ember-cli-mirage';
import moment from 'npm:moment';

export default Factory.extend({
  attribution: faker.company.companyName(),
  description: faker.lorem.sentences(),
  view_url: faker.internet.url(),
  // columns: // not used in this Ember app
  last_update: faker.date.between(moment().subtract(1, 'months'), moment()),
  obs_from: faker.date.between(moment().subtract(10, 'years'), moment().subtract(1, 'months')),
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
  human_name: i => `Test Event Dataset ${i}`,
  obs_to: faker.date.between(moment().subtract(1, 'months'), moment().add(1, 'months')),
  date_added: faker.date.past(4),
  source_url: faker.internet.url(),
  dataset_name: i => `test_event_dataset_${i}`,
  update_freq: faker.list.random(['daily', 'weekly', 'monthly', 'every month', 'once a year']),
});

// name: i => `test_event_dataset_${i}`,
// type: 'event',
// humanName: i => `Test Event Dataset ${i}`,
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
