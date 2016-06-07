import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    const teleportState = Ember.Object.create({
      center: this.get("center")
    });
    this.set('teleportState', teleportState);
  },

  //Keep these ids synchronized with the ones defined in leaflet-map.js
  citiesList: [
    {id: "chicago", label: "Chicago"},
    {id: "austin", label: "Austin"},
    {id: "bristol", label: "Bristol, UK"},
    {id: "denver", label: "Denver"},
    {id: "newyork", label: "New York"},
    {id: "sanfrancisco", label: "San Francisco"},
    {id: "seattle", label: "Seattle"},
  ],

  didUpdateAttrs() {
    this.set('teleportState.center', this.get('center'));
  },

  changedCenter: Ember.observer('teleportState.center', function() {
    const city = this.get('teleportState.center');
    this.set('center', city);
  }),

  actions: {
    //Collapse the opened introduction without refreshing the page.
    dismissIntro(){
      $("#collapse-intro").collapse("hide");
    },
  },

});
