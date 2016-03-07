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
      "title": "Time span available",
      "template": "time-span"
    }
  ]
});
