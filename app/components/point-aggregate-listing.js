import Ember from 'ember';

export default Ember.Component.extend({
  columns: [
    {
      "title": "Source",
      "propertyName": "attribution"
    },
    {
      "title": "Dataset Name",
      "template": "display-link",
      "sortedBy": "humanName"
    },
    {
      "title": "Count",
      "propertyName": "count"
    },
    {
      "title": "Trend",
      "template": "chart-wrapper",
      "className": "embedded-chart"
    },
    {
      "title": "Download",
      "template": "point-download-link"
    },
    {
      "isHidden": true,
      "title": "Name Plaintext",
      "propertyName": "humanName"
    }
  ],
  customMessages: {
    "searchLabel": "Filter on text:",
    "tableSummary": "Showing %@ - %@ of %@",
    "noDataToShow": "Could not find any data within your filters"
  },
  sortProperties: Ember.A(['arrivalOrder:asc']),
  pageSizeValues: Ember.A([5, 10, 25, 50]),
  customClasses: {"globalFilterWrapper": "pull-left bottom-breathe"}
});
