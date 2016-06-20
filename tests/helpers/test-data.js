let testData = {

  params: {
    agg: "week",
    obs_date__ge: "2016-05-20",
    obs_date__le: "2016-06-20",
    location_geom__within: {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-87.64153629541396, 41.88496253812402],
            [-87.64153629541396, 41.89141609339026],
            [-87.62059360742569, 41.89141609339026],
            [-87.62059360742569, 41.88496253812402],
            [-87.64153629541396, 41.88496253812402]
          ]
        ]
      }
    }
  },


  shapesData: {
    "meta": {
      "status": "ok",
      "message": ""
    },
    "objects": [{
      "attribution": "City of Chicago",
      "description": "Major streets in Chicago. ",
      "view_url": "",
      "num_shapes": 16065,
      "source_url": "https://data.cityofchicago.org/download/ueqs-5wr6/application/zip",
      "bbox": "{\"type\":\"Polygon\",\"coordinates\":[[[-87.9320823353882,41.6445840278876],[-87.9320823353882,42.0230311371132],[-87.5244576278484,42.0230311371132],[-87.5244576278484,41.6445840278876],[-87.9320823353882,41.6445840278876]]]}",
      "date_added": "2016-04-20",
      "human_name": "Major Streets",
      "dataset_name": "major_streets",
      "update_freq": "yearly"
    }, {
      "attribution": "City of Chicago",
      "description": "Neighborhood boundaries in Chicago, as developed by the Office of Tourism. These boundaries are approximate and names are not official. The data can be viewed on the Chicago Data Portal with a web browser. However, to view or use the files outside of a web browser, you will need to use compression software and special GIS software, such as ESRI ArcGIS (shapefile) or Google Earth (KML or KMZ), is required.",
      "view_url": "https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Neighborhoods/bbvz-uum9",
      "num_shapes": 98,
      "source_url": "https://data.cityofchicago.org/api/geospatial/bbvz-uum9?method=export&format=Shapefile",
      "bbox": "{\"type\":\"Polygon\",\"coordinates\":[[[-87.9401140825184,41.6445431222748],[-87.9401140825184,42.0230385869894],[-87.5241371038859,42.0230385869894],[-87.5241371038859,41.6445431222748],[-87.9401140825184,41.6445431222748]]]}",
      "date_added": "2016-02-08",
      "human_name": "Boundaries - Neighborhoods",
      "dataset_name": "boundaries_neighborhoods",
      "update_freq": "yearly"
    }]
  },


  eventData: {
    "meta": {
      "status": "ok",
      "query": {
        "location_geom__within": null,
        "obs_date__ge": null,
        "obs_date__le": null,
        "dataset_name": null
      },
      "message": [],
      "total": 2
    },
    "objects": [{
      attribution: "City of Chicago",
      description: "All open sanitation code complaints made to 311 and all requests completed since January 1, 2011. The Department of Streets and Sanitation investigates and remedies reported violations of Chicago’s sanitation code. Residents may request service for violations such as overflowing dumpsters and garbage in the alley. 311 sometimes receives duplicate sanitation code complaints. Requests that have been labeled as duplicates are in the same geographic area as a previous request and have been entered into 311’s Customer Service Request (CSR) system at around the same time. Duplicate complaints are labeled as such in the status field, as either \"Open - Dup\" or \"Completed - Dup.\" Data Owner: Streets and Sanitation (http://www.cityofchicago.org/content/city/en/depts/streets.html). Time Period: January 1, 2011 to present. Frequency: Data is updated daily. Related Applications: 311 Service Request Status Inquiry (https://servicerequest.cityofchicago.org/web_intake_chic/Controller?op=createsrquery2) and Report Sanitation Code Complaint (https://servicerequest.cityofchicago.org/web_intake_chic/Controller?op=locform&invSRType=SCB&invSRDesc=Sanitation%20Code%20Violation&locreq=Y&stnumreqd=Y).",
      view_url: "http://data.cityofchicago.org/api/views/me59-5fac/rows",
      columns: [{
        field_type: "VARCHAR",
        field_name: "status"
      }, {
        field_type: "INTEGER",
        field_name: "police_district"
      }, {
        field_type: "VARCHAR",
        field_name: "type_of_service_request"
      }, {
        field_type: "VARCHAR",
        field_name: "service_request_number"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "y_coordinate"
      }, {
        field_type: "VARCHAR",
        field_name: "what_is_the_nature_of_this_code_violation"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "longitude"
      }, {
        field_type: "DATE",
        field_name: "creation_date"
      }, {
        field_type: "DATE",
        field_name: "completion_date"
      }, {
        field_type: "VARCHAR",
        field_name: "location"
      }, {
        field_type: "INTEGER",
        field_name: "community_area"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "latitude"
      }, {
        field_type: "INTEGER",
        field_name: "ward"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "x_coordinate"
      }, {
        field_type: "VARCHAR",
        field_name: "street_address"
      }, {
        field_type: "INTEGER",
        field_name: "zip_code"
      }],
      last_update: "2016-06-20T11:48:12.679048",
      obs_from: "2000-01-03",
      bbox: {
        type: "Polygon",
        coordinates: [
          [
            [-87.9045136041908, 41.6453694964373],
            [-87.9045136041908, 42.0225341970333],
            [-87.5257485423234, 42.0225341970333],
            [-87.5257485423234, 41.6453694964373],
            [-87.9045136041908, 41.6453694964373]
          ]
        ]
      },
      human_name: "311 Service Requests - Sanitation Code Complaints",
      obs_to: "2016-06-19",
      date_added: "2014-09-10T16:57:09.995572",
      source_url: "http://data.cityofchicago.org/api/views/me59-5fac/rows.csv?accessType=DOWNLOAD",
      dataset_name: "311_service_requests_sanitation_code_complaints",
      update_freq: "daily"
    }, {
      attribution: "City of Chicago",
      description: "All open rodent baiting requests and rat complaints made to 311 and all requests completed since January 1, 2011. The Department of Streets & Sanitation investigates reported rat sightings. Alley conditions are examined. If any damaged carts are identified, Sanitation Ward Offices, which distribute the carts are notified. Rodenticide is placed in rat burrows to eradicate nests. 311 sometimes receives duplicate rat complaints and requests for rodent baiting. Requests that have been labeled as Duplicates are in the same geographic area and have been entered into 311’s Customer Service Requests (CSR) system at around the same time as a previous request. Duplicate reports/requests are labeled as such in the Status field, as either \"Open - Dup\" or \"Completed - Dup.\" Data is updated daily.",
      view_url: "http://data.cityofchicago.org/api/views/97t6-zrhs/rows",
      columns: [{
        field_type: "VARCHAR",
        field_name: "status"
      }, {
        field_type: "VARCHAR",
        field_name: "current_activity"
      }, {
        field_type: "INTEGER",
        field_name: "police_district"
      }, {
        field_type: "VARCHAR",
        field_name: "type_of_service_request"
      }, {
        field_type: "VARCHAR",
        field_name: "service_request_number"
      }, {
        field_type: "VARCHAR",
        field_name: "most_recent_action"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "y_coordinate"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "number_of_premises_with_rats"
      }, {
        field_type: "INTEGER",
        field_name: "number_of_premises_with_garbage"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "longitude"
      }, {
        field_type: "DATE",
        field_name: "creation_date"
      }, {
        field_type: "DATE",
        field_name: "completion_date"
      }, {
        field_type: "VARCHAR",
        field_name: "location"
      }, {
        field_type: "INTEGER",
        field_name: "community_area"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "latitude"
      }, {
        field_type: "INTEGER",
        field_name: "ward"
      }, {
        field_type: "DOUBLE PRECISION",
        field_name: "x_coordinate"
      }, {
        field_type: "INTEGER",
        field_name: "number_of_premises_baited"
      }, {
        field_type: "VARCHAR",
        field_name: "street_address"
      }, {
        field_type: "INTEGER",
        field_name: "zip_code"
      }],
      last_update: "2016-06-20T11:41:10.583284",
      obs_from: "1999-11-29",
      bbox: {
        type: "Polygon",
        coordinates: [
          [
            [-87.9199997040096, 41.6453423014267],
            [-87.9199997040096, 42.0225373685254],
            [-87.5257434090231, 42.0225373685254],
            [-87.5257434090231, 41.6453423014267],
            [-87.9199997040096, 41.6453423014267]
          ]
        ]
      },
      human_name: "311 Service Requests - Rodent Baiting",
      obs_to: "2016-06-19",
      date_added: "2014-09-10T16:06:05.550688",
      source_url: "http://data.cityofchicago.org/api/views/97t6-zrhs/rows.csv?accessType=DOWNLOAD",
      dataset_name: "311_service_requests_rodent_baiting",
      update_freq: "daily"
    }]
  },


  detailAggregateRodents: {
    count: 2,
    meta: {
      status: "ok",
      query: {
        agg: "week",
        location_geom__within: {
          crs: {
            type: "name",
            properties: {
              name: "EPSG:4326"
            }
          },
          type: "Polygon",
          coordinates: [
            [
              [-87.64153629541396, 41.88496253812402],
              [-87.64153629541396, 41.89141609339026],
              [-87.62059360742569, 41.89141609339026],
              [-87.62059360742569, 41.88496253812402],
              [-87.64153629541396, 41.88496253812402]
            ]
          ]
        },
        obs_date__ge: "2016-05-20T00:00:00",
        data_type: "json",
        obs_date__le: "2016-06-20T00:00:00"
      },
      message: []
    },
    objects: [{
      count: 0,
      datetime: "2016-05-16"
    }, {
      count: 0,
      datetime: "2016-05-23"
    }, {
      count: 2,
      datetime: "2016-05-30"
    }, {
      count: 0,
      datetime: "2016-06-06"
    }, {
      count: 0,
      datetime: "2016-06-13"
    }, {
      count: 0,
      datetime: "2016-06-20"
    }]
  },


  gridRodents: {
    type: "FeatureCollection",
    features: [{
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-87.63854693083577, 41.881321645313555],
            [-87.63854693083577, 41.88581703753653],
            [-87.64458035804522, 41.88581703753653],
            [-87.64458035804522, 41.881321645313555],
            [-87.63854693083577, 41.881321645313555]
          ]
        ]
      },
      type: "Feature",
      properties: {
        count: 1
      }
    }, {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-87.63251350362633, 41.881321645313555],
            [-87.63251350362633, 41.88581703753653],
            [-87.63854693083577, 41.88581703753653],
            [-87.63854693083577, 41.881321645313555],
            [-87.63251350362633, 41.881321645313555]
          ]
        ]
      },
      type: "Feature",
      properties: {
        count: 1
      }
    }]
  },


  detailRodents: {
    meta: {
      status: "ok",
      query: {
        location_geom__within: {
          crs: {
            type: "name",
            properties: {
              name: "EPSG:4326"
            }
          },
          type: "Polygon",
          coordinates: [
            [
              [-87.64153629541396, 41.88496253812402],
              [-87.64153629541396, 41.89141609339026],
              [-87.62059360742569, 41.89141609339026],
              [-87.62059360742569, 41.88496253812402],
              [-87.64153629541396, 41.88496253812402]
            ]
          ]
        },
        date__time_of_day_ge: 0,
        obs_date__le: "2016-06-20T00:00:00",
        data_type: "json",
        obs_date__ge: "2016-05-20T00:00:00",
        date__time_of_day_le: 23,
        offset: 0
      },
      message: [],
      total: 2
    },
    objects: [{
      creation_date: "2016-05-31",
      status: "Completed",
      completion_date: "2016-06-03",
      service_request_number: "16-03776585",
      type_of_service_request: "Rodent Baiting/Rat Complaint",
      number_of_premises_baited: 0,
      number_of_premises_with_garbage: 0,
      number_of_premises_with_rats: 0,
      current_activity: "Dispatch Crew",
      most_recent_action: "Inspected and baited",
      street_address: "210 N WELLS ST",
      zip_code: 60606,
      x_coordinate: 1174696.98801277,
      y_coordinate: 1901725.61738759,
      ward: 42,
      police_district: 1,
      community_area: 32,
      latitude: 41.8857288123151,
      longitude: -87.6339300624017,
      location: "(41.88572881231507, -87.63393006240169)"
    }, {
      creation_date: "2016-06-03",
      status: "Completed",
      completion_date: "2016-06-07",
      service_request_number: "16-03846813",
      type_of_service_request: "Rodent Baiting/Rat Complaint",
      number_of_premises_baited: 0,
      number_of_premises_with_garbage: 0,
      number_of_premises_with_rats: 0,
      current_activity: "Dispatch Crew",
      most_recent_action: "Inspected and baited",
      street_address: "201 N MILWAUKEE AVE",
      zip_code: 60661,
      x_coordinate: 1173074.07632055,
      y_coordinate: 1901718.59118149,
      ward: 42,
      police_district: 12,
      community_area: 28,
      latitude: 41.8857456736176,
      longitude: -87.6398898776785,
      location: "(41.88574567361762, -87.6398898776785)"
    }]
  }
};

export default testData;
