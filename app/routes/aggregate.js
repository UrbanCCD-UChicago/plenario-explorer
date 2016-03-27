import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  mockedShapeDatasets: [
    {
      attribution: "City of Chicago",
      description: "Neighborhood boundaries in Chicago, as developed by the Office of Tourism. These boundaries are approximate and names are not official. The data can be viewed on the Chicago Data Portal with a web browser. However, to view or use the files outside of a web browser, you will need to use compression software and special GIS software, such as ESRI ArcGIS (shapefile) or Google Earth (KML or KMZ), is required.",
      date_added: "2016-02-08",
      num_shapes: 98,
      human_name: "Boundaries - Neighborhoods",
      id: "boundaries_neighborhoods",
      update_freq: "yearly"
    },
    {
      attribution: "City of Chicago",
      description: "City boundary of Chicago. The data can be viewed on the Chicago Data Portal with a web browser. However, to view or use the files outside of a web browser, you will need to use compression software and special GIS software, such as ESRI ArcGIS (shapefile) or Google Earth (KML or KMZ).",
      date_added: "2016-02-08",
      num_shapes: 1,
      human_name: "Boundaries - City",
      id: "boundaries_city",
      update_freq: "yearly"
    }
  ],
  // A change in any query parameter should trigger a refresh.
  queryParams: {
    obs_date__le: {
      refreshModel: true
    },
    obs_date__ge: {
      refreshModel: true
    },
    agg: {
      refreshModel: true
    },
    location_geom__within: {
      refreshModel: true
    }
  },
  model(params) {
    return Ember.RSVP.hash({
      pointDatasets: this.store.query('pointDataset', params),
      shapeDatasets: this.mockedShapeDatasets
      //shapeDatasets: this.store.query('shapeDataset', params)
    });
  }
});
