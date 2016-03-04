import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    //console.log(this.$("table"));
    this.$("table").DataTable({
      "paging": false,
      "searching": false,
      "info": false
    });
  }
});
