import ENV from 'plenario-explorer/config/environment';

export default function () {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = ENV.ajax.host;
  this.namespace = ENV.ajax.namespace;
  this.timing = 400; // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

  this.get('/datasets', 'events');
  this.get('/shapes', 'meta-shapes');
  // this.get('/shapes/:id');
  // this.get('/timeseries');
  // this.get('/grid');

  this.namespace = `${ENV.ajax.namespace}/sensor-networks/array_of_things_chicago`;
  // this.get('/nodes');
  this.get('/features');
  // this.get('/sensor-networks/array_of_things_chicago/query');

  // Forward requests to to live API if target endpoint is not defined in Mirage
  // this.passthrough(`${ENV.ajax.host}/${ENV.ajax.namespace}/**`);
  this.passthrough('/nodes');
}
