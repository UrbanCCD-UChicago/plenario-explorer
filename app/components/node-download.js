import Ember from 'ember';
import utc from '../utils/utc-8601';
import moment from 'moment';
//import dateFormat from '../utils/date-format';

export default Ember.Component.extend({
  query: Ember.inject.service(),

  actions: {
    download() {
      const to8601Date = dateStr => moment(dateStr).utc().format("YYYY-MM-DD");
      const startDate = to8601Date(this.get('startDate'));
      const endDate = to8601Date(this.get('endDate'));

      const params = {
        networkId: 'plenario_development',
        startDatetime: startDate,
        endDatetime: endDate,
        nodes: this.get('nodeId'),
        features: ['temperature', 'gas_concentration']
      };
      this.get('download')(params);
      // this.get('query').sensorDownload(params).then(resp => {
      //   this.transitionToRoute('datadump.download', resp.ticket, {queryParams: {data_type: 'csv'}});
      // });
      // this.transitionToRoute('datadump.download', 'e094ef726cede25091fea4b3bf4d783a', {queryParams: {data_type: 'csv'}});
      // ticket["ticket"], {data: params}
    }
  },
  // Seed date selectors
  startDate: utc(moment().subtract(7, 'days')),
  endDate: utc(moment())

});
