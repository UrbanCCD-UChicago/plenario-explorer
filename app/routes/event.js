import Ember from 'ember';
import QueryConverter from '../utils/query-converter';

export default Ember.Route.extend({

  /**
   * Handles setting defaults for dates and agg units
   * so that model() can always expect those
   * to be present.
   *
   * @param transition
   */
  // queryParams: {
  //   dataset_name: {
  //     refreshModel: true
  //   }
  // },

  //beforeModel(transition){
    //transition.queryParams['nuhuh'] = 'foo';
    // console.log(transition.queryParams);
    // this.replaceWith({queryParams: {
    //    dataset_name: 'blergh'
    //  }});
    // If params doesn't have a start or end date,
    // choose a reasonable default
    // If params doesn't have a geom, don't worry on it.
    // If params doesn't have a default agg unit, go with week.
  //},

  model(params, transition) {
    // Fetch the dataset's metadata,
    // the grid representation,
    // and the timeseries representation.
    // Later: provide an option for displaying
    // a points view instead.
    //console.log(params);
    console.log(transition.queryParams);
    const name = params.dataset_name;
    const id = new QueryConverter().fromHash(transition.queryParams).toId();
    return Ember.RSVP.hash({
      metadata: this.store.findRecord('point-dataset', name),
      timeseries: this.store.findRecord('timeseries', id),
      grid: this.store.findRecord('grid', id)
    });
  }
});
