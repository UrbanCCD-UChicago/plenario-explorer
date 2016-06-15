import Ember from 'ember';
import humanizeName from '../utils/humanize-name';

export default Ember.Component.extend({
  init(){
    this._super(...arguments);
    this.set('columns', Object.keys(this.get('events')[0]));
    this.set('columnNames', Object.keys(this.get('events')[0]).map(v => humanizeName(v)));
  }
});
