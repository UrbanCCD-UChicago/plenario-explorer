import Ember from 'ember';

export default Ember.Component.extend({
  columns: [
    {
      title: 'Source',
      propertyName: 'attribution',
    },
    {
      title: 'Dataset Name',
      template: 'display-link',
      sortedBy: 'humanName',
    },
    {
      title: 'Count',
      propertyName: 'numShapes',
    },
    {
      title: 'Download',
      template: 'shape-download-link',
    },
    {
      title: 'Name Plaintext',
      propertyName: 'humanName',
      isHidden: true,
    },

  ],
  customMessages: {
    searchLabel: 'Filter on text:',
    tableSummary: 'Showing %@ - %@ of %@',
    noDataToShow: 'Could not find any data within your filters',
  },
  pageSizeValues: Ember.A([5, 10, 25, 50]),
  customClasses: { globalFilterWrapper: 'pull-left bottom-breathe' },
});
