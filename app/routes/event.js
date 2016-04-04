import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * Handles setting defaults for dates and agg units
   * so that model() can always expect those
   * to be present.
   *
   * @param transition
   */
  beforeModel(transition){
    // If params doesn't have a start or end date,
    // choose a reasonable default
    // If params doesn't have a geom, don't worry on it.
    // If params doesn't have a default agg unit, go with week.
  },

  model(params) {
    // Fetch the dataset's metadata,
    // the grid representation,
    // and the timeseries representation.
    // Later: provide an option for displaying
    // a points view instead.
    const name = params.dataset_name;
    const id = 'foo';
    return Ember.RSVP.hash({
      metadata: this.store.findRecord('dataset', name),
      timeseries: this.store.findRecord('timeseries', id),
      grid: this.store.findRecord('grid', id)
    });
  }
});
