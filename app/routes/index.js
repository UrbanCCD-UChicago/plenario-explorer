import Ember from 'ember';

export default Ember.Route.extend({
  // Grab pointDataset models
  mockedPointDatasets: [
      {
        attribution: "Seattle",
        description: "Permits for performing electrical work, issued in the past three years or currently in progress.",
        view_url: "https://data.seattle.gov/api/views/raim-ay5x/rows",
        update_freq: "yearly",
        longitude: "longitude",
        last_update: "2016-02-05T17:22:45.603933",
        obs_to: "2016-02-04",
        human_name: "Electrical Permits: Current",
        location: "location",
        date_added: "2016-02-05T17:22:45.603933",
        latitude: "latitude",
        obs_from: "2003-01-13",
        id: "electrical_permits_current",
        source_url: "https://data.seattle.gov/api/views/raim-ay5x/rows.csv?accessType=DOWNLOAD",
        observed_date: "application_date",
        source_url_hash: "a212aa18b8cfded81f62d4aea2954c10"
      },
      {
        attribution: "City and County of San Francisco",
        description: "Incidents derived from SFPD Crime Incident Reporting system Updated daily, showing data from 1/1/2003 up until two weeks ago from current date. Please note: San Francisco police have implemented a new system for tracking crime. The dataset included here is still coming from the old system, which is in the process of being retired (a multi-year process). Data included here is no longer the official SFPD data. We will migrate to the new system for DataSF in the upcoming months.",
        view_url: "https://data.sfgov.org/api/views/tmnf-yvry/rows",
        update_freq: "weekly",
        longitude: "",
        last_update: "2016-02-08T16:27:17.993363",
        obs_to: "2016-01-25",
        human_name: "SFPD Incidents - from 1 January 2003",
        location: "location",
        date_added: "2016-01-16T15:17:51.206465",
        latitude: "",
        obs_from: "2003-01-01",
        id: "sfpd_incidents_from_1_january_2003",
        source_url: "https://data.sfgov.org/api/views/tmnf-yvry/rows.csv?accessType=DOWNLOAD",
        observed_date: "date",
        source_url_hash: "51be264f1bc2524b2069c9244475e558"
      }
  ],
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

  model() {
    return {
      pointDatasets: this.store.findAll('pointDataset'),
      shapeDatasets: this.mockedShapeDatasets
    };
  }
});
