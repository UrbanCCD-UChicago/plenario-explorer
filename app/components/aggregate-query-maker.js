import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    const teleportState = Ember.Object.create({
      center: this.get("center")
    });
    this.set('teleportState', teleportState);
    if(this.get('center'))
    {
      if(this.get('center') in this.get('cities'))
      {
        //Translate an initial location to coordinates
        //'centerCoords' is the raw-coordinates form of the human-readable 'center'
        this.set('centerCoords', [this.get(`cities.${this.get('center')}.location`), this.get(`cities.${this.get('center')}.zoom`)]);
      }
    }
  },

  //IDs to populate the dropdwon box.
  //Keep these IDs synchronized with the ones defined in the cities dict below.
  citiesList: [
    {id: "chicago", label: "Chicago"},
    {id: "austin", label: "Austin"},
    {id: "bristol", label: "Bristol, UK"},
    {id: "denver", label: "Denver"},
    {id: "newyork", label: "New York"},
    {id: "sanfrancisco", label: "San Francisco"},
    {id: "seattle", label: "Seattle"},
  ],

  //IDs for cities, their locations and zoom.
  cities: {
    "chicago": {location: [41.795509, -87.581916], zoom: 10},
    "newyork": {location:[40.7268362,-74.0017699], zoom: 10},
    "seattle": {location:[47.6076397,-122.3258644], zoom: 11},
    "sanfrancisco": {location:[37.7618864,-122.4406926], zoom: 12},
    "austin": {location:[30.3075693,-97.7399898], zoom: 10},
    "denver": {location:[39.7534338,-104.890141], zoom: 11},
    "bristol": {location:[51.4590572,-2.5909956], zoom: 11}
  },

  //If the 'center' query parameter changes, then recenter the map
  changedCenter: Ember.observer('teleportState.center', function() {
    const city = this.get('teleportState.center');
    this.set('center', this.get('teleportState.center'));
    this.set('centerCoords', [this.get(`cities.${city}.location`), this.get(`cities.${city}.zoom`)]);
  }),

  actions: {
    //Collapse the opened introduction without refreshing the page.
    dismissIntro(){
      $("#collapse-intro").collapse("hide");
    },
  },

});
