import Ember from 'ember';
import ENV from 'plenario-explorer/config/environment';
import jenks from '../utils/jenks';


export default Ember.Component.extend({
  // Blues, light to dark
  colors: [
    '#eff3ff',
    '#bdd7e7',
    '#6baed6',
    '#3182bd',
    '#08519c',
  ],

  mapTileUrl: ENV.baseMapTileUrl,

  gridStyle(feature) {
    return {
      fillColor: feature.properties.color,
      weight: 0.3,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  },
  gridOnEachFeature(feature, layer) {
    const content = `<h4>Count: ${feature.properties.count}</h4>`;
    const options = {
      sticky: true,
      direction: 'left',
    };
    layer.bindTooltip(content, options);
  },

  init() {
    this._super(...arguments);
    // Determine the count grouping.
    const squares = this.get('grid');
    const cutoffs = this.makeCutoffs(squares);
    this.set('cutoffs', cutoffs);
    // Assign a color for each square based on our cutoffs.
    // Later we might want to pass this logic directly in gridStyle
    squares.features.forEach(this.setFeatureColor, this);
    // Make a legend for the heatmap.
    const datasetName = this.get('datasetName');
    const legend = this.makeLegend(cutoffs, datasetName);
    this.set('legend', legend);
  },

  /**
   * @param grid
   * @returns [number] array of five non-negative integers.
     */
  makeCutoffs(grid) {
    const counts = grid.features.map(f => f.properties.count);

    if (Math.max(...counts) < 5) {
      // Degenerate case. Can't cluster any better than this.
      return [0, 1, 2, 3, 4];
    }

      // Cluster into 4 groups
    const cutoffs = jenks(counts, 4);
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
  },

  makeLegend(grades) {
    const labels = [];
    let from,
      to;

    labels.push(`<i style="background-color:${this.getColor(0)}"></i> 0`);
    if (grades[2] === 1) {
      labels.push(`<i style="background-color:${this.getColor(1)}"></i> 1`);
    } else {
      labels.push(`<i style="background-color:${this.getColor(1)}"></i> 1 &ndash; ${grades[2]}`);
    }

    for (let i = 2; i < grades.length; i++) {
      from = grades[i] + 1;
      to = grades[i + 1];

      if (from === to) {
        labels.push(
          `<i style="background-color:${this.getColor(from + 1)}"></i> ${
          from}`);
      } else {
        labels.push(
          `<i style="background-color:${this.getColor(from + 1)}"></i> ${
          from}${to ? `&ndash;${to}` : '+'}`);
      }
    }

    return labels.join('<br>');
  },

  /**
   *  Assumes colors and cutoffs have length of 5!
   * @param cnt
   */
  getColor(cnt) {
    const colors = this.get('colors');
    const cutoffs = this.get('cutoffs');
    return cnt > cutoffs[4] ? colors[4] :
            cnt > cutoffs[3] ? colors[3] :
            cnt > cutoffs[2] ? colors[2] :
            cnt >= cutoffs[1] ? colors[1] :
                                colors[0];
  },

  makeFixedGetColor() {
    const colors = this.get('colors');
    const cutoffs = this.get('cutoffs');
    return function (cnt) {
      return cnt > cutoffs[4] ? colors[4] :
              cnt > cutoffs[3] ? colors[3] :
              cnt > cutoffs[2] ? colors[2] :
              cnt >= cutoffs[1] ? colors[1] :
              colors[0];
    };
  },

  setFeatureColor(feature) {
    const getColor = this.makeFixedGetColor();
    feature.properties.color = getColor(feature.properties.count);
  },

});
