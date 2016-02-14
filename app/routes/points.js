import Ember from 'ember';

export default Ember.Route.extend({
  mockedTimeseries: {
    meta: {
      status: "ok",
      query: {
        agg: "year",
        location_geom__within: null,
        obs_date__ge: "2012-01-01T00:00:00",
        data_type: "json",
        obs_date__le: "2016-02-14T18:37:16.567813"
      },
      message: [ ]
    },
    objects: [
      {
        count: 503,
        datetime: "2012-01-01"
      },
      {
        count: 419,
        datetime: "2013-01-01"
      },
      {
        count: 422,
        datetime: "2014-01-01"
      },
      {
        count: 479,
        datetime: "2015-01-01"
      },
      {
        count: 68,
        datetime: "2016-01-01"
      }
    ]
  },
  mockedMeta: {
    meta: {
      status: "ok",
      query: {
        dataset_name: "crimes_2001_to_present"
      },
      message: "",
      total: 1
    },
    objects: [
      {
        attribution: "Chicago Police Department",
        description: "This dataset reflects reported incidents of crime",
        view_url: "http://data.cityofchicago.org/api/views/ijzp-q8t2/rows",
        update_freq: "daily",
        longitude: "longitude",
        last_update: "2016-02-13T15:16:55.382633",
        bbox: {
          type: "Polygon",
          coordinates: [
            [
              [
                -91.686565684,
                36.619446395
              ],
              [
                -91.686565684,
                42.022878225
              ],
              [
                -87.524529378,
                42.022878225
              ],
              [
                -87.524529378,
                36.619446395
              ],
              [
                -91.686565684,
                36.619446395
              ]
            ]
          ]
        },
        obs_to: "2016-02-05",
        human_name: "Crimes - 2001 to present",
        location: "location",
        date_added: "2014-09-10T22:51:19.214726",
        latitude: "latitude",
        obs_from: "2001-01-01",
        dataset_name: "crimes_2001_to_present",
        source_url: "http://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD",
        observed_date: "date",
        source_url_hash: "faefd72e955754eb1ea74f16e4f34e50"
      }
    ]
  },
  mockedGrid: {
    type: "FeatureCollection",
    features: [
      {
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                -87.62632148450729,
                41.863340076421665
              ],
              [
                -87.62632148450729,
                41.86783546864464
              ],
              [
                -87.63213244120243,
                41.86783546864464
              ],
              [
                -87.63213244120243,
                41.863340076421665
              ],
              [
                -87.62632148450729,
                41.863340076421665
              ]
            ]
          ]
        },
        type: "Feature",
        properties: {
          count: 19
        }
      },
      {
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                -87.62051052781214,
                41.863340076421665
              ],
              [
                -87.62051052781214,
                41.86783546864464
              ],
              [
                -87.62632148450729,
                41.86783546864464
              ],
              [
                -87.62632148450729,
                41.863340076421665
              ],
              [
                -87.62051052781214,
                41.863340076421665
              ]
            ]
          ]
        },
        type: "Feature",
        properties: {
          count: 91
        }
      },
      {
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                -87.61469957111699,
                41.863340076421665
              ],
              [
                -87.61469957111699,
                41.86783546864464
              ],
              [
                -87.62051052781213,
                41.86783546864464
              ],
              [
                -87.62051052781213,
                41.863340076421665
              ],
              [
                -87.61469957111699,
                41.863340076421665
              ]
            ]
          ]
        },
        type: "Feature",
        properties: {
          count: 8
        }
      }
    ]
  },

  model() {
    return {
      grid: this.mockedGrid,
      timeseries: this.mockedTimeseries,
      meta: this.mockedMeta
    };
  }
});
