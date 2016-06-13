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

  cities: {},

  //IDs to populate the dropdown box. Computed from the cities dict above.
  citiesList: Ember.computed('cities', function(){
    let list = Object.keys(this.get('cities')).map(key => {
      return {id: key, label: this.get(`cities.${key}.label`)};
    });
    list.sort((first, second) => {
      if(first.id < second.id) {
        return -1;
      }
      else {
        return 1;
      }
    });
    return list;
  }),

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
