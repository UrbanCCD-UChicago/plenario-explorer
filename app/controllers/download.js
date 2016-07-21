import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['data_type', 'filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within', 'dataset_name'],
  query: Ember.inject.service(),

  queryParamsHash: Ember.computed('filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within', 'dataset_name',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      for (const key of Object.keys(params)) {
        if (!params[key]) {
          delete params[key];
        }
      }
      return params;
    }
  ),

  queryParamsClone() {
    return Ember.copy(this.get('queryParamsHash'));
  },

  ticket: "",
  target: "",
  queued: false,
  complete: false,
  progress: 0,
  parts: 0,
  total: Infinity,

  modelArrived: Ember.observer('model', function(){
    this.get('query').dataDump(this.queryParamsClone()).then(ticket => {
      this.set('ticket', ticket["ticket"]);
      console.log(this.ticket)
      this.updateProgress();
    })
  }),

  updateProgress() {
    Ember.run.later(this, function() {
      const jobQuery = this.get('query').job(String(this.get('ticket')));
      jobQuery.then(job => {
        if (job['status']['progress']) {
          this.set('parts', job['status']['progress']['done']);
          this.set('total', job['status']['progress']['total']);
          this.set('progress', parseInt(this.parts/this.total*100));
          if(this.parts > 0) {
            this.set('queued', true);
          }
          if(job['status']['status']=='success'){
            this.set('complete', true);
          } else {
            this.updateProgress();
          }
        } else {
          this.updateProgress();
        }
      });
    }, 1000);
  },

  actions: {
    download() {
      this.get('query').getDataDump(this.ticket, this.get('data_type'));
    }
  }


});
