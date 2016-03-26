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
    }
  ],
  sortProperties: Ember.A(['arrivalOrder:asc'])
});
