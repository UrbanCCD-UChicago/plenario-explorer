import Ember from 'ember';
import utc from '../utils/utc-8601';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: ['viewType', 'nodeId'],
  query: Ember.inject.service(),
  viewType: 'live',

  modelArrived: Ember.observer('model', function() {
    const nodeList = this.get('model.nodes');
    const nodeTuples = nodeList.map(node => {
      return [node.properties.id, node.properties];
    });
    const nodeMap = new Map(nodeTuples);
    this.set('nodeMap', nodeMap);
    this.set('nodeId', nodeList[0].properties.id);
  }),

  selectedNodeMeta: Ember.computed('nodeId', function() {
    const nodeMap = this.get('nodeMap');
    return nodeMap.get(this.get('nodeId'));
  }),

  actions: {
    onSelect(nodeId) {
      this.set('nodeId', nodeId);
    },
    download(params) {
      // const params = {
      //   networkId: 'plenario_development',
      //   startDatetime: utc(moment().subtract(10, 'days')),
      //   endDatetime: utc(moment()),
      //   nodes: 'sensor_dev_1',
      //   features: ['temperature', 'gas_concentration']
      // };
      this.get('query').sensorDownload(params).then(resp => {
        this.transitionToRoute('datadump.download', resp.ticket, {queryParams: {data_type: 'csv'}});
      });
      // this.transitionToRoute('datadump.download', 'e094ef726cede25091fea4b3bf4d783a', {queryParams: {data_type: 'csv'}});
      // ticket["ticket"], {data: params}
    }
  }
});
