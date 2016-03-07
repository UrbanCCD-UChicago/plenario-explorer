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
      "propertyName": "num_shapes"
    },
    {
      "title": "Download",
      "template": "shape-download-link"
    }
  ]
});
