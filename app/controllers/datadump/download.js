import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['data_type'],
  query: Ember.inject.service(),

  ticket: "",
  link: "",
  started: false,
  complete: false,
  failed: false,
  progress: 0,
  parts: 0,
  total: Infinity,
  dowork: false,

  modelArrived: Ember.observer('model', function () {
    this.set('dowork', true)
    Ember.run.schedule("afterRender",this,function() {
      $("#datadump-link").click(function(){
        $(this).select();
      });
    });
    this.set('ticket', this.get('model').ticket);
    Ember.run.next(this, function(){
      this.set('link', window.location.href);
    });
    this.updateProgress();
  }),

  style: Ember.computed('progress', function() {
    return Ember.String.htmlSafe("width: " + this.get('progress') + "%");
  }),

  updateProgress() {
    console.log("Update.")
    Ember.run.later(this, function () {
      if(!this.dowork) {
        return;
      }
      const jobQuery = this.get('query').job(String(this.get('ticket')));
      jobQuery.then(job => {
        if (job['status']['status'] == 'error') {
          this.set('started', false);
          this.set('failed', true);
        } else if (job['status']['progress']) {
          this.set('parts', job['status']['progress']['done']);
          this.set('total', job['status']['progress']['total']);
          this.set('progress', parseInt(this.parts / this.total * 100));
          if (this.parts > 0) {
            this.set('started', true);
          }
          if (job['status']['status'] == 'success') {
            this.set('complete', true);
          } else {
            this.updateProgress();
          }
        } else {
          this.updateProgress();
        }
      }).catch(reason => {
        this.transitionToRoute('not-found', "404");
      });
    }, 1000);
  },

  actions: {
    download() {
      this.get('query').getDataDump(this.ticket, this.get('data_type'));
    }
  },
});
