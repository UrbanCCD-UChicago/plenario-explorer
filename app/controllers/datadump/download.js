import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  queryParams: ['data_type'],
  query: Ember.inject.service(),

  ticket: '',
  worker: null,
  link: '',
  started: false,
  complete: false,
  failed: false,
  progress: 0,
  parts: 0,
  total: Infinity,
  dowork: false,
  connectionLost: false,

  queueTime: undefined,
  elapsed: '0s',
  remaining: 'calculating...',

  modelArrived: Ember.observer('model', function () {
    this.set('dowork', true);
    Ember.run.schedule('afterRender', this, () => {
      $('#datadump-link').click(function () {
        $(this).select();
      });
    });
    this.set('ticket', this.get('model').ticket);
    Ember.run.next(this, function () {
      this.set('link', window.location.href);
    });
    this.updateProgress();
  }),

  style: Ember.computed('progress', function () {
    return Ember.String.htmlSafe(`width: ${this.get('progress')}%`);
  }),

  updateProgress() {
    Ember.run.later(this, function () {
      if (!this.dowork) {
        return;
      }
      const jobQuery = this.get('query').job(String(this.get('ticket')));
      jobQuery.then((job) => {
        if (job.status.status === 'error') {
          this.set('started', false);
          this.set('failed', true);
          return;
        }

        if (!this.queueTime) {
          this.set('queueTime', moment.utc(job.status.meta.queueTime));
        }
        let elapsed = moment.duration(moment().diff(this.queueTime));
        this.set('elapsed', `${(elapsed.hours() > 0 ? `${elapsed.hours()}h ` : '') + (elapsed.minutes() > 0 || elapsed.hours() > 0 ? `${elapsed.minutes()}m ` : '') + elapsed.seconds()}s`);

        if (job.status.status === 'processing' || job.status.status === 'success') {
          this.set('worker', job.status.meta.workers[job.status.meta.workers.length - 1]);
        }

        if (job.status.progress) {
          this.set('parts', job.status.progress.done);
          this.set('total', job.status.progress.total);
          this.set('progress', parseInt((this.parts / this.total) * 100, 10));
          if (this.parts > 0) {
            this.set('started', true);
            const meta = job.status.meta;
            const startTime = moment.utc(meta.lastStartTime ? meta.lastStartTime : meta.startTime);
            const elapsedTime = moment().diff(startTime);
            const progressRemaining = this.total - this.parts;
            const timeRemaining = moment.duration(progressRemaining / (this.parts / elapsedTime));
            this.set('remaining', `${(timeRemaining.hours() > 0 ? `${timeRemaining.hours()}h ` : '') + (timeRemaining.minutes() > 0 || timeRemaining.hours() > 0 ? `${timeRemaining.minutes()}m ` : '') + timeRemaining.seconds()}s`);
          }
          if (job.status.status === 'success') {
            elapsed = moment.duration(moment.utc(job.status.meta.endTime).diff(this.queueTime));
            this.set('elapsed', `${(elapsed.hours() > 0 ? `${elapsed.hours()}h ` : '') + (elapsed.minutes() > 0 || elapsed.hours() > 0 ? `${elapsed.minutes()}m ` : '') + elapsed.seconds()}s`);
            this.set('remaining', '0s');
            this.set('complete', true);
          } else {
            this.updateProgress();
          }
        } else {
          this.updateProgress();
        }
      }).catch((reason) => {
        Ember.Logger.error(reason);
        if (reason.errors) {
          if (reason.errors[0].status === '404') {
            this.transitionToRoute('not-found', '404');
          } else if (reason.errors[0].status.slice(0, 2) === '50') {
            this.set('connectionLost', true);
            Ember.run.later(() => {
              location.reload();
            }, 5000);
          }
        }
      });
    }, 1000);
  },

  actions: {
    download() {
      this.get('query').getDataDump(this.ticket, this.get('data_type'));
    },
  },

});
