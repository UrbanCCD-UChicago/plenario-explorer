import Ember from 'ember';

const DownloadMenu = Ember.Component.extend({

  api: Ember.inject.service('plenario-api'),

  direction: 'down',

  actions: {
    downloadDataset(downloadType, filterDownload) {
      const api = this.get('api');

      const qp = filterDownload ? this.get('queryParams') : {};
      qp.downloadType = downloadType;

      const url = api.adapter.buildDownloadURL(this.get('datasetObject'), qp);

      window.open(url);
    },
  },

});

DownloadMenu.reopenClass({
  positionalParams: ['datasetObject'],
});

export default DownloadMenu;
