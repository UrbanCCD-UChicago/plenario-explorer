import Ember from 'ember';
import humanizeName from '../utils/humanize-name';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    this.set('columnNames', this.get('columns').map(v => humanizeName(v)));
  }
});
