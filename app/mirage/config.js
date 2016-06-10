//Not really used, so we'll just have jshint ignore these things during testing.
/* jshint ignore:start */
export default function() {

  this.get('http://plenar.io/v1/api/shapes', function(_, request){
    return {
      meta: {
        status: "ok",
          message: ""
      },
      objects: [
        {
          contributor_name: "willengler",
          attribution: "City of Chicago",
          description: "Neighborhood boundaries in Chicago, as developed by the Office of Tourism. These boundaries are approximate and names are not official. The data can be viewed on the Chicago Data Portal with a web browser. However, to view or use the files outside of a web browser, you will need to use compression software and special GIS software, such as ESRI ArcGIS (shapefile) or Google Earth (KML or KMZ), is required.",
          view_url: "https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Neighborhoods/bbvz-uum9",
          num_shapes: 98,
          source_url: "https://data.cityofchicago.org/api/geospatial/bbvz-uum9?method=export&format=Shapefile",
          bbox: '{"type":"Polygon","coordinates":[[[-87.9401140825184,41.6445431222748],[-87.9401140825184,42.0230385869894],[-87.5241371038859,42.0230385869894],[-87.5241371038859,41.6445431222748],[-87.9401140825184,41.6445431222748]]]}',
          date_added: "2016-02-08",
          human_name: "Boundaries - Neighborhoods",
          contributor_email: "willengler@uchicago.edu",
          contributor_organization: "Plenario Admin",
          dataset_name: "boundaries_neighborhoods",
          update_freq: "yearly"
        },
        {
          contributor_name: "Will Engler",
          attribution: "City of Chicago",
          description: "City boundary of Chicago. The data can be viewed on the Chicago Data Portal with a web browser. However, to view or use the files outside of a web browser, you will need to use compression software and special GIS software, such as ESRI ArcGIS (shapefile) or Google Earth (KML or KMZ).",
          view_url: "https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-City/ewy2-6yfk",
          num_shapes: 1,
          source_url: "https://data.cityofchicago.org/api/geospatial/ewy2-6yfk?method=export&format=Shapefile",
          bbox: '{"type":"Polygon","coordinates":[[[-87.9401140825184,41.6445431225492],[-87.9401140825184,42.0230385869894],[-87.5241371038859,42.0230385869894],[-87.5241371038859,41.6445431225492],[-87.9401140825184,41.6445431225492]]]}',
          date_added: "2016-02-08",
          human_name: "Boundaries - City",
          contributor_email: "willengler@uchicago.edu",
          contributor_organization: "",
          dataset_name: "boundaries_city",
          update_freq: "yearly"

        }
      ]};
  });

  this.get('http://plenar.io/v1/api/detail-aggregate', function(_, request){
    return {
      count: 56,
      objects: [
          {count:0,datetime:"2015-11-09"},
          {count:2,datetime:"2015-11-16"},
          {count:4,datetime:"2015-11-23"},
          {count:5,datetime:"2015-11-30"},
          {count:5,datetime:"2015-12-07"},
          {count:2,datetime:"2015-12-14"},
          {count:1,datetime:"2015-12-21"},
          {count:0,datetime:"2015-12-28"},
          {count:26,datetime:"2016-01-04"},
          {count:7,datetime:"2016-01-11"},
          {count:4,datetime:"2016-01-18"},
          {count:0,datetime:"2016-01-25"},
          {count:0,datetime:"2016-02-01"},
          {count:0,datetime:"2016-02-08"}]
      };
    });

  this.get('http://plenar.io/v1/api/datasets?dataset_name=crimes_2001_to_present', function() {
    return {
      meta: {
        status: "ok",
        query: {
          location_geom__within: null,
          obs_date__ge: null,
          obs_date__le: null,
          dataset_name: "crimes_2001_to_present"
        },
        message: [ ],
        total: 1
      },
      objects: [
        {
          column_names: null,
          attribution: "Chicago Police Department",
          description: "This dataset reflects reported incidents of crime.",
          date_added: "2014-09-10T22:51:19.214726",
          view_url: "http://data.cityofchicago.org/api/views/ijzp-q8t2/rows",
          source_url: "http://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD",
          obs_from: "2001-01-01",
          obs_to: "2016-03-02",
          human_name: "Crimes - 2001 to present",
          last_update: "2016-03-10T17:43:10.988899",
          dataset_name: "crimes_2001_to_present",
          update_freq: "daily"
        }
      ]
    };
  });

  this.get('http://plenar.io/v1/api/datasets?dataset_name=building_permits', function() {
    return {
      meta: {
        status: "ok",
          query: {
          location_geom__within: null,
            obs_date__ge: null,
            obs_date__le: null,
            dataset_name: "building_permits"
        },
        message: [ ],
          total: 1
      },
      objects: [
        {
          column_names: null,
          attribution: "City of Chicago",
          description: "Permits issued by the Department of Buildings in the City of Chicago.",
          date_added: "2014-09-10T18:07:26.991109",
          view_url: "http://data.cityofchicago.org/api/views/ydr8-5enu/rows",
          source_url: "http://data.cityofchicago.org/api/views/ydr8-5enu/rows.csv?accessType=DOWNLOAD",
          obs_from: "2001-11-19",
          obs_to: "2016-03-15",
          human_name: "Building Permits",
          last_update: "2016-03-15T14:22:15.165711",
          dataset_name: "building_permits",
          update_freq: "daily"
        }
      ]
    };
  });

  this.get('http://plenar.io/v1/api/datasets', function() {
    return {
      "meta": {
      "status": "ok"
    },
      "objects": [
      {
        "column_names": [],
        "attribution": "City of Chicago",
        "description": "The Chicago Building Energy",
        "date_added": null,
        "view_url": "https://data.cityofchicago.org/api/views/xq83-jr8c/rows",
        "source_url": "https://data.cityofchicago.org/api/views/xq83-jr8c/rows.csv?accessType=DOWNLOAD",
        "obs_from": null,
        "obs_to": null,
        "human_name": "Chicago Energy Benchmarking",
        "last_update": null,
        "dataset_name": "building_permits",
        "update_freq": "yearly"
      },
      {
        "column_names": [
          "initial_type_subgroup",
          "initial_type_group",
          "initial_type_description",
          "event_clearance_description",
          "at_scene_time",
          "district_sector",
          "cad_event_number",
          "cad_cdw_id",
          "event_clearance_subgroup",
          "event_clearance_date",
          "zone_beat",
          "incident_location",
          "census_tract",
          "latitude",
          "hundred_block_location",
          "general_offense_number",
          "event_clearance_group",
          "longitude",
          "event_clearance_code"
        ],
        "attribution": "City of Seattle, Department of Information Technology, Seattle Police Department",
        "description": "This dataset is",
        "date_added": null,
        "view_url": "https://data.seattle.gov/api/views/3k2p-39jp/rows",
        "source_url": "https://data.seattle.gov/api/views/3k2p-39jp/rows.csv?accessType=DOWNLOAD",
        "obs_from": null,
        "obs_to": null,
        "human_name": "Seattle Police Department 911 Incident Response",
        "last_update": null,
        "dataset_name": "crimes_2001_to_present",
        "update_freq": "yearly"
      }
    ]
    };
  });
}
/* jshint ignore:end */
