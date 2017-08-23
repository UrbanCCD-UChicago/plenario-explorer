import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  dataset_name: i => `test_event_dataset_${i}`,
  count: 6836,
  items: [
    {
      count: 1262,
      datetime: '2010-01-01',
    },
    {
      count: 1460,
      datetime: '2011-01-01',
    },
    {
      count: 1032,
      datetime: '2012-01-01',
    },
    {
      count: 1187,
      datetime: '2013-01-01',
    },
    {
      count: 1074,
      datetime: '2014-01-01',
    },
    {
      count: 821,
      datetime: '2015-01-01',
    },
  ],
});
