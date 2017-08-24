import ENV from 'plenario-explorer/config/environment';
import _ from 'npm:lodash';

export default function () {
  this.urlPrefix = ENV.ajax.host;
  this.timing = 400; // delay for each request, automatically set to 0 during testing

  // Default namespace endpoints
  this.namespace = ENV.ajax.namespace;
  this.get('/datasets', 'events');
  this.get('/shapes', 'meta-shapes');
  this.get('/timeseries', ({ timeseries }, request) => {
    if (request.queryParams.dataset_name) {
      return timeseries.findBy({ dataset_name: request.queryParams.dataset_name });
    }
    if (request.queryParams.dataset_names) {
      return _.filter(timeseries.all(), ts =>
        _.includes(request.queryParams.dataset_names, ts.dataset_name)
      );
    }
    return timeseries.all();
  });
  // This doesn't work, almost like the grid data is being generated asynchronously
  // this.get('/grid', ({ grids }, request) => {
  //   console.log(grids.all());
  //   return _.filter(grids.all(), g => {
  //     console.log(g);
  //     return g.properties.dataset === request.queryParams.dataset_name;
  //   });
  // });
  this.get('/shapes/:id', ({ shapes }) =>
    shapes.first()
  );

  // Sensor network namespace endpoints
  this.namespace = `${ENV.ajax.namespace}/sensor-networks/array_of_things_chicago`;
  this.get('/features');
  this.get('/nodes');
}
