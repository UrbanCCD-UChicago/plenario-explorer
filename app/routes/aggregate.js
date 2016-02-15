import Ember from 'ember';

export default Ember.Route.extend({
  mockedTimeseries: [
    {
      items: [
        {
          count: 6,
          datetime: "2015-11-09"
        },
        {
          count: 39,
          datetime: "2015-11-16"
        },
        {
          count: 31,
          datetime: "2015-11-23"
        },
        {
          count: 23,
          datetime: "2015-11-30"
        },
        {
          count: 25,
          datetime: "2015-12-07"
        },
        {
          count: 21,
          datetime: "2015-12-14"
        },
        {
          count: 27,
          datetime: "2015-12-21"
        },
        {
          count: 33,
          datetime: "2015-12-28"
        },
        {
          count: 53,
          datetime: "2016-01-04"
        },
        {
          count: 43,
          datetime: "2016-01-11"
        },
        {
          count: 31,
          datetime: "2016-01-18"
        },
        {
          count: 58,
          datetime: "2016-01-25"
        },
        {
          count: 41,
          datetime: "2016-02-01"
        },
        {
          count: 29,
          datetime: "2016-02-08"
        }
      ],
      dataset_name: "311_service_requests_abandoned_vehicles"
    },
    {
      items: [
        {
          count: 15,
          datetime: "2015-11-09"
        },
        {
          count: 35,
          datetime: "2015-11-16"
        },
        {
          count: 27,
          datetime: "2015-11-23"
        },
        {
          count: 29,
          datetime: "2015-11-30"
        },
        {
          count: 27,
          datetime: "2015-12-07"
        },
        {
          count: 30,
          datetime: "2015-12-14"
        },
        {
          count: 29,
          datetime: "2015-12-21"
        },
        {
          count: 23,
          datetime: "2015-12-28"
        },
        {
          count: 30,
          datetime: "2016-01-04"
        },
        {
          count: 39,
          datetime: "2016-01-11"
        },
        {
          count: 17,
          datetime: "2016-01-18"
        },
        {
          count: 33,
          datetime: "2016-01-25"
        },
        {
          count: 22,
          datetime: "2016-02-01"
        },
        {
          count: 6,
          datetime: "2016-02-08"
        }
      ],
      dataset_name: "311_service_requests_alley_lights_out"
    }
  ],
  mockedShapeIntersections: [
      {
        human_name: "boundaries_city",
        num_geoms: 1
      },
      {
        human_name: "pedestrian_streets",
        num_geoms: 2
      }
  ],
  model() {
    return {
      timeseriesPanel: this.mockedTimeseries,
      shapeIntersectionCounts: this.mockedShapeIntersections
    };
  }
});
