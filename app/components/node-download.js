import Ember from 'ember';
import moment from 'moment';
import utc from '../utils/utc-8601';
import SensorMap from '../utils/sensor-map';
// import dateFormat from '../utils/date-format';

export default Ember.Component.extend({
  query: Ember.inject.service(),
  availableFeatures: Ember.computed('curation', 'nodeMeta', function () {
    // Clone curatedFeatures. We'll be mutating it.
    const curation = this.get('curation');
    const curatedTypes = curation.curatedTypes;
    const curatedFeatures = curation.curatedFeatures.map(obj => Ember.copy(obj));
    const { sensors } = this.get('nodeMeta');
    // Which features are represented in this node's sensors?
    const availableFeatureNames = new SensorMap(curatedTypes, sensors).features;
    const availableSet = new Set(availableFeatureNames);
    const availableFeatures = curatedFeatures.filter(({ id }) => availableSet.has(id));
    for (const feat of availableFeatures) {
      feat.label = `${feat.name} - ${feat.description}.`;
    }
    return availableFeatures;
  }),
  selectedFeatures: Ember.computed('availableFeatures', function () {
    const selected = {};
    for (const { id } of this.get('availableFeatures')) {
      selected[id] = false;
    }
    return selected;
  }),

  actions: {
    download() {
      const to8601Date = dateStr => moment(dateStr).utc().format('YYYY-MM-DD');
      const startDate = to8601Date(this.get('startDate'));
      const endDate = to8601Date(this.get('endDate'));
      const featureHash = this.get('selectedFeatures');
      const features = Object.keys(featureHash).filter(f => featureHash[f]);
      const node = this.get('nodeMeta').id;

      const params = {
        networkId: 'array_of_things_chicago',
        startDatetime: startDate,
        endDatetime: endDate,
        nodes: node,
        features,
      };

      this.get('download')(params);
    },
  },
  // Seed date selectors
  startDate: utc(moment().subtract(7, 'days')),
  endDate: utc(moment()),

});
