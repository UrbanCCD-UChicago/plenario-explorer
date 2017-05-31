import Ember from 'ember';

export default Ember.Component.extend({
  columns: [
    {
      title: 'Location',
      component: 'node-listing-minimap',
      className: 'node-listing-minimap-cell',
    },
    {
      title: 'Network',
      propertyName: 'properties.network',
      template: 'node-listing-network',
    },
    {
      title: 'Node ID',
      propertyName: 'properties.id',
      template: 'node-link',
    },
    {
      title: 'Supported Features',
      component: 'node-listing-features',
    },
  ],
  customMessages: {
    searchLabel: 'Filter on text:',
    tableSummary: 'Showing %@ - %@ of %@',
    noDataToShow: 'Could not find any nodes matching your filters',
  },
  pageSizeValues: Ember.A([5, 10, 25, 50]),
  customClasses: { globalFilterWrapper: 'pull-left bottom-breathe' },


});
