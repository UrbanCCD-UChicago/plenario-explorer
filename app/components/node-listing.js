import Ember from "ember";

export default Ember.Component.extend({
  columns: [
    {
      'title': 'Node ID',
      'propertyName': 'properties.id',
      'template': 'node-link'
    },
    {
      'title': 'Location',
      'propertyName': 'geometry.coordinates'
    }
  ],
  customMessages: {
    "searchLabel": "Filter on text:",
    "tableSummary": "Showing %@ - %@ of %@",
    "noDataToShow": "Could not find any nodes matching your filters"
  },
  pageSizeValues: Ember.A([5, 10, 25, 50]),
  customClasses: {"globalFilterWrapper": "pull-left bottom-breathe"}
});
