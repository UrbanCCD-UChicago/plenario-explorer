import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['data_type', 'filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within', 'dataset_name'],
  blacklist : ['data_type'],
  query: Ember.inject.service(),

  reload: false,

  queryParamsHash: Ember.computed('filters', 'agg', 'resolution',
    'obs_date__le', 'obs_date__ge', 'location_geom__within', 'dataset_name',
    function() {
      let params = this.getProperties(this.get('queryParams'));
      for (const key of Object.keys(params)) {
        if (!params[key] || this.blacklist.indexOf(key) > -1) {
          delete params[key];
        }
      }
      return params;
    }
  ),

  queryParamsClone() {
    return Ember.copy(this.get('queryParamsHash'));
  },

  modelArrived: Ember.observer('model', function () {
    Ember.run.next(this, function(){
      // Reload to force-drop ongoing aggregate queries, allowing dataDump to start.
      if(this.get('reload')) {
        location.reload();
      }
      this.get('query').dataDump(this.queryParamsClone()).then(ticket => {
        this.replaceRoute('datadump.download', ticket["ticket"], {queryParams: {data_type: this.get('data_type')}});
      });
    });
  }),
});
