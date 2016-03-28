import Ember from 'ember';

export default Ember.Component.extend({
  columns: [
    {
      "title": "Source",
      "propertyName": "attribution"
    },
    {
      "title": "Dataset Name",
      "template": "display-link"
    },
    {
      "title": "Count",
      "propertyName": "count"
    },
    {
      "title": "Trend",
      "template": "chart-wrapper"
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
    "noDataToShow": "Loading timeseries..."
  },
  sortProperties: Ember.A(['arrivalOrder:asc'])
});
