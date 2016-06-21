import Ember from 'ember';
import humanizeName from '../utils/humanize-name';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    this.set('columns', Object.keys(this.get('events')[0]));
    this.set('columnNames', Object.keys(this.get('events')[0]).map(v => humanizeName(v)));
  },

  showTable: false,

  actions: {

    showDatasetPreview() {
      this.set('showTable', true);
      console.log($('#container').outerHeight(true));
      $('#container-container').animate({height: $('#container').outerHeight(true)}, 500);
      $('html,body').animate({scrollTop: $(document).height()}, 500);

    },
    hideDatasetPreview() {
      this.set('showTable', false);
      $('#container-container').animate({height: '0vh'}, 500);
    },

  }
});
