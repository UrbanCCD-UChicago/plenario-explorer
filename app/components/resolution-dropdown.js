import Ember from 'ember';

export default Ember.Component.extend({
  resolutionPairs: [
    [100, '100 meters'],
    [200, '200 meters'],
    [300, '300 meters'],
    [400, '400 meters'],
    [500, '500 meters'],
    [1000, '1 kilometer']
  ],

  init() {
    this._super(...arguments);

    const pairs = this.get('resolutionPairs');
    this.set('intToStr', new Map(pairs));

    const reversedPairs = pairs.map(pair => {
      pair.reverse();
      return pair;
    });
    this.set('strToInt', new Map(reversedPairs));

    const justStrs = pairs.map(pair => {return pair[0];});
    this.set('resOptions', justStrs);
  },

  didReceiveAttrs() {
    // 'res' is an integer number of meters.
    const res = this.get('res');
    let text = this.get('intToStr').get(res);
    if (!text) {
      text = '500 meters';
    }
    this.set('resText', text);
  },

  actions: {
    selectRes(text) {
      const newRes = this.get('strToInt').get(text);
      this.get('resChanged')(newRes);
    }
  }
});
