import Ember from 'ember';
import jenks from '../utils/jenks';
//import L from "npm:leaflet-label";

/* global L */

export default Ember.Component.extend({
  // Blues, light to dark
  colors: [
    '#eff3ff',
    '#bdd7e7',
    '#6baed6',
    '#3182bd',
    '#08519c'
  ],

  init() {
    this._super(...arguments);
    //window.L = L;
    // Determine the count grouping.
    const squares = this.get('grid');
    const cutoffs = this.makeCutoffs(squares);
    this.set('cutoffs', cutoffs);
    // Make a legend for the heatmap.
    const datasetName = this.get('datasetName');
    console.log(datasetName);
    const legendDiv = this.makeLegendDiv(cutoffs, datasetName);
    this.set('legendDiv', legendDiv);
    // Convert the geoJSON to a styled Leaflet layer.
    const gridLayer = this.makeLayer(squares, cutoffs);
    this.set('gridLayer', gridLayer);
  },

  /**
   * @param grid
   * @returns [number] array of five non-negative integers.
     */
  makeCutoffs(grid) {
    //console.log(grid.get('features'));
    //window.grid = grid;
    const counts = grid.features.map(f => {return f.properties.count;});

    if (Math.max(...counts) < 5) {
      // Degenerate case. Can't cluster any better than this.
      return [0, 1, 2, 3, 4];
    }
    else {
      // Cluster into 4 groups
      let cutoffs = jenks(counts, 4);
      // Because the backend doesn't send back squares with count=0,
      // we need to manually add a class to handle the case where the data is
      // less than the smallest count we passed in.
      cutoffs.unshift(0);
      cutoffs[1] = 1;
      // Also, to check if a count falls into the highest class,
      // we only need to check the second to last element of the array.
      // (The last element will always just be the largest count in counts.)
      cutoffs.pop();
      return cutoffs;
    }
  },

  makeLegendDiv(grades, datasetName) {
    let labels = [];
    let from, to;

    labels.push('<i style="background-color:' + this.getColor(0) + '"></i> 0');
    if (grades[2] === 1) {
      labels.push('<i style="background-color:' + this.getColor(1) + '"></i> 1');
    }
    else {
      labels.push('<i style="background-color:' + this.getColor(1) + '"></i> 1 &ndash; ' + grades[2]);
    }

    for (var i = 2; i < grades.length; i++) {
      from = grades[i] + 1;
      to = grades[i + 1];

      if (from === to) {
        labels.push(
          '<i style="background-color:' + this.getColor(from + 1) + '"></i> ' +
          from);
      }
      else {
        labels.push(
          '<i style="background-color:' + this.getColor(from + 1) + '"></i> ' +
          from + (to ? '&ndash;' + to : '+'));
      }
    }

    let div = L.DomUtil.create('div', 'legend');
    const labelText = labels.join('<br />');
    div.innerHTML = `<div><strong>${datasetName}</strong><br />${labelText}</div>`;
    return div;
  },

  /**
   *  Assumes colors and cutoffs have length of 5!
   * @param cnt
   */
  getColor(cnt) {
    const colors = this.get('colors');
    const cutoffs = this.get('cutoffs');
    return  cnt >  cutoffs[4] ? colors[4] :
            cnt >  cutoffs[3] ? colors[3] :
            cnt >  cutoffs[2] ? colors[2] :
            cnt >= cutoffs[1] ? colors[1] :
                                colors[0];
  },

  makeFixedGetColor() {
    const colors = this.get('colors');
    const cutoffs = this.get('cutoffs');
    return function(cnt) {
      return  cnt >  cutoffs[4] ? colors[4] :
              cnt >  cutoffs[3] ? colors[3] :
              cnt >  cutoffs[2] ? colors[2] :
              cnt >= cutoffs[1] ? colors[1] :
              colors[0];
    };
  },

  makeLayer(grid) {
    const getColor = this.makeFixedGetColor();
    const addCountLabel = function(feature, layer){
      var content = '<h4>Count: ' + feature.properties.count + '</h4>';
      layer.bindLabel(content);
    };
    return L.geoJson(grid, {
      style: feature => {
        return {
          fillColor: getColor(feature.properties.count),
          weight: 0.3,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        };
      },
      onEachFeature: addCountLabel
    });
  }

});
