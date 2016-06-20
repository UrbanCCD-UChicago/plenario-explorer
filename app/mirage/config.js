//Dummy datasets used purely for testing.
export default function() {
  this.get('http://plenar.io/v1/api/shapes', function () {
    return {
      "meta": {
        "status": "ok",
        "message": ""
      },
      "objects": [
        {
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
        },
        {
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
        }
      ]
    };
  });

  this.get('http://plenar.io/v1/api/datasets', function () {
    return {
      "meta": {
        "status": "ok",
        "query": {
          "location_geom__within": null,
          "obs_date__ge": null,
          "obs_date__le": null,
          "dataset_name": null
        },
        "message": [],
        "total": 118
      },
      "objects": [
        {
          "attribution": "City of Chicago",
          "description": "This dataset shows the location, first operational date, and approaches of the speed cameras in the City of Chicago. The approach describes the originating direction of travel which is monitored by a speed camera.",
          "view_url": "https://data.cityofchicago.org/api/views/4i42-qv3h/rows",
          "columns": [
            {
              "field_type": "VARCHAR",
              "field_name": "first_approach"
            },
            {
              "field_type": "DOUBLE PRECISION",
              "field_name": "longitude"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "second_approach"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "location"
            },
            {
              "field_type": "DATE",
              "field_name": "go_live_date"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "address"
            },
            {
              "field_type": "DOUBLE PRECISION",
              "field_name": "latitude"
            }
          ],
          "last_update": "2016-01-25T14:59:32.164875",
          "obs_from": "2013-01-08",
          "bbox": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -87.7908320881842,
                  41.6631711722355
                ],
                [
                  -87.7908320881842,
                  42.0002595114495
                ],
                [
                  -87.5298482611285,
                  42.0002595114495
                ],
                [
                  -87.5298482611285,
                  41.6631711722355
                ],
                [
                  -87.7908320881842,
                  41.6631711722355
                ]
              ]
            ]
          },
          "human_name": "Speed Camera Locations",
          "obs_to": "2015-11-09",
          "date_added": "2016-01-25T14:59:32.164875",
          "source_url": "https://data.cityofchicago.org/api/views/4i42-qv3h/rows.csv?accessType=DOWNLOAD",
          "dataset_name": "speed_camera_locations",
          "update_freq": "yearly"
        },
        {
          "attribution": "City of Chicago",
          "description": "This dataset shows the location, first operational date, and approaches of the red light cameras in the City of Chicago. The approach describes the originating direction of travel which is monitored by a red light camera.",
          "view_url": "https://data.cityofchicago.org/api/views/thvf-6diy/rows",
          "columns": [
            {
              "field_type": "VARCHAR",
              "field_name": "first_approach"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "third_approach"
            },
            {
              "field_type": "DOUBLE PRECISION",
              "field_name": "longitude"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "second_approach"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "location"
            },
            {
              "field_type": "DATE",
              "field_name": "go_live_date"
            },
            {
              "field_type": "DOUBLE PRECISION",
              "field_name": "latitude"
            },
            {
              "field_type": "VARCHAR",
              "field_name": "intersection"
            }
          ],
          "last_update": "2016-06-19T08:16:34.785107",
          "obs_from": "2003-11-01",
          "bbox": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -87.812251,
                  41.677815
                ],
                [
                  -87.812251,
                  42.012279
                ],
                [
                  -87.575353,
                  42.012279
                ],
                [
                  -87.575353,
                  41.677815
                ],
                [
                  -87.812251,
                  41.677815
                ]
              ]
            ]
          },
          "human_name": "Red Light Camera Locations",
          "obs_to": "2011-05-11",
          "date_added": "2016-01-25T14:59:32.153054",
          "source_url": "https://data.cityofchicago.org/api/views/thvf-6diy/rows.csv?accessType=DOWNLOAD",
          "dataset_name": "red_light_camera_locations",
          "update_freq": "daily"
        },
      ]
    };
  });

  this.get('http://plenar.io/v1/api/detail-aggregate', function (_, request) {
    if(request.queryParams.dataset_name==="speed_camera_locations"){
      return {
        count: 23,
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
                  [
                    -87.68862247467041,
                    41.80510182643331
                  ],
                  [
                    -87.68862247467041,
                    41.90432124806034
                  ],
                  [
                    -87.55678653717041,
                    41.90432124806034
                  ],
                  [
                    -87.55678653717041,
                    41.80510182643331
                  ],
                  [
                    -87.68862247467041,
                    41.80510182643331
                  ]
                ]
              ]
            },
            obs_date__ge: "2000-06-01T00:00:00",
            data_type: "json",
            obs_date__le: "2017-07-02T00:00:00"
          },
          message: [ ]
        },
        objects: [
          {
            count: 0,
            datetime: "2000-05-29"
          },
          {
            count: 0,
            datetime: "2000-06-05"
          },
          {
            count: 0,
            datetime: "2000-06-12"
          },
          {
            count: 0,
            datetime: "2000-06-19"
          },
          {
            count: 0,
            datetime: "2000-06-26"
          },
          {
            count: 0,
            datetime: "2000-07-03"
          },
          {
            count: 0,
            datetime: "2000-07-10"
          },
          {
            count: 0,
            datetime: "2000-07-17"
          },
          {
            count: 0,
            datetime: "2000-07-24"
          },
          {
            count: 0,
            datetime: "2000-07-31"
          },
          {
            count: 0,
            datetime: "2000-08-07"
          },
          {
            count: 0,
            datetime: "2000-08-14"
          },
          {
            count: 0,
            datetime: "2000-08-21"
          },
          {
            count: 0,
            datetime: "2000-08-28"
          },
          {
            count: 0,
            datetime: "2000-09-04"
          },
          {
            count: 0,
            datetime: "2000-09-11"
          },
          {
            count: 0,
            datetime: "2000-09-18"
          },
          {
            count: 0,
            datetime: "2000-09-25"
          },
          {
            count: 0,
            datetime: "2000-10-02"
          },
          {
            count: 0,
            datetime: "2000-10-09"
          },
          {
            count: 0,
            datetime: "2000-10-16"
          },
          {
            count: 0,
            datetime: "2000-10-23"
          },
          {
            count: 0,
            datetime: "2000-10-30"
          },
          {
            count: 0,
            datetime: "2000-11-06"
          },
          {
            count: 0,
            datetime: "2000-11-13"
          },
          {
            count: 0,
            datetime: "2000-11-20"
          },
          {
            count: 0,
            datetime: "2000-11-27"
          },
          {
            count: 0,
            datetime: "2000-12-04"
          },
          {
            count: 0,
            datetime: "2000-12-11"
          },
          {
            count: 0,
            datetime: "2000-12-18"
          },
          {
            count: 0,
            datetime: "2000-12-25"
          },
          {
            count: 0,
            datetime: "2001-01-01"
          },
          {
            count: 0,
            datetime: "2001-01-08"
          },
          {
            count: 0,
            datetime: "2001-01-15"
          },
          {
            count: 0,
            datetime: "2001-01-22"
          },
          {
            count: 0,
            datetime: "2001-01-29"
          },
          {
            count: 0,
            datetime: "2001-02-05"
          },
          {
            count: 0,
            datetime: "2001-02-12"
          },
          {
            count: 0,
            datetime: "2001-02-19"
          },
          {
            count: 0,
            datetime: "2001-02-26"
          },
          {
            count: 0,
            datetime: "2001-03-05"
          },
          {
            count: 0,
            datetime: "2001-03-12"
          },
          {
            count: 0,
            datetime: "2001-03-19"
          },
          {
            count: 0,
            datetime: "2001-03-26"
          },
          {
            count: 0,
            datetime: "2001-04-02"
          },
          {
            count: 0,
            datetime: "2001-04-09"
          },
          {
            count: 0,
            datetime: "2001-04-16"
          },
          {
            count: 0,
            datetime: "2001-04-23"
          },
          {
            count: 0,
            datetime: "2001-04-30"
          },
          {
            count: 0,
            datetime: "2001-05-07"
          },
          {
            count: 0,
            datetime: "2001-05-14"
          },
          {
            count: 0,
            datetime: "2001-05-21"
          },
          {
            count: 0,
            datetime: "2001-05-28"
          },
          {
            count: 0,
            datetime: "2001-06-04"
          },
          {
            count: 0,
            datetime: "2001-06-11"
          },
          {
            count: 0,
            datetime: "2001-06-18"
          },
          {
            count: 0,
            datetime: "2001-06-25"
          },
          {
            count: 0,
            datetime: "2001-07-02"
          },
          {
            count: 0,
            datetime: "2001-07-09"
          },
          {
            count: 0,
            datetime: "2001-07-16"
          },
          {
            count: 0,
            datetime: "2001-07-23"
          },
          {
            count: 0,
            datetime: "2001-07-30"
          },
          {
            count: 0,
            datetime: "2001-08-06"
          },
          {
            count: 0,
            datetime: "2001-08-13"
          },
          {
            count: 0,
            datetime: "2001-08-20"
          },
          {
            count: 0,
            datetime: "2001-08-27"
          },
          {
            count: 0,
            datetime: "2001-09-03"
          },
          {
            count: 0,
            datetime: "2001-09-10"
          },
          {
            count: 0,
            datetime: "2001-09-17"
          },
          {
            count: 0,
            datetime: "2001-09-24"
          },
          {
            count: 0,
            datetime: "2001-10-01"
          },
          {
            count: 0,
            datetime: "2001-10-08"
          },
          {
            count: 0,
            datetime: "2001-10-15"
          },
          {
            count: 0,
            datetime: "2001-10-22"
          },
          {
            count: 0,
            datetime: "2001-10-29"
          },
          {
            count: 0,
            datetime: "2001-11-05"
          },
          {
            count: 0,
            datetime: "2001-11-12"
          },
          {
            count: 0,
            datetime: "2001-11-19"
          },
          {
            count: 0,
            datetime: "2001-11-26"
          },
          {
            count: 0,
            datetime: "2001-12-03"
          },
          {
            count: 0,
            datetime: "2001-12-10"
          },
          {
            count: 0,
            datetime: "2001-12-17"
          },
          {
            count: 0,
            datetime: "2001-12-24"
          },
          {
            count: 0,
            datetime: "2001-12-31"
          },
          {
            count: 0,
            datetime: "2002-01-07"
          },
          {
            count: 0,
            datetime: "2002-01-14"
          },
          {
            count: 0,
            datetime: "2002-01-21"
          },
          {
            count: 0,
            datetime: "2002-01-28"
          },
          {
            count: 0,
            datetime: "2002-02-04"
          },
          {
            count: 0,
            datetime: "2002-02-11"
          },
          {
            count: 0,
            datetime: "2002-02-18"
          },
          {
            count: 0,
            datetime: "2002-02-25"
          },
          {
            count: 0,
            datetime: "2002-03-04"
          },
          {
            count: 0,
            datetime: "2002-03-11"
          },
          {
            count: 0,
            datetime: "2002-03-18"
          },
          {
            count: 0,
            datetime: "2002-03-25"
          },
          {
            count: 0,
            datetime: "2002-04-01"
          },
          {
            count: 0,
            datetime: "2002-04-08"
          },
          {
            count: 0,
            datetime: "2002-04-15"
          },
          {
            count: 0,
            datetime: "2002-04-22"
          },
          {
            count: 0,
            datetime: "2002-04-29"
          },
          {
            count: 0,
            datetime: "2002-05-06"
          },
          {
            count: 0,
            datetime: "2002-05-13"
          },
          {
            count: 0,
            datetime: "2002-05-20"
          },
          {
            count: 0,
            datetime: "2002-05-27"
          },
          {
            count: 0,
            datetime: "2002-06-03"
          },
          {
            count: 0,
            datetime: "2002-06-10"
          },
          {
            count: 0,
            datetime: "2002-06-17"
          },
          {
            count: 0,
            datetime: "2002-06-24"
          },
          {
            count: 0,
            datetime: "2002-07-01"
          },
          {
            count: 0,
            datetime: "2002-07-08"
          },
          {
            count: 0,
            datetime: "2002-07-15"
          },
          {
            count: 0,
            datetime: "2002-07-22"
          },
          {
            count: 0,
            datetime: "2002-07-29"
          },
          {
            count: 0,
            datetime: "2002-08-05"
          },
          {
            count: 0,
            datetime: "2002-08-12"
          },
          {
            count: 0,
            datetime: "2002-08-19"
          },
          {
            count: 0,
            datetime: "2002-08-26"
          },
          {
            count: 0,
            datetime: "2002-09-02"
          },
          {
            count: 0,
            datetime: "2002-09-09"
          },
          {
            count: 0,
            datetime: "2002-09-16"
          },
          {
            count: 0,
            datetime: "2002-09-23"
          },
          {
            count: 0,
            datetime: "2002-09-30"
          },
          {
            count: 0,
            datetime: "2002-10-07"
          },
          {
            count: 0,
            datetime: "2002-10-14"
          },
          {
            count: 0,
            datetime: "2002-10-21"
          },
          {
            count: 0,
            datetime: "2002-10-28"
          },
          {
            count: 0,
            datetime: "2002-11-04"
          },
          {
            count: 0,
            datetime: "2002-11-11"
          },
          {
            count: 0,
            datetime: "2002-11-18"
          },
          {
            count: 0,
            datetime: "2002-11-25"
          },
          {
            count: 0,
            datetime: "2002-12-02"
          },
          {
            count: 0,
            datetime: "2002-12-09"
          },
          {
            count: 0,
            datetime: "2002-12-16"
          },
          {
            count: 0,
            datetime: "2002-12-23"
          },
          {
            count: 0,
            datetime: "2002-12-30"
          },
          {
            count: 0,
            datetime: "2003-01-06"
          },
          {
            count: 0,
            datetime: "2003-01-13"
          },
          {
            count: 0,
            datetime: "2003-01-20"
          },
          {
            count: 0,
            datetime: "2003-01-27"
          },
          {
            count: 0,
            datetime: "2003-02-03"
          },
          {
            count: 0,
            datetime: "2003-02-10"
          },
          {
            count: 0,
            datetime: "2003-02-17"
          },
          {
            count: 0,
            datetime: "2003-02-24"
          },
          {
            count: 0,
            datetime: "2003-03-03"
          },
          {
            count: 0,
            datetime: "2003-03-10"
          },
          {
            count: 0,
            datetime: "2003-03-17"
          },
          {
            count: 0,
            datetime: "2003-03-24"
          },
          {
            count: 0,
            datetime: "2003-03-31"
          },
          {
            count: 0,
            datetime: "2003-04-07"
          },
          {
            count: 0,
            datetime: "2003-04-14"
          },
          {
            count: 0,
            datetime: "2003-04-21"
          },
          {
            count: 0,
            datetime: "2003-04-28"
          },
          {
            count: 0,
            datetime: "2003-05-05"
          },
          {
            count: 0,
            datetime: "2003-05-12"
          },
          {
            count: 0,
            datetime: "2003-05-19"
          },
          {
            count: 0,
            datetime: "2003-05-26"
          },
          {
            count: 0,
            datetime: "2003-06-02"
          },
          {
            count: 0,
            datetime: "2003-06-09"
          },
          {
            count: 0,
            datetime: "2003-06-16"
          },
          {
            count: 0,
            datetime: "2003-06-23"
          },
          {
            count: 0,
            datetime: "2003-06-30"
          },
          {
            count: 0,
            datetime: "2003-07-07"
          },
          {
            count: 0,
            datetime: "2003-07-14"
          },
          {
            count: 0,
            datetime: "2003-07-21"
          },
          {
            count: 0,
            datetime: "2003-07-28"
          },
          {
            count: 0,
            datetime: "2003-08-04"
          },
          {
            count: 0,
            datetime: "2003-08-11"
          },
          {
            count: 0,
            datetime: "2003-08-18"
          },
          {
            count: 0,
            datetime: "2003-08-25"
          },
          {
            count: 0,
            datetime: "2003-09-01"
          },
          {
            count: 0,
            datetime: "2003-09-08"
          },
          {
            count: 0,
            datetime: "2003-09-15"
          },
          {
            count: 0,
            datetime: "2003-09-22"
          },
          {
            count: 0,
            datetime: "2003-09-29"
          },
          {
            count: 0,
            datetime: "2003-10-06"
          },
          {
            count: 0,
            datetime: "2003-10-13"
          },
          {
            count: 0,
            datetime: "2003-10-20"
          },
          {
            count: 0,
            datetime: "2003-10-27"
          },
          {
            count: 0,
            datetime: "2003-11-03"
          },
          {
            count: 0,
            datetime: "2003-11-10"
          },
          {
            count: 0,
            datetime: "2003-11-17"
          },
          {
            count: 0,
            datetime: "2003-11-24"
          },
          {
            count: 0,
            datetime: "2003-12-01"
          },
          {
            count: 0,
            datetime: "2003-12-08"
          },
          {
            count: 0,
            datetime: "2003-12-15"
          },
          {
            count: 0,
            datetime: "2003-12-22"
          },
          {
            count: 0,
            datetime: "2003-12-29"
          },
          {
            count: 0,
            datetime: "2004-01-05"
          },
          {
            count: 0,
            datetime: "2004-01-12"
          },
          {
            count: 0,
            datetime: "2004-01-19"
          },
          {
            count: 0,
            datetime: "2004-01-26"
          },
          {
            count: 0,
            datetime: "2004-02-02"
          },
          {
            count: 0,
            datetime: "2004-02-09"
          },
          {
            count: 0,
            datetime: "2004-02-16"
          },
          {
            count: 0,
            datetime: "2004-02-23"
          },
          {
            count: 0,
            datetime: "2004-03-01"
          },
          {
            count: 0,
            datetime: "2004-03-08"
          },
          {
            count: 0,
            datetime: "2004-03-15"
          },
          {
            count: 0,
            datetime: "2004-03-22"
          },
          {
            count: 0,
            datetime: "2004-03-29"
          },
          {
            count: 0,
            datetime: "2004-04-05"
          },
          {
            count: 0,
            datetime: "2004-04-12"
          },
          {
            count: 0,
            datetime: "2004-04-19"
          },
          {
            count: 0,
            datetime: "2004-04-26"
          },
          {
            count: 0,
            datetime: "2004-05-03"
          },
          {
            count: 0,
            datetime: "2004-05-10"
          },
          {
            count: 0,
            datetime: "2004-05-17"
          },
          {
            count: 0,
            datetime: "2004-05-24"
          },
          {
            count: 0,
            datetime: "2004-05-31"
          },
          {
            count: 0,
            datetime: "2004-06-07"
          },
          {
            count: 0,
            datetime: "2004-06-14"
          },
          {
            count: 0,
            datetime: "2004-06-21"
          },
          {
            count: 0,
            datetime: "2004-06-28"
          },
          {
            count: 0,
            datetime: "2004-07-05"
          },
          {
            count: 0,
            datetime: "2004-07-12"
          },
          {
            count: 0,
            datetime: "2004-07-19"
          },
          {
            count: 0,
            datetime: "2004-07-26"
          },
          {
            count: 0,
            datetime: "2004-08-02"
          },
          {
            count: 0,
            datetime: "2004-08-09"
          },
          {
            count: 0,
            datetime: "2004-08-16"
          },
          {
            count: 0,
            datetime: "2004-08-23"
          },
          {
            count: 0,
            datetime: "2004-08-30"
          },
          {
            count: 0,
            datetime: "2004-09-06"
          },
          {
            count: 0,
            datetime: "2004-09-13"
          },
          {
            count: 0,
            datetime: "2004-09-20"
          },
          {
            count: 0,
            datetime: "2004-09-27"
          },
          {
            count: 0,
            datetime: "2004-10-04"
          },
          {
            count: 0,
            datetime: "2004-10-11"
          },
          {
            count: 0,
            datetime: "2004-10-18"
          },
          {
            count: 0,
            datetime: "2004-10-25"
          },
          {
            count: 0,
            datetime: "2004-11-01"
          },
          {
            count: 0,
            datetime: "2004-11-08"
          },
          {
            count: 0,
            datetime: "2004-11-15"
          },
          {
            count: 0,
            datetime: "2004-11-22"
          },
          {
            count: 0,
            datetime: "2004-11-29"
          },
          {
            count: 0,
            datetime: "2004-12-06"
          },
          {
            count: 0,
            datetime: "2004-12-13"
          },
          {
            count: 0,
            datetime: "2004-12-20"
          },
          {
            count: 0,
            datetime: "2004-12-27"
          },
          {
            count: 0,
            datetime: "2005-01-03"
          },
          {
            count: 0,
            datetime: "2005-01-10"
          },
          {
            count: 0,
            datetime: "2005-01-17"
          },
          {
            count: 0,
            datetime: "2005-01-24"
          },
          {
            count: 0,
            datetime: "2005-01-31"
          },
          {
            count: 0,
            datetime: "2005-02-07"
          },
          {
            count: 0,
            datetime: "2005-02-14"
          },
          {
            count: 0,
            datetime: "2005-02-21"
          },
          {
            count: 0,
            datetime: "2005-02-28"
          },
          {
            count: 0,
            datetime: "2005-03-07"
          },
          {
            count: 0,
            datetime: "2005-03-14"
          },
          {
            count: 0,
            datetime: "2005-03-21"
          },
          {
            count: 0,
            datetime: "2005-03-28"
          },
          {
            count: 0,
            datetime: "2005-04-04"
          },
          {
            count: 0,
            datetime: "2005-04-11"
          },
          {
            count: 0,
            datetime: "2005-04-18"
          },
          {
            count: 0,
            datetime: "2005-04-25"
          },
          {
            count: 0,
            datetime: "2005-05-02"
          },
          {
            count: 0,
            datetime: "2005-05-09"
          },
          {
            count: 0,
            datetime: "2005-05-16"
          },
          {
            count: 0,
            datetime: "2005-05-23"
          },
          {
            count: 0,
            datetime: "2005-05-30"
          },
          {
            count: 0,
            datetime: "2005-06-06"
          },
          {
            count: 0,
            datetime: "2005-06-13"
          },
          {
            count: 0,
            datetime: "2005-06-20"
          },
          {
            count: 0,
            datetime: "2005-06-27"
          },
          {
            count: 0,
            datetime: "2005-07-04"
          },
          {
            count: 0,
            datetime: "2005-07-11"
          },
          {
            count: 0,
            datetime: "2005-07-18"
          },
          {
            count: 0,
            datetime: "2005-07-25"
          },
          {
            count: 0,
            datetime: "2005-08-01"
          },
          {
            count: 0,
            datetime: "2005-08-08"
          },
          {
            count: 0,
            datetime: "2005-08-15"
          },
          {
            count: 0,
            datetime: "2005-08-22"
          },
          {
            count: 0,
            datetime: "2005-08-29"
          },
          {
            count: 0,
            datetime: "2005-09-05"
          },
          {
            count: 0,
            datetime: "2005-09-12"
          },
          {
            count: 0,
            datetime: "2005-09-19"
          },
          {
            count: 0,
            datetime: "2005-09-26"
          },
          {
            count: 0,
            datetime: "2005-10-03"
          },
          {
            count: 0,
            datetime: "2005-10-10"
          },
          {
            count: 0,
            datetime: "2005-10-17"
          },
          {
            count: 0,
            datetime: "2005-10-24"
          },
          {
            count: 0,
            datetime: "2005-10-31"
          },
          {
            count: 0,
            datetime: "2005-11-07"
          },
          {
            count: 0,
            datetime: "2005-11-14"
          },
          {
            count: 0,
            datetime: "2005-11-21"
          },
          {
            count: 0,
            datetime: "2005-11-28"
          },
          {
            count: 0,
            datetime: "2005-12-05"
          },
          {
            count: 0,
            datetime: "2005-12-12"
          },
          {
            count: 0,
            datetime: "2005-12-19"
          },
          {
            count: 0,
            datetime: "2005-12-26"
          },
          {
            count: 0,
            datetime: "2006-01-02"
          },
          {
            count: 0,
            datetime: "2006-01-09"
          },
          {
            count: 0,
            datetime: "2006-01-16"
          },
          {
            count: 0,
            datetime: "2006-01-23"
          },
          {
            count: 0,
            datetime: "2006-01-30"
          },
          {
            count: 0,
            datetime: "2006-02-06"
          },
          {
            count: 0,
            datetime: "2006-02-13"
          },
          {
            count: 0,
            datetime: "2006-02-20"
          },
          {
            count: 0,
            datetime: "2006-02-27"
          },
          {
            count: 0,
            datetime: "2006-03-06"
          },
          {
            count: 0,
            datetime: "2006-03-13"
          },
          {
            count: 0,
            datetime: "2006-03-20"
          },
          {
            count: 0,
            datetime: "2006-03-27"
          },
          {
            count: 0,
            datetime: "2006-04-03"
          },
          {
            count: 0,
            datetime: "2006-04-10"
          },
          {
            count: 0,
            datetime: "2006-04-17"
          },
          {
            count: 0,
            datetime: "2006-04-24"
          },
          {
            count: 0,
            datetime: "2006-05-01"
          },
          {
            count: 0,
            datetime: "2006-05-08"
          },
          {
            count: 0,
            datetime: "2006-05-15"
          },
          {
            count: 0,
            datetime: "2006-05-22"
          },
          {
            count: 0,
            datetime: "2006-05-29"
          },
          {
            count: 0,
            datetime: "2006-06-05"
          },
          {
            count: 0,
            datetime: "2006-06-12"
          },
          {
            count: 0,
            datetime: "2006-06-19"
          },
          {
            count: 0,
            datetime: "2006-06-26"
          },
          {
            count: 0,
            datetime: "2006-07-03"
          },
          {
            count: 0,
            datetime: "2006-07-10"
          },
          {
            count: 0,
            datetime: "2006-07-17"
          },
          {
            count: 0,
            datetime: "2006-07-24"
          },
          {
            count: 0,
            datetime: "2006-07-31"
          },
          {
            count: 0,
            datetime: "2006-08-07"
          },
          {
            count: 0,
            datetime: "2006-08-14"
          },
          {
            count: 0,
            datetime: "2006-08-21"
          },
          {
            count: 0,
            datetime: "2006-08-28"
          },
          {
            count: 0,
            datetime: "2006-09-04"
          },
          {
            count: 0,
            datetime: "2006-09-11"
          },
          {
            count: 0,
            datetime: "2006-09-18"
          },
          {
            count: 0,
            datetime: "2006-09-25"
          },
          {
            count: 0,
            datetime: "2006-10-02"
          },
          {
            count: 0,
            datetime: "2006-10-09"
          },
          {
            count: 0,
            datetime: "2006-10-16"
          },
          {
            count: 0,
            datetime: "2006-10-23"
          },
          {
            count: 0,
            datetime: "2006-10-30"
          },
          {
            count: 0,
            datetime: "2006-11-06"
          },
          {
            count: 0,
            datetime: "2006-11-13"
          },
          {
            count: 0,
            datetime: "2006-11-20"
          },
          {
            count: 0,
            datetime: "2006-11-27"
          },
          {
            count: 0,
            datetime: "2006-12-04"
          },
          {
            count: 0,
            datetime: "2006-12-11"
          },
          {
            count: 0,
            datetime: "2006-12-18"
          },
          {
            count: 0,
            datetime: "2006-12-25"
          },
          {
            count: 0,
            datetime: "2007-01-01"
          },
          {
            count: 0,
            datetime: "2007-01-08"
          },
          {
            count: 0,
            datetime: "2007-01-15"
          },
          {
            count: 0,
            datetime: "2007-01-22"
          },
          {
            count: 0,
            datetime: "2007-01-29"
          },
          {
            count: 0,
            datetime: "2007-02-05"
          },
          {
            count: 0,
            datetime: "2007-02-12"
          },
          {
            count: 0,
            datetime: "2007-02-19"
          },
          {
            count: 0,
            datetime: "2007-02-26"
          },
          {
            count: 0,
            datetime: "2007-03-05"
          },
          {
            count: 0,
            datetime: "2007-03-12"
          },
          {
            count: 0,
            datetime: "2007-03-19"
          },
          {
            count: 0,
            datetime: "2007-03-26"
          },
          {
            count: 0,
            datetime: "2007-04-02"
          },
          {
            count: 0,
            datetime: "2007-04-09"
          },
          {
            count: 0,
            datetime: "2007-04-16"
          },
          {
            count: 0,
            datetime: "2007-04-23"
          },
          {
            count: 0,
            datetime: "2007-04-30"
          },
          {
            count: 0,
            datetime: "2007-05-07"
          },
          {
            count: 0,
            datetime: "2007-05-14"
          },
          {
            count: 0,
            datetime: "2007-05-21"
          },
          {
            count: 0,
            datetime: "2007-05-28"
          },
          {
            count: 0,
            datetime: "2007-06-04"
          },
          {
            count: 0,
            datetime: "2007-06-11"
          },
          {
            count: 0,
            datetime: "2007-06-18"
          },
          {
            count: 0,
            datetime: "2007-06-25"
          },
          {
            count: 0,
            datetime: "2007-07-02"
          },
          {
            count: 0,
            datetime: "2007-07-09"
          },
          {
            count: 0,
            datetime: "2007-07-16"
          },
          {
            count: 0,
            datetime: "2007-07-23"
          },
          {
            count: 0,
            datetime: "2007-07-30"
          },
          {
            count: 0,
            datetime: "2007-08-06"
          },
          {
            count: 0,
            datetime: "2007-08-13"
          },
          {
            count: 0,
            datetime: "2007-08-20"
          },
          {
            count: 0,
            datetime: "2007-08-27"
          },
          {
            count: 0,
            datetime: "2007-09-03"
          },
          {
            count: 0,
            datetime: "2007-09-10"
          },
          {
            count: 0,
            datetime: "2007-09-17"
          },
          {
            count: 0,
            datetime: "2007-09-24"
          },
          {
            count: 0,
            datetime: "2007-10-01"
          },
          {
            count: 0,
            datetime: "2007-10-08"
          },
          {
            count: 0,
            datetime: "2007-10-15"
          },
          {
            count: 0,
            datetime: "2007-10-22"
          },
          {
            count: 0,
            datetime: "2007-10-29"
          },
          {
            count: 0,
            datetime: "2007-11-05"
          },
          {
            count: 0,
            datetime: "2007-11-12"
          },
          {
            count: 0,
            datetime: "2007-11-19"
          },
          {
            count: 0,
            datetime: "2007-11-26"
          },
          {
            count: 0,
            datetime: "2007-12-03"
          },
          {
            count: 0,
            datetime: "2007-12-10"
          },
          {
            count: 0,
            datetime: "2007-12-17"
          },
          {
            count: 0,
            datetime: "2007-12-24"
          },
          {
            count: 0,
            datetime: "2007-12-31"
          },
          {
            count: 0,
            datetime: "2008-01-07"
          },
          {
            count: 0,
            datetime: "2008-01-14"
          },
          {
            count: 0,
            datetime: "2008-01-21"
          },
          {
            count: 0,
            datetime: "2008-01-28"
          },
          {
            count: 0,
            datetime: "2008-02-04"
          },
          {
            count: 0,
            datetime: "2008-02-11"
          },
          {
            count: 0,
            datetime: "2008-02-18"
          },
          {
            count: 0,
            datetime: "2008-02-25"
          },
          {
            count: 0,
            datetime: "2008-03-03"
          },
          {
            count: 0,
            datetime: "2008-03-10"
          },
          {
            count: 0,
            datetime: "2008-03-17"
          },
          {
            count: 0,
            datetime: "2008-03-24"
          },
          {
            count: 0,
            datetime: "2008-03-31"
          },
          {
            count: 0,
            datetime: "2008-04-07"
          },
          {
            count: 0,
            datetime: "2008-04-14"
          },
          {
            count: 0,
            datetime: "2008-04-21"
          },
          {
            count: 0,
            datetime: "2008-04-28"
          },
          {
            count: 0,
            datetime: "2008-05-05"
          },
          {
            count: 0,
            datetime: "2008-05-12"
          },
          {
            count: 0,
            datetime: "2008-05-19"
          },
          {
            count: 0,
            datetime: "2008-05-26"
          },
          {
            count: 0,
            datetime: "2008-06-02"
          },
          {
            count: 0,
            datetime: "2008-06-09"
          },
          {
            count: 0,
            datetime: "2008-06-16"
          },
          {
            count: 0,
            datetime: "2008-06-23"
          },
          {
            count: 0,
            datetime: "2008-06-30"
          },
          {
            count: 0,
            datetime: "2008-07-07"
          },
          {
            count: 0,
            datetime: "2008-07-14"
          },
          {
            count: 0,
            datetime: "2008-07-21"
          },
          {
            count: 0,
            datetime: "2008-07-28"
          },
          {
            count: 0,
            datetime: "2008-08-04"
          },
          {
            count: 0,
            datetime: "2008-08-11"
          },
          {
            count: 0,
            datetime: "2008-08-18"
          },
          {
            count: 0,
            datetime: "2008-08-25"
          },
          {
            count: 0,
            datetime: "2008-09-01"
          },
          {
            count: 0,
            datetime: "2008-09-08"
          },
          {
            count: 0,
            datetime: "2008-09-15"
          },
          {
            count: 0,
            datetime: "2008-09-22"
          },
          {
            count: 0,
            datetime: "2008-09-29"
          },
          {
            count: 0,
            datetime: "2008-10-06"
          },
          {
            count: 0,
            datetime: "2008-10-13"
          },
          {
            count: 0,
            datetime: "2008-10-20"
          },
          {
            count: 0,
            datetime: "2008-10-27"
          },
          {
            count: 0,
            datetime: "2008-11-03"
          },
          {
            count: 0,
            datetime: "2008-11-10"
          },
          {
            count: 0,
            datetime: "2008-11-17"
          },
          {
            count: 0,
            datetime: "2008-11-24"
          },
          {
            count: 0,
            datetime: "2008-12-01"
          },
          {
            count: 0,
            datetime: "2008-12-08"
          },
          {
            count: 0,
            datetime: "2008-12-15"
          },
          {
            count: 0,
            datetime: "2008-12-22"
          },
          {
            count: 0,
            datetime: "2008-12-29"
          },
          {
            count: 0,
            datetime: "2009-01-05"
          },
          {
            count: 0,
            datetime: "2009-01-12"
          },
          {
            count: 0,
            datetime: "2009-01-19"
          },
          {
            count: 0,
            datetime: "2009-01-26"
          },
          {
            count: 0,
            datetime: "2009-02-02"
          },
          {
            count: 0,
            datetime: "2009-02-09"
          },
          {
            count: 0,
            datetime: "2009-02-16"
          },
          {
            count: 0,
            datetime: "2009-02-23"
          },
          {
            count: 0,
            datetime: "2009-03-02"
          },
          {
            count: 0,
            datetime: "2009-03-09"
          },
          {
            count: 0,
            datetime: "2009-03-16"
          },
          {
            count: 0,
            datetime: "2009-03-23"
          },
          {
            count: 0,
            datetime: "2009-03-30"
          },
          {
            count: 0,
            datetime: "2009-04-06"
          },
          {
            count: 0,
            datetime: "2009-04-13"
          },
          {
            count: 0,
            datetime: "2009-04-20"
          },
          {
            count: 0,
            datetime: "2009-04-27"
          },
          {
            count: 0,
            datetime: "2009-05-04"
          },
          {
            count: 0,
            datetime: "2009-05-11"
          },
          {
            count: 0,
            datetime: "2009-05-18"
          },
          {
            count: 0,
            datetime: "2009-05-25"
          },
          {
            count: 0,
            datetime: "2009-06-01"
          },
          {
            count: 0,
            datetime: "2009-06-08"
          },
          {
            count: 0,
            datetime: "2009-06-15"
          },
          {
            count: 0,
            datetime: "2009-06-22"
          },
          {
            count: 0,
            datetime: "2009-06-29"
          },
          {
            count: 0,
            datetime: "2009-07-06"
          },
          {
            count: 0,
            datetime: "2009-07-13"
          },
          {
            count: 0,
            datetime: "2009-07-20"
          },
          {
            count: 0,
            datetime: "2009-07-27"
          },
          {
            count: 0,
            datetime: "2009-08-03"
          },
          {
            count: 0,
            datetime: "2009-08-10"
          },
          {
            count: 0,
            datetime: "2009-08-17"
          },
          {
            count: 0,
            datetime: "2009-08-24"
          },
          {
            count: 0,
            datetime: "2009-08-31"
          },
          {
            count: 0,
            datetime: "2009-09-07"
          },
          {
            count: 0,
            datetime: "2009-09-14"
          },
          {
            count: 0,
            datetime: "2009-09-21"
          },
          {
            count: 0,
            datetime: "2009-09-28"
          },
          {
            count: 0,
            datetime: "2009-10-05"
          },
          {
            count: 0,
            datetime: "2009-10-12"
          },
          {
            count: 0,
            datetime: "2009-10-19"
          },
          {
            count: 0,
            datetime: "2009-10-26"
          },
          {
            count: 0,
            datetime: "2009-11-02"
          },
          {
            count: 0,
            datetime: "2009-11-09"
          },
          {
            count: 0,
            datetime: "2009-11-16"
          },
          {
            count: 0,
            datetime: "2009-11-23"
          },
          {
            count: 0,
            datetime: "2009-11-30"
          },
          {
            count: 0,
            datetime: "2009-12-07"
          },
          {
            count: 0,
            datetime: "2009-12-14"
          },
          {
            count: 0,
            datetime: "2009-12-21"
          },
          {
            count: 0,
            datetime: "2009-12-28"
          },
          {
            count: 0,
            datetime: "2010-01-04"
          },
          {
            count: 0,
            datetime: "2010-01-11"
          },
          {
            count: 0,
            datetime: "2010-01-18"
          },
          {
            count: 0,
            datetime: "2010-01-25"
          },
          {
            count: 0,
            datetime: "2010-02-01"
          },
          {
            count: 0,
            datetime: "2010-02-08"
          },
          {
            count: 0,
            datetime: "2010-02-15"
          },
          {
            count: 0,
            datetime: "2010-02-22"
          },
          {
            count: 0,
            datetime: "2010-03-01"
          },
          {
            count: 0,
            datetime: "2010-03-08"
          },
          {
            count: 0,
            datetime: "2010-03-15"
          },
          {
            count: 0,
            datetime: "2010-03-22"
          },
          {
            count: 0,
            datetime: "2010-03-29"
          },
          {
            count: 0,
            datetime: "2010-04-05"
          },
          {
            count: 0,
            datetime: "2010-04-12"
          },
          {
            count: 0,
            datetime: "2010-04-19"
          },
          {
            count: 0,
            datetime: "2010-04-26"
          },
          {
            count: 0,
            datetime: "2010-05-03"
          },
          {
            count: 0,
            datetime: "2010-05-10"
          },
          {
            count: 0,
            datetime: "2010-05-17"
          },
          {
            count: 0,
            datetime: "2010-05-24"
          },
          {
            count: 0,
            datetime: "2010-05-31"
          },
          {
            count: 0,
            datetime: "2010-06-07"
          },
          {
            count: 0,
            datetime: "2010-06-14"
          },
          {
            count: 0,
            datetime: "2010-06-21"
          },
          {
            count: 0,
            datetime: "2010-06-28"
          },
          {
            count: 0,
            datetime: "2010-07-05"
          },
          {
            count: 0,
            datetime: "2010-07-12"
          },
          {
            count: 0,
            datetime: "2010-07-19"
          },
          {
            count: 0,
            datetime: "2010-07-26"
          },
          {
            count: 0,
            datetime: "2010-08-02"
          },
          {
            count: 0,
            datetime: "2010-08-09"
          },
          {
            count: 0,
            datetime: "2010-08-16"
          },
          {
            count: 0,
            datetime: "2010-08-23"
          },
          {
            count: 0,
            datetime: "2010-08-30"
          },
          {
            count: 0,
            datetime: "2010-09-06"
          },
          {
            count: 0,
            datetime: "2010-09-13"
          },
          {
            count: 0,
            datetime: "2010-09-20"
          },
          {
            count: 0,
            datetime: "2010-09-27"
          },
          {
            count: 0,
            datetime: "2010-10-04"
          },
          {
            count: 0,
            datetime: "2010-10-11"
          },
          {
            count: 0,
            datetime: "2010-10-18"
          },
          {
            count: 0,
            datetime: "2010-10-25"
          },
          {
            count: 0,
            datetime: "2010-11-01"
          },
          {
            count: 0,
            datetime: "2010-11-08"
          },
          {
            count: 0,
            datetime: "2010-11-15"
          },
          {
            count: 0,
            datetime: "2010-11-22"
          },
          {
            count: 0,
            datetime: "2010-11-29"
          },
          {
            count: 0,
            datetime: "2010-12-06"
          },
          {
            count: 0,
            datetime: "2010-12-13"
          },
          {
            count: 0,
            datetime: "2010-12-20"
          },
          {
            count: 0,
            datetime: "2010-12-27"
          },
          {
            count: 0,
            datetime: "2011-01-03"
          },
          {
            count: 0,
            datetime: "2011-01-10"
          },
          {
            count: 0,
            datetime: "2011-01-17"
          },
          {
            count: 0,
            datetime: "2011-01-24"
          },
          {
            count: 0,
            datetime: "2011-01-31"
          },
          {
            count: 0,
            datetime: "2011-02-07"
          },
          {
            count: 0,
            datetime: "2011-02-14"
          },
          {
            count: 0,
            datetime: "2011-02-21"
          },
          {
            count: 0,
            datetime: "2011-02-28"
          },
          {
            count: 0,
            datetime: "2011-03-07"
          },
          {
            count: 0,
            datetime: "2011-03-14"
          },
          {
            count: 0,
            datetime: "2011-03-21"
          },
          {
            count: 0,
            datetime: "2011-03-28"
          },
          {
            count: 0,
            datetime: "2011-04-04"
          },
          {
            count: 0,
            datetime: "2011-04-11"
          },
          {
            count: 0,
            datetime: "2011-04-18"
          },
          {
            count: 0,
            datetime: "2011-04-25"
          },
          {
            count: 0,
            datetime: "2011-05-02"
          },
          {
            count: 0,
            datetime: "2011-05-09"
          },
          {
            count: 0,
            datetime: "2011-05-16"
          },
          {
            count: 0,
            datetime: "2011-05-23"
          },
          {
            count: 0,
            datetime: "2011-05-30"
          },
          {
            count: 0,
            datetime: "2011-06-06"
          },
          {
            count: 0,
            datetime: "2011-06-13"
          },
          {
            count: 0,
            datetime: "2011-06-20"
          },
          {
            count: 0,
            datetime: "2011-06-27"
          },
          {
            count: 0,
            datetime: "2011-07-04"
          },
          {
            count: 0,
            datetime: "2011-07-11"
          },
          {
            count: 0,
            datetime: "2011-07-18"
          },
          {
            count: 0,
            datetime: "2011-07-25"
          },
          {
            count: 0,
            datetime: "2011-08-01"
          },
          {
            count: 0,
            datetime: "2011-08-08"
          },
          {
            count: 0,
            datetime: "2011-08-15"
          },
          {
            count: 0,
            datetime: "2011-08-22"
          },
          {
            count: 0,
            datetime: "2011-08-29"
          },
          {
            count: 0,
            datetime: "2011-09-05"
          },
          {
            count: 0,
            datetime: "2011-09-12"
          },
          {
            count: 0,
            datetime: "2011-09-19"
          },
          {
            count: 0,
            datetime: "2011-09-26"
          },
          {
            count: 0,
            datetime: "2011-10-03"
          },
          {
            count: 0,
            datetime: "2011-10-10"
          },
          {
            count: 0,
            datetime: "2011-10-17"
          },
          {
            count: 0,
            datetime: "2011-10-24"
          },
          {
            count: 0,
            datetime: "2011-10-31"
          },
          {
            count: 0,
            datetime: "2011-11-07"
          },
          {
            count: 0,
            datetime: "2011-11-14"
          },
          {
            count: 0,
            datetime: "2011-11-21"
          },
          {
            count: 0,
            datetime: "2011-11-28"
          },
          {
            count: 0,
            datetime: "2011-12-05"
          },
          {
            count: 0,
            datetime: "2011-12-12"
          },
          {
            count: 0,
            datetime: "2011-12-19"
          },
          {
            count: 0,
            datetime: "2011-12-26"
          },
          {
            count: 0,
            datetime: "2012-01-02"
          },
          {
            count: 0,
            datetime: "2012-01-09"
          },
          {
            count: 0,
            datetime: "2012-01-16"
          },
          {
            count: 0,
            datetime: "2012-01-23"
          },
          {
            count: 0,
            datetime: "2012-01-30"
          },
          {
            count: 0,
            datetime: "2012-02-06"
          },
          {
            count: 0,
            datetime: "2012-02-13"
          },
          {
            count: 0,
            datetime: "2012-02-20"
          },
          {
            count: 0,
            datetime: "2012-02-27"
          },
          {
            count: 0,
            datetime: "2012-03-05"
          },
          {
            count: 0,
            datetime: "2012-03-12"
          },
          {
            count: 0,
            datetime: "2012-03-19"
          },
          {
            count: 0,
            datetime: "2012-03-26"
          },
          {
            count: 0,
            datetime: "2012-04-02"
          },
          {
            count: 0,
            datetime: "2012-04-09"
          },
          {
            count: 0,
            datetime: "2012-04-16"
          },
          {
            count: 0,
            datetime: "2012-04-23"
          },
          {
            count: 0,
            datetime: "2012-04-30"
          },
          {
            count: 0,
            datetime: "2012-05-07"
          },
          {
            count: 0,
            datetime: "2012-05-14"
          },
          {
            count: 0,
            datetime: "2012-05-21"
          },
          {
            count: 0,
            datetime: "2012-05-28"
          },
          {
            count: 0,
            datetime: "2012-06-04"
          },
          {
            count: 0,
            datetime: "2012-06-11"
          },
          {
            count: 0,
            datetime: "2012-06-18"
          },
          {
            count: 0,
            datetime: "2012-06-25"
          },
          {
            count: 0,
            datetime: "2012-07-02"
          },
          {
            count: 0,
            datetime: "2012-07-09"
          },
          {
            count: 0,
            datetime: "2012-07-16"
          },
          {
            count: 0,
            datetime: "2012-07-23"
          },
          {
            count: 0,
            datetime: "2012-07-30"
          },
          {
            count: 0,
            datetime: "2012-08-06"
          },
          {
            count: 0,
            datetime: "2012-08-13"
          },
          {
            count: 0,
            datetime: "2012-08-20"
          },
          {
            count: 0,
            datetime: "2012-08-27"
          },
          {
            count: 0,
            datetime: "2012-09-03"
          },
          {
            count: 0,
            datetime: "2012-09-10"
          },
          {
            count: 0,
            datetime: "2012-09-17"
          },
          {
            count: 0,
            datetime: "2012-09-24"
          },
          {
            count: 0,
            datetime: "2012-10-01"
          },
          {
            count: 0,
            datetime: "2012-10-08"
          },
          {
            count: 0,
            datetime: "2012-10-15"
          },
          {
            count: 0,
            datetime: "2012-10-22"
          },
          {
            count: 0,
            datetime: "2012-10-29"
          },
          {
            count: 0,
            datetime: "2012-11-05"
          },
          {
            count: 0,
            datetime: "2012-11-12"
          },
          {
            count: 0,
            datetime: "2012-11-19"
          },
          {
            count: 0,
            datetime: "2012-11-26"
          },
          {
            count: 0,
            datetime: "2012-12-03"
          },
          {
            count: 0,
            datetime: "2012-12-10"
          },
          {
            count: 0,
            datetime: "2012-12-17"
          },
          {
            count: 0,
            datetime: "2012-12-24"
          },
          {
            count: 0,
            datetime: "2012-12-31"
          },
          {
            count: 0,
            datetime: "2013-01-07"
          },
          {
            count: 0,
            datetime: "2013-01-14"
          },
          {
            count: 0,
            datetime: "2013-01-21"
          },
          {
            count: 0,
            datetime: "2013-01-28"
          },
          {
            count: 0,
            datetime: "2013-02-04"
          },
          {
            count: 0,
            datetime: "2013-02-11"
          },
          {
            count: 0,
            datetime: "2013-02-18"
          },
          {
            count: 0,
            datetime: "2013-02-25"
          },
          {
            count: 0,
            datetime: "2013-03-04"
          },
          {
            count: 0,
            datetime: "2013-03-11"
          },
          {
            count: 0,
            datetime: "2013-03-18"
          },
          {
            count: 0,
            datetime: "2013-03-25"
          },
          {
            count: 0,
            datetime: "2013-04-01"
          },
          {
            count: 0,
            datetime: "2013-04-08"
          },
          {
            count: 0,
            datetime: "2013-04-15"
          },
          {
            count: 0,
            datetime: "2013-04-22"
          },
          {
            count: 0,
            datetime: "2013-04-29"
          },
          {
            count: 0,
            datetime: "2013-05-06"
          },
          {
            count: 0,
            datetime: "2013-05-13"
          },
          {
            count: 0,
            datetime: "2013-05-20"
          },
          {
            count: 0,
            datetime: "2013-05-27"
          },
          {
            count: 0,
            datetime: "2013-06-03"
          },
          {
            count: 0,
            datetime: "2013-06-10"
          },
          {
            count: 0,
            datetime: "2013-06-17"
          },
          {
            count: 0,
            datetime: "2013-06-24"
          },
          {
            count: 0,
            datetime: "2013-07-01"
          },
          {
            count: 0,
            datetime: "2013-07-08"
          },
          {
            count: 0,
            datetime: "2013-07-15"
          },
          {
            count: 0,
            datetime: "2013-07-22"
          },
          {
            count: 0,
            datetime: "2013-07-29"
          },
          {
            count: 0,
            datetime: "2013-08-05"
          },
          {
            count: 0,
            datetime: "2013-08-12"
          },
          {
            count: 0,
            datetime: "2013-08-19"
          },
          {
            count: 0,
            datetime: "2013-08-26"
          },
          {
            count: 2,
            datetime: "2013-09-02"
          },
          {
            count: 0,
            datetime: "2013-09-09"
          },
          {
            count: 0,
            datetime: "2013-09-16"
          },
          {
            count: 0,
            datetime: "2013-09-23"
          },
          {
            count: 0,
            datetime: "2013-09-30"
          },
          {
            count: 0,
            datetime: "2013-10-07"
          },
          {
            count: 0,
            datetime: "2013-10-14"
          },
          {
            count: 0,
            datetime: "2013-10-21"
          },
          {
            count: 0,
            datetime: "2013-10-28"
          },
          {
            count: 0,
            datetime: "2013-11-04"
          },
          {
            count: 0,
            datetime: "2013-11-11"
          },
          {
            count: 0,
            datetime: "2013-11-18"
          },
          {
            count: 2,
            datetime: "2013-11-25"
          },
          {
            count: 0,
            datetime: "2013-12-02"
          },
          {
            count: 0,
            datetime: "2013-12-09"
          },
          {
            count: 0,
            datetime: "2013-12-16"
          },
          {
            count: 0,
            datetime: "2013-12-23"
          },
          {
            count: 0,
            datetime: "2013-12-30"
          },
          {
            count: 0,
            datetime: "2014-01-06"
          },
          {
            count: 1,
            datetime: "2014-01-13"
          },
          {
            count: 1,
            datetime: "2014-01-20"
          },
          {
            count: 0,
            datetime: "2014-01-27"
          },
          {
            count: 2,
            datetime: "2014-02-03"
          },
          {
            count: 0,
            datetime: "2014-02-10"
          },
          {
            count: 0,
            datetime: "2014-02-17"
          },
          {
            count: 3,
            datetime: "2014-02-24"
          },
          {
            count: 2,
            datetime: "2014-03-03"
          },
          {
            count: 0,
            datetime: "2014-03-10"
          },
          {
            count: 0,
            datetime: "2014-03-17"
          },
          {
            count: 1,
            datetime: "2014-03-24"
          },
          {
            count: 0,
            datetime: "2014-03-31"
          },
          {
            count: 0,
            datetime: "2014-04-07"
          },
          {
            count: 1,
            datetime: "2014-04-14"
          },
          {
            count: 2,
            datetime: "2014-04-21"
          },
          {
            count: 2,
            datetime: "2014-04-28"
          },
          {
            count: 0,
            datetime: "2014-05-05"
          },
          {
            count: 2,
            datetime: "2014-05-12"
          },
          {
            count: 0,
            datetime: "2014-05-19"
          },
          {
            count: 0,
            datetime: "2014-05-26"
          },
          {
            count: 0,
            datetime: "2014-06-02"
          },
          {
            count: 0,
            datetime: "2014-06-09"
          },
          {
            count: 0,
            datetime: "2014-06-16"
          },
          {
            count: 0,
            datetime: "2014-06-23"
          },
          {
            count: 0,
            datetime: "2014-06-30"
          },
          {
            count: 0,
            datetime: "2014-07-07"
          },
          {
            count: 0,
            datetime: "2014-07-14"
          },
          {
            count: 0,
            datetime: "2014-07-21"
          },
          {
            count: 0,
            datetime: "2014-07-28"
          },
          {
            count: 0,
            datetime: "2014-08-04"
          },
          {
            count: 0,
            datetime: "2014-08-11"
          },
          {
            count: 0,
            datetime: "2014-08-18"
          },
          {
            count: 0,
            datetime: "2014-08-25"
          },
          {
            count: 1,
            datetime: "2014-09-01"
          },
          {
            count: 0,
            datetime: "2014-09-08"
          },
          {
            count: 0,
            datetime: "2014-09-15"
          },
          {
            count: 0,
            datetime: "2014-09-22"
          },
          {
            count: 0,
            datetime: "2014-09-29"
          },
          {
            count: 0,
            datetime: "2014-10-06"
          },
          {
            count: 0,
            datetime: "2014-10-13"
          },
          {
            count: 0,
            datetime: "2014-10-20"
          },
          {
            count: 0,
            datetime: "2014-10-27"
          },
          {
            count: 0,
            datetime: "2014-11-03"
          },
          {
            count: 0,
            datetime: "2014-11-10"
          },
          {
            count: 0,
            datetime: "2014-11-17"
          },
          {
            count: 0,
            datetime: "2014-11-24"
          },
          {
            count: 0,
            datetime: "2014-12-01"
          },
          {
            count: 0,
            datetime: "2014-12-08"
          },
          {
            count: 0,
            datetime: "2014-12-15"
          },
          {
            count: 0,
            datetime: "2014-12-22"
          },
          {
            count: 0,
            datetime: "2014-12-29"
          },
          {
            count: 0,
            datetime: "2015-01-05"
          },
          {
            count: 0,
            datetime: "2015-01-12"
          },
          {
            count: 0,
            datetime: "2015-01-19"
          },
          {
            count: 0,
            datetime: "2015-01-26"
          },
          {
            count: 0,
            datetime: "2015-02-02"
          },
          {
            count: 0,
            datetime: "2015-02-09"
          },
          {
            count: 0,
            datetime: "2015-02-16"
          },
          {
            count: 0,
            datetime: "2015-02-23"
          },
          {
            count: 0,
            datetime: "2015-03-02"
          },
          {
            count: 0,
            datetime: "2015-03-09"
          },
          {
            count: 0,
            datetime: "2015-03-16"
          },
          {
            count: 0,
            datetime: "2015-03-23"
          },
          {
            count: 0,
            datetime: "2015-03-30"
          },
          {
            count: 0,
            datetime: "2015-04-06"
          },
          {
            count: 0,
            datetime: "2015-04-13"
          },
          {
            count: 0,
            datetime: "2015-04-20"
          },
          {
            count: 0,
            datetime: "2015-04-27"
          },
          {
            count: 0,
            datetime: "2015-05-04"
          },
          {
            count: 0,
            datetime: "2015-05-11"
          },
          {
            count: 0,
            datetime: "2015-05-18"
          },
          {
            count: 0,
            datetime: "2015-05-25"
          },
          {
            count: 0,
            datetime: "2015-06-01"
          },
          {
            count: 0,
            datetime: "2015-06-08"
          },
          {
            count: 0,
            datetime: "2015-06-15"
          },
          {
            count: 0,
            datetime: "2015-06-22"
          },
          {
            count: 0,
            datetime: "2015-06-29"
          },
          {
            count: 0,
            datetime: "2015-07-06"
          },
          {
            count: 0,
            datetime: "2015-07-13"
          },
          {
            count: 0,
            datetime: "2015-07-20"
          },
          {
            count: 0,
            datetime: "2015-07-27"
          },
          {
            count: 0,
            datetime: "2015-08-03"
          },
          {
            count: 0,
            datetime: "2015-08-10"
          },
          {
            count: 0,
            datetime: "2015-08-17"
          },
          {
            count: 0,
            datetime: "2015-08-24"
          },
          {
            count: 0,
            datetime: "2015-08-31"
          },
          {
            count: 0,
            datetime: "2015-09-07"
          },
          {
            count: 0,
            datetime: "2015-09-14"
          },
          {
            count: 0,
            datetime: "2015-09-21"
          },
          {
            count: 0,
            datetime: "2015-09-28"
          },
          {
            count: 0,
            datetime: "2015-10-05"
          },
          {
            count: 0,
            datetime: "2015-10-12"
          },
          {
            count: 0,
            datetime: "2015-10-19"
          },
          {
            count: 0,
            datetime: "2015-10-26"
          },
          {
            count: 0,
            datetime: "2015-11-02"
          },
          {
            count: 1,
            datetime: "2015-11-09"
          },
          {
            count: 0,
            datetime: "2015-11-16"
          },
          {
            count: 0,
            datetime: "2015-11-23"
          },
          {
            count: 0,
            datetime: "2015-11-30"
          },
          {
            count: 0,
            datetime: "2015-12-07"
          },
          {
            count: 0,
            datetime: "2015-12-14"
          },
          {
            count: 0,
            datetime: "2015-12-21"
          },
          {
            count: 0,
            datetime: "2015-12-28"
          },
          {
            count: 0,
            datetime: "2016-01-04"
          },
          {
            count: 0,
            datetime: "2016-01-11"
          },
          {
            count: 0,
            datetime: "2016-01-18"
          },
          {
            count: 0,
            datetime: "2016-01-25"
          },
          {
            count: 0,
            datetime: "2016-02-01"
          },
          {
            count: 0,
            datetime: "2016-02-08"
          },
          {
            count: 0,
            datetime: "2016-02-15"
          },
          {
            count: 0,
            datetime: "2016-02-22"
          },
          {
            count: 0,
            datetime: "2016-02-29"
          },
          {
            count: 0,
            datetime: "2016-03-07"
          },
          {
            count: 0,
            datetime: "2016-03-14"
          },
          {
            count: 0,
            datetime: "2016-03-21"
          },
          {
            count: 0,
            datetime: "2016-03-28"
          },
          {
            count: 0,
            datetime: "2016-04-04"
          },
          {
            count: 0,
            datetime: "2016-04-11"
          },
          {
            count: 0,
            datetime: "2016-04-18"
          },
          {
            count: 0,
            datetime: "2016-04-25"
          },
          {
            count: 0,
            datetime: "2016-05-02"
          },
          {
            count: 0,
            datetime: "2016-05-09"
          },
          {
            count: 0,
            datetime: "2016-05-16"
          },
          {
            count: 0,
            datetime: "2016-05-23"
          },
          {
            count: 0,
            datetime: "2016-05-30"
          },
          {
            count: 0,
            datetime: "2016-06-06"
          },
          {
            count: 0,
            datetime: "2016-06-13"
          },
          {
            count: 0,
            datetime: "2016-06-20"
          },
          {
            count: 0,
            datetime: "2016-06-27"
          },
          {
            count: 0,
            datetime: "2016-07-04"
          },
          {
            count: 0,
            datetime: "2016-07-11"
          },
          {
            count: 0,
            datetime: "2016-07-18"
          },
          {
            count: 0,
            datetime: "2016-07-25"
          },
          {
            count: 0,
            datetime: "2016-08-01"
          },
          {
            count: 0,
            datetime: "2016-08-08"
          },
          {
            count: 0,
            datetime: "2016-08-15"
          },
          {
            count: 0,
            datetime: "2016-08-22"
          },
          {
            count: 0,
            datetime: "2016-08-29"
          },
          {
            count: 0,
            datetime: "2016-09-05"
          },
          {
            count: 0,
            datetime: "2016-09-12"
          },
          {
            count: 0,
            datetime: "2016-09-19"
          },
          {
            count: 0,
            datetime: "2016-09-26"
          },
          {
            count: 0,
            datetime: "2016-10-03"
          },
          {
            count: 0,
            datetime: "2016-10-10"
          },
          {
            count: 0,
            datetime: "2016-10-17"
          },
          {
            count: 0,
            datetime: "2016-10-24"
          },
          {
            count: 0,
            datetime: "2016-10-31"
          },
          {
            count: 0,
            datetime: "2016-11-07"
          },
          {
            count: 0,
            datetime: "2016-11-14"
          },
          {
            count: 0,
            datetime: "2016-11-21"
          },
          {
            count: 0,
            datetime: "2016-11-28"
          },
          {
            count: 0,
            datetime: "2016-12-05"
          },
          {
            count: 0,
            datetime: "2016-12-12"
          },
          {
            count: 0,
            datetime: "2016-12-19"
          },
          {
            count: 0,
            datetime: "2016-12-26"
          },
          {
            count: 0,
            datetime: "2017-01-02"
          },
          {
            count: 0,
            datetime: "2017-01-09"
          },
          {
            count: 0,
            datetime: "2017-01-16"
          },
          {
            count: 0,
            datetime: "2017-01-23"
          },
          {
            count: 0,
            datetime: "2017-01-30"
          },
          {
            count: 0,
            datetime: "2017-02-06"
          },
          {
            count: 0,
            datetime: "2017-02-13"
          },
          {
            count: 0,
            datetime: "2017-02-20"
          },
          {
            count: 0,
            datetime: "2017-02-27"
          },
          {
            count: 0,
            datetime: "2017-03-06"
          },
          {
            count: 0,
            datetime: "2017-03-13"
          },
          {
            count: 0,
            datetime: "2017-03-20"
          },
          {
            count: 0,
            datetime: "2017-03-27"
          },
          {
            count: 0,
            datetime: "2017-04-03"
          },
          {
            count: 0,
            datetime: "2017-04-10"
          },
          {
            count: 0,
            datetime: "2017-04-17"
          },
          {
            count: 0,
            datetime: "2017-04-24"
          },
          {
            count: 0,
            datetime: "2017-05-01"
          },
          {
            count: 0,
            datetime: "2017-05-08"
          },
          {
            count: 0,
            datetime: "2017-05-15"
          },
          {
            count: 0,
            datetime: "2017-05-22"
          },
          {
            count: 0,
            datetime: "2017-05-29"
          },
          {
            count: 0,
            datetime: "2017-06-05"
          },
          {
            count: 0,
            datetime: "2017-06-12"
          },
          {
            count: 0,
            datetime: "2017-06-19"
          },
          {
            count: 0,
            datetime: "2017-06-26"
          }
        ]
      };
    } else if (request.queryParams.dataset_name==="red_light_camera_locations") {
      return {
        count: 18,
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
                  [
                    -87.68862247467041,
                    41.80510182643331
                  ],
                  [
                    -87.68862247467041,
                    41.90432124806034
                  ],
                  [
                    -87.55678653717041,
                    41.90432124806034
                  ],
                  [
                    -87.55678653717041,
                    41.80510182643331
                  ],
                  [
                    -87.68862247467041,
                    41.80510182643331
                  ]
                ]
              ]
            },
            obs_date__ge: "2000-06-01T00:00:00",
            data_type: "json",
            obs_date__le: "2017-07-02T00:00:00"
          },
          message: [ ]
        },
        objects: [
          {
            count: 0,
            datetime: "2000-05-29"
          },
          {
            count: 0,
            datetime: "2000-06-05"
          },
          {
            count: 0,
            datetime: "2000-06-12"
          },
          {
            count: 0,
            datetime: "2000-06-19"
          },
          {
            count: 0,
            datetime: "2000-06-26"
          },
          {
            count: 0,
            datetime: "2000-07-03"
          },
          {
            count: 0,
            datetime: "2000-07-10"
          },
          {
            count: 0,
            datetime: "2000-07-17"
          },
          {
            count: 0,
            datetime: "2000-07-24"
          },
          {
            count: 0,
            datetime: "2000-07-31"
          },
          {
            count: 0,
            datetime: "2000-08-07"
          },
          {
            count: 0,
            datetime: "2000-08-14"
          },
          {
            count: 0,
            datetime: "2000-08-21"
          },
          {
            count: 0,
            datetime: "2000-08-28"
          },
          {
            count: 0,
            datetime: "2000-09-04"
          },
          {
            count: 0,
            datetime: "2000-09-11"
          },
          {
            count: 0,
            datetime: "2000-09-18"
          },
          {
            count: 0,
            datetime: "2000-09-25"
          },
          {
            count: 0,
            datetime: "2000-10-02"
          },
          {
            count: 0,
            datetime: "2000-10-09"
          },
          {
            count: 0,
            datetime: "2000-10-16"
          },
          {
            count: 0,
            datetime: "2000-10-23"
          },
          {
            count: 0,
            datetime: "2000-10-30"
          },
          {
            count: 0,
            datetime: "2000-11-06"
          },
          {
            count: 0,
            datetime: "2000-11-13"
          },
          {
            count: 0,
            datetime: "2000-11-20"
          },
          {
            count: 0,
            datetime: "2000-11-27"
          },
          {
            count: 0,
            datetime: "2000-12-04"
          },
          {
            count: 0,
            datetime: "2000-12-11"
          },
          {
            count: 0,
            datetime: "2000-12-18"
          },
          {
            count: 0,
            datetime: "2000-12-25"
          },
          {
            count: 0,
            datetime: "2001-01-01"
          },
          {
            count: 0,
            datetime: "2001-01-08"
          },
          {
            count: 0,
            datetime: "2001-01-15"
          },
          {
            count: 0,
            datetime: "2001-01-22"
          },
          {
            count: 0,
            datetime: "2001-01-29"
          },
          {
            count: 0,
            datetime: "2001-02-05"
          },
          {
            count: 0,
            datetime: "2001-02-12"
          },
          {
            count: 0,
            datetime: "2001-02-19"
          },
          {
            count: 0,
            datetime: "2001-02-26"
          },
          {
            count: 0,
            datetime: "2001-03-05"
          },
          {
            count: 0,
            datetime: "2001-03-12"
          },
          {
            count: 0,
            datetime: "2001-03-19"
          },
          {
            count: 0,
            datetime: "2001-03-26"
          },
          {
            count: 0,
            datetime: "2001-04-02"
          },
          {
            count: 0,
            datetime: "2001-04-09"
          },
          {
            count: 0,
            datetime: "2001-04-16"
          },
          {
            count: 0,
            datetime: "2001-04-23"
          },
          {
            count: 0,
            datetime: "2001-04-30"
          },
          {
            count: 0,
            datetime: "2001-05-07"
          },
          {
            count: 0,
            datetime: "2001-05-14"
          },
          {
            count: 0,
            datetime: "2001-05-21"
          },
          {
            count: 0,
            datetime: "2001-05-28"
          },
          {
            count: 0,
            datetime: "2001-06-04"
          },
          {
            count: 0,
            datetime: "2001-06-11"
          },
          {
            count: 0,
            datetime: "2001-06-18"
          },
          {
            count: 0,
            datetime: "2001-06-25"
          },
          {
            count: 0,
            datetime: "2001-07-02"
          },
          {
            count: 0,
            datetime: "2001-07-09"
          },
          {
            count: 0,
            datetime: "2001-07-16"
          },
          {
            count: 0,
            datetime: "2001-07-23"
          },
          {
            count: 0,
            datetime: "2001-07-30"
          },
          {
            count: 0,
            datetime: "2001-08-06"
          },
          {
            count: 0,
            datetime: "2001-08-13"
          },
          {
            count: 0,
            datetime: "2001-08-20"
          },
          {
            count: 0,
            datetime: "2001-08-27"
          },
          {
            count: 0,
            datetime: "2001-09-03"
          },
          {
            count: 0,
            datetime: "2001-09-10"
          },
          {
            count: 0,
            datetime: "2001-09-17"
          },
          {
            count: 0,
            datetime: "2001-09-24"
          },
          {
            count: 0,
            datetime: "2001-10-01"
          },
          {
            count: 0,
            datetime: "2001-10-08"
          },
          {
            count: 0,
            datetime: "2001-10-15"
          },
          {
            count: 0,
            datetime: "2001-10-22"
          },
          {
            count: 0,
            datetime: "2001-10-29"
          },
          {
            count: 0,
            datetime: "2001-11-05"
          },
          {
            count: 0,
            datetime: "2001-11-12"
          },
          {
            count: 0,
            datetime: "2001-11-19"
          },
          {
            count: 0,
            datetime: "2001-11-26"
          },
          {
            count: 0,
            datetime: "2001-12-03"
          },
          {
            count: 0,
            datetime: "2001-12-10"
          },
          {
            count: 0,
            datetime: "2001-12-17"
          },
          {
            count: 0,
            datetime: "2001-12-24"
          },
          {
            count: 0,
            datetime: "2001-12-31"
          },
          {
            count: 0,
            datetime: "2002-01-07"
          },
          {
            count: 0,
            datetime: "2002-01-14"
          },
          {
            count: 0,
            datetime: "2002-01-21"
          },
          {
            count: 0,
            datetime: "2002-01-28"
          },
          {
            count: 0,
            datetime: "2002-02-04"
          },
          {
            count: 0,
            datetime: "2002-02-11"
          },
          {
            count: 0,
            datetime: "2002-02-18"
          },
          {
            count: 0,
            datetime: "2002-02-25"
          },
          {
            count: 0,
            datetime: "2002-03-04"
          },
          {
            count: 0,
            datetime: "2002-03-11"
          },
          {
            count: 0,
            datetime: "2002-03-18"
          },
          {
            count: 0,
            datetime: "2002-03-25"
          },
          {
            count: 0,
            datetime: "2002-04-01"
          },
          {
            count: 0,
            datetime: "2002-04-08"
          },
          {
            count: 0,
            datetime: "2002-04-15"
          },
          {
            count: 0,
            datetime: "2002-04-22"
          },
          {
            count: 0,
            datetime: "2002-04-29"
          },
          {
            count: 0,
            datetime: "2002-05-06"
          },
          {
            count: 0,
            datetime: "2002-05-13"
          },
          {
            count: 0,
            datetime: "2002-05-20"
          },
          {
            count: 0,
            datetime: "2002-05-27"
          },
          {
            count: 0,
            datetime: "2002-06-03"
          },
          {
            count: 0,
            datetime: "2002-06-10"
          },
          {
            count: 0,
            datetime: "2002-06-17"
          },
          {
            count: 0,
            datetime: "2002-06-24"
          },
          {
            count: 0,
            datetime: "2002-07-01"
          },
          {
            count: 0,
            datetime: "2002-07-08"
          },
          {
            count: 0,
            datetime: "2002-07-15"
          },
          {
            count: 0,
            datetime: "2002-07-22"
          },
          {
            count: 0,
            datetime: "2002-07-29"
          },
          {
            count: 0,
            datetime: "2002-08-05"
          },
          {
            count: 0,
            datetime: "2002-08-12"
          },
          {
            count: 0,
            datetime: "2002-08-19"
          },
          {
            count: 0,
            datetime: "2002-08-26"
          },
          {
            count: 0,
            datetime: "2002-09-02"
          },
          {
            count: 0,
            datetime: "2002-09-09"
          },
          {
            count: 0,
            datetime: "2002-09-16"
          },
          {
            count: 0,
            datetime: "2002-09-23"
          },
          {
            count: 0,
            datetime: "2002-09-30"
          },
          {
            count: 0,
            datetime: "2002-10-07"
          },
          {
            count: 0,
            datetime: "2002-10-14"
          },
          {
            count: 0,
            datetime: "2002-10-21"
          },
          {
            count: 0,
            datetime: "2002-10-28"
          },
          {
            count: 0,
            datetime: "2002-11-04"
          },
          {
            count: 0,
            datetime: "2002-11-11"
          },
          {
            count: 0,
            datetime: "2002-11-18"
          },
          {
            count: 0,
            datetime: "2002-11-25"
          },
          {
            count: 0,
            datetime: "2002-12-02"
          },
          {
            count: 0,
            datetime: "2002-12-09"
          },
          {
            count: 0,
            datetime: "2002-12-16"
          },
          {
            count: 0,
            datetime: "2002-12-23"
          },
          {
            count: 0,
            datetime: "2002-12-30"
          },
          {
            count: 0,
            datetime: "2003-01-06"
          },
          {
            count: 0,
            datetime: "2003-01-13"
          },
          {
            count: 0,
            datetime: "2003-01-20"
          },
          {
            count: 0,
            datetime: "2003-01-27"
          },
          {
            count: 0,
            datetime: "2003-02-03"
          },
          {
            count: 0,
            datetime: "2003-02-10"
          },
          {
            count: 0,
            datetime: "2003-02-17"
          },
          {
            count: 0,
            datetime: "2003-02-24"
          },
          {
            count: 0,
            datetime: "2003-03-03"
          },
          {
            count: 0,
            datetime: "2003-03-10"
          },
          {
            count: 0,
            datetime: "2003-03-17"
          },
          {
            count: 0,
            datetime: "2003-03-24"
          },
          {
            count: 0,
            datetime: "2003-03-31"
          },
          {
            count: 0,
            datetime: "2003-04-07"
          },
          {
            count: 0,
            datetime: "2003-04-14"
          },
          {
            count: 0,
            datetime: "2003-04-21"
          },
          {
            count: 0,
            datetime: "2003-04-28"
          },
          {
            count: 0,
            datetime: "2003-05-05"
          },
          {
            count: 0,
            datetime: "2003-05-12"
          },
          {
            count: 0,
            datetime: "2003-05-19"
          },
          {
            count: 0,
            datetime: "2003-05-26"
          },
          {
            count: 0,
            datetime: "2003-06-02"
          },
          {
            count: 0,
            datetime: "2003-06-09"
          },
          {
            count: 0,
            datetime: "2003-06-16"
          },
          {
            count: 0,
            datetime: "2003-06-23"
          },
          {
            count: 0,
            datetime: "2003-06-30"
          },
          {
            count: 0,
            datetime: "2003-07-07"
          },
          {
            count: 0,
            datetime: "2003-07-14"
          },
          {
            count: 0,
            datetime: "2003-07-21"
          },
          {
            count: 0,
            datetime: "2003-07-28"
          },
          {
            count: 0,
            datetime: "2003-08-04"
          },
          {
            count: 0,
            datetime: "2003-08-11"
          },
          {
            count: 0,
            datetime: "2003-08-18"
          },
          {
            count: 0,
            datetime: "2003-08-25"
          },
          {
            count: 0,
            datetime: "2003-09-01"
          },
          {
            count: 0,
            datetime: "2003-09-08"
          },
          {
            count: 0,
            datetime: "2003-09-15"
          },
          {
            count: 0,
            datetime: "2003-09-22"
          },
          {
            count: 0,
            datetime: "2003-09-29"
          },
          {
            count: 0,
            datetime: "2003-10-06"
          },
          {
            count: 0,
            datetime: "2003-10-13"
          },
          {
            count: 0,
            datetime: "2003-10-20"
          },
          {
            count: 0,
            datetime: "2003-10-27"
          },
          {
            count: 0,
            datetime: "2003-11-03"
          },
          {
            count: 0,
            datetime: "2003-11-10"
          },
          {
            count: 0,
            datetime: "2003-11-17"
          },
          {
            count: 0,
            datetime: "2003-11-24"
          },
          {
            count: 0,
            datetime: "2003-12-01"
          },
          {
            count: 0,
            datetime: "2003-12-08"
          },
          {
            count: 0,
            datetime: "2003-12-15"
          },
          {
            count: 0,
            datetime: "2003-12-22"
          },
          {
            count: 0,
            datetime: "2003-12-29"
          },
          {
            count: 0,
            datetime: "2004-01-05"
          },
          {
            count: 0,
            datetime: "2004-01-12"
          },
          {
            count: 0,
            datetime: "2004-01-19"
          },
          {
            count: 0,
            datetime: "2004-01-26"
          },
          {
            count: 0,
            datetime: "2004-02-02"
          },
          {
            count: 0,
            datetime: "2004-02-09"
          },
          {
            count: 0,
            datetime: "2004-02-16"
          },
          {
            count: 0,
            datetime: "2004-02-23"
          },
          {
            count: 1,
            datetime: "2004-03-01"
          },
          {
            count: 0,
            datetime: "2004-03-08"
          },
          {
            count: 0,
            datetime: "2004-03-15"
          },
          {
            count: 0,
            datetime: "2004-03-22"
          },
          {
            count: 0,
            datetime: "2004-03-29"
          },
          {
            count: 1,
            datetime: "2004-04-05"
          },
          {
            count: 0,
            datetime: "2004-04-12"
          },
          {
            count: 0,
            datetime: "2004-04-19"
          },
          {
            count: 1,
            datetime: "2004-04-26"
          },
          {
            count: 0,
            datetime: "2004-05-03"
          },
          {
            count: 0,
            datetime: "2004-05-10"
          },
          {
            count: 0,
            datetime: "2004-05-17"
          },
          {
            count: 0,
            datetime: "2004-05-24"
          },
          {
            count: 1,
            datetime: "2004-05-31"
          },
          {
            count: 0,
            datetime: "2004-06-07"
          },
          {
            count: 0,
            datetime: "2004-06-14"
          },
          {
            count: 0,
            datetime: "2004-06-21"
          },
          {
            count: 0,
            datetime: "2004-06-28"
          },
          {
            count: 0,
            datetime: "2004-07-05"
          },
          {
            count: 0,
            datetime: "2004-07-12"
          },
          {
            count: 0,
            datetime: "2004-07-19"
          },
          {
            count: 0,
            datetime: "2004-07-26"
          },
          {
            count: 0,
            datetime: "2004-08-02"
          },
          {
            count: 0,
            datetime: "2004-08-09"
          },
          {
            count: 0,
            datetime: "2004-08-16"
          },
          {
            count: 0,
            datetime: "2004-08-23"
          },
          {
            count: 0,
            datetime: "2004-08-30"
          },
          {
            count: 0,
            datetime: "2004-09-06"
          },
          {
            count: 0,
            datetime: "2004-09-13"
          },
          {
            count: 0,
            datetime: "2004-09-20"
          },
          {
            count: 0,
            datetime: "2004-09-27"
          },
          {
            count: 0,
            datetime: "2004-10-04"
          },
          {
            count: 1,
            datetime: "2004-10-11"
          },
          {
            count: 0,
            datetime: "2004-10-18"
          },
          {
            count: 0,
            datetime: "2004-10-25"
          },
          {
            count: 0,
            datetime: "2004-11-01"
          },
          {
            count: 0,
            datetime: "2004-11-08"
          },
          {
            count: 0,
            datetime: "2004-11-15"
          },
          {
            count: 0,
            datetime: "2004-11-22"
          },
          {
            count: 1,
            datetime: "2004-11-29"
          },
          {
            count: 0,
            datetime: "2004-12-06"
          },
          {
            count: 0,
            datetime: "2004-12-13"
          },
          {
            count: 0,
            datetime: "2004-12-20"
          },
          {
            count: 0,
            datetime: "2004-12-27"
          },
          {
            count: 0,
            datetime: "2005-01-03"
          },
          {
            count: 0,
            datetime: "2005-01-10"
          },
          {
            count: 0,
            datetime: "2005-01-17"
          },
          {
            count: 0,
            datetime: "2005-01-24"
          },
          {
            count: 0,
            datetime: "2005-01-31"
          },
          {
            count: 0,
            datetime: "2005-02-07"
          },
          {
            count: 0,
            datetime: "2005-02-14"
          },
          {
            count: 0,
            datetime: "2005-02-21"
          },
          {
            count: 0,
            datetime: "2005-02-28"
          },
          {
            count: 0,
            datetime: "2005-03-07"
          },
          {
            count: 0,
            datetime: "2005-03-14"
          },
          {
            count: 0,
            datetime: "2005-03-21"
          },
          {
            count: 0,
            datetime: "2005-03-28"
          },
          {
            count: 0,
            datetime: "2005-04-04"
          },
          {
            count: 0,
            datetime: "2005-04-11"
          },
          {
            count: 0,
            datetime: "2005-04-18"
          },
          {
            count: 0,
            datetime: "2005-04-25"
          },
          {
            count: 0,
            datetime: "2005-05-02"
          },
          {
            count: 0,
            datetime: "2005-05-09"
          },
          {
            count: 0,
            datetime: "2005-05-16"
          },
          {
            count: 0,
            datetime: "2005-05-23"
          },
          {
            count: 0,
            datetime: "2005-05-30"
          },
          {
            count: 0,
            datetime: "2005-06-06"
          },
          {
            count: 0,
            datetime: "2005-06-13"
          },
          {
            count: 0,
            datetime: "2005-06-20"
          },
          {
            count: 0,
            datetime: "2005-06-27"
          },
          {
            count: 0,
            datetime: "2005-07-04"
          },
          {
            count: 0,
            datetime: "2005-07-11"
          },
          {
            count: 0,
            datetime: "2005-07-18"
          },
          {
            count: 0,
            datetime: "2005-07-25"
          },
          {
            count: 0,
            datetime: "2005-08-01"
          },
          {
            count: 0,
            datetime: "2005-08-08"
          },
          {
            count: 0,
            datetime: "2005-08-15"
          },
          {
            count: 0,
            datetime: "2005-08-22"
          },
          {
            count: 0,
            datetime: "2005-08-29"
          },
          {
            count: 0,
            datetime: "2005-09-05"
          },
          {
            count: 0,
            datetime: "2005-09-12"
          },
          {
            count: 0,
            datetime: "2005-09-19"
          },
          {
            count: 0,
            datetime: "2005-09-26"
          },
          {
            count: 0,
            datetime: "2005-10-03"
          },
          {
            count: 0,
            datetime: "2005-10-10"
          },
          {
            count: 0,
            datetime: "2005-10-17"
          },
          {
            count: 0,
            datetime: "2005-10-24"
          },
          {
            count: 0,
            datetime: "2005-10-31"
          },
          {
            count: 0,
            datetime: "2005-11-07"
          },
          {
            count: 0,
            datetime: "2005-11-14"
          },
          {
            count: 0,
            datetime: "2005-11-21"
          },
          {
            count: 0,
            datetime: "2005-11-28"
          },
          {
            count: 0,
            datetime: "2005-12-05"
          },
          {
            count: 0,
            datetime: "2005-12-12"
          },
          {
            count: 0,
            datetime: "2005-12-19"
          },
          {
            count: 0,
            datetime: "2005-12-26"
          },
          {
            count: 0,
            datetime: "2006-01-02"
          },
          {
            count: 0,
            datetime: "2006-01-09"
          },
          {
            count: 0,
            datetime: "2006-01-16"
          },
          {
            count: 0,
            datetime: "2006-01-23"
          },
          {
            count: 0,
            datetime: "2006-01-30"
          },
          {
            count: 0,
            datetime: "2006-02-06"
          },
          {
            count: 0,
            datetime: "2006-02-13"
          },
          {
            count: 0,
            datetime: "2006-02-20"
          },
          {
            count: 0,
            datetime: "2006-02-27"
          },
          {
            count: 0,
            datetime: "2006-03-06"
          },
          {
            count: 0,
            datetime: "2006-03-13"
          },
          {
            count: 0,
            datetime: "2006-03-20"
          },
          {
            count: 0,
            datetime: "2006-03-27"
          },
          {
            count: 0,
            datetime: "2006-04-03"
          },
          {
            count: 0,
            datetime: "2006-04-10"
          },
          {
            count: 0,
            datetime: "2006-04-17"
          },
          {
            count: 0,
            datetime: "2006-04-24"
          },
          {
            count: 0,
            datetime: "2006-05-01"
          },
          {
            count: 0,
            datetime: "2006-05-08"
          },
          {
            count: 0,
            datetime: "2006-05-15"
          },
          {
            count: 0,
            datetime: "2006-05-22"
          },
          {
            count: 0,
            datetime: "2006-05-29"
          },
          {
            count: 0,
            datetime: "2006-06-05"
          },
          {
            count: 0,
            datetime: "2006-06-12"
          },
          {
            count: 0,
            datetime: "2006-06-19"
          },
          {
            count: 0,
            datetime: "2006-06-26"
          },
          {
            count: 0,
            datetime: "2006-07-03"
          },
          {
            count: 0,
            datetime: "2006-07-10"
          },
          {
            count: 0,
            datetime: "2006-07-17"
          },
          {
            count: 0,
            datetime: "2006-07-24"
          },
          {
            count: 0,
            datetime: "2006-07-31"
          },
          {
            count: 0,
            datetime: "2006-08-07"
          },
          {
            count: 0,
            datetime: "2006-08-14"
          },
          {
            count: 0,
            datetime: "2006-08-21"
          },
          {
            count: 0,
            datetime: "2006-08-28"
          },
          {
            count: 0,
            datetime: "2006-09-04"
          },
          {
            count: 0,
            datetime: "2006-09-11"
          },
          {
            count: 0,
            datetime: "2006-09-18"
          },
          {
            count: 0,
            datetime: "2006-09-25"
          },
          {
            count: 0,
            datetime: "2006-10-02"
          },
          {
            count: 0,
            datetime: "2006-10-09"
          },
          {
            count: 0,
            datetime: "2006-10-16"
          },
          {
            count: 0,
            datetime: "2006-10-23"
          },
          {
            count: 0,
            datetime: "2006-10-30"
          },
          {
            count: 0,
            datetime: "2006-11-06"
          },
          {
            count: 0,
            datetime: "2006-11-13"
          },
          {
            count: 0,
            datetime: "2006-11-20"
          },
          {
            count: 0,
            datetime: "2006-11-27"
          },
          {
            count: 0,
            datetime: "2006-12-04"
          },
          {
            count: 0,
            datetime: "2006-12-11"
          },
          {
            count: 0,
            datetime: "2006-12-18"
          },
          {
            count: 0,
            datetime: "2006-12-25"
          },
          {
            count: 0,
            datetime: "2007-01-01"
          },
          {
            count: 0,
            datetime: "2007-01-08"
          },
          {
            count: 0,
            datetime: "2007-01-15"
          },
          {
            count: 0,
            datetime: "2007-01-22"
          },
          {
            count: 0,
            datetime: "2007-01-29"
          },
          {
            count: 0,
            datetime: "2007-02-05"
          },
          {
            count: 0,
            datetime: "2007-02-12"
          },
          {
            count: 0,
            datetime: "2007-02-19"
          },
          {
            count: 0,
            datetime: "2007-02-26"
          },
          {
            count: 0,
            datetime: "2007-03-05"
          },
          {
            count: 0,
            datetime: "2007-03-12"
          },
          {
            count: 0,
            datetime: "2007-03-19"
          },
          {
            count: 0,
            datetime: "2007-03-26"
          },
          {
            count: 0,
            datetime: "2007-04-02"
          },
          {
            count: 0,
            datetime: "2007-04-09"
          },
          {
            count: 0,
            datetime: "2007-04-16"
          },
          {
            count: 0,
            datetime: "2007-04-23"
          },
          {
            count: 0,
            datetime: "2007-04-30"
          },
          {
            count: 1,
            datetime: "2007-05-07"
          },
          {
            count: 0,
            datetime: "2007-05-14"
          },
          {
            count: 0,
            datetime: "2007-05-21"
          },
          {
            count: 0,
            datetime: "2007-05-28"
          },
          {
            count: 0,
            datetime: "2007-06-04"
          },
          {
            count: 0,
            datetime: "2007-06-11"
          },
          {
            count: 0,
            datetime: "2007-06-18"
          },
          {
            count: 0,
            datetime: "2007-06-25"
          },
          {
            count: 0,
            datetime: "2007-07-02"
          },
          {
            count: 0,
            datetime: "2007-07-09"
          },
          {
            count: 0,
            datetime: "2007-07-16"
          },
          {
            count: 0,
            datetime: "2007-07-23"
          },
          {
            count: 0,
            datetime: "2007-07-30"
          },
          {
            count: 0,
            datetime: "2007-08-06"
          },
          {
            count: 0,
            datetime: "2007-08-13"
          },
          {
            count: 0,
            datetime: "2007-08-20"
          },
          {
            count: 0,
            datetime: "2007-08-27"
          },
          {
            count: 0,
            datetime: "2007-09-03"
          },
          {
            count: 0,
            datetime: "2007-09-10"
          },
          {
            count: 0,
            datetime: "2007-09-17"
          },
          {
            count: 0,
            datetime: "2007-09-24"
          },
          {
            count: 0,
            datetime: "2007-10-01"
          },
          {
            count: 0,
            datetime: "2007-10-08"
          },
          {
            count: 0,
            datetime: "2007-10-15"
          },
          {
            count: 1,
            datetime: "2007-10-22"
          },
          {
            count: 0,
            datetime: "2007-10-29"
          },
          {
            count: 0,
            datetime: "2007-11-05"
          },
          {
            count: 0,
            datetime: "2007-11-12"
          },
          {
            count: 0,
            datetime: "2007-11-19"
          },
          {
            count: 0,
            datetime: "2007-11-26"
          },
          {
            count: 0,
            datetime: "2007-12-03"
          },
          {
            count: 0,
            datetime: "2007-12-10"
          },
          {
            count: 0,
            datetime: "2007-12-17"
          },
          {
            count: 0,
            datetime: "2007-12-24"
          },
          {
            count: 0,
            datetime: "2007-12-31"
          },
          {
            count: 0,
            datetime: "2008-01-07"
          },
          {
            count: 0,
            datetime: "2008-01-14"
          },
          {
            count: 0,
            datetime: "2008-01-21"
          },
          {
            count: 0,
            datetime: "2008-01-28"
          },
          {
            count: 0,
            datetime: "2008-02-04"
          },
          {
            count: 0,
            datetime: "2008-02-11"
          },
          {
            count: 0,
            datetime: "2008-02-18"
          },
          {
            count: 0,
            datetime: "2008-02-25"
          },
          {
            count: 0,
            datetime: "2008-03-03"
          },
          {
            count: 0,
            datetime: "2008-03-10"
          },
          {
            count: 0,
            datetime: "2008-03-17"
          },
          {
            count: 0,
            datetime: "2008-03-24"
          },
          {
            count: 0,
            datetime: "2008-03-31"
          },
          {
            count: 0,
            datetime: "2008-04-07"
          },
          {
            count: 0,
            datetime: "2008-04-14"
          },
          {
            count: 0,
            datetime: "2008-04-21"
          },
          {
            count: 0,
            datetime: "2008-04-28"
          },
          {
            count: 0,
            datetime: "2008-05-05"
          },
          {
            count: 1,
            datetime: "2008-05-12"
          },
          {
            count: 0,
            datetime: "2008-05-19"
          },
          {
            count: 1,
            datetime: "2008-05-26"
          },
          {
            count: 0,
            datetime: "2008-06-02"
          },
          {
            count: 2,
            datetime: "2008-06-09"
          },
          {
            count: 1,
            datetime: "2008-06-16"
          },
          {
            count: 0,
            datetime: "2008-06-23"
          },
          {
            count: 0,
            datetime: "2008-06-30"
          },
          {
            count: 0,
            datetime: "2008-07-07"
          },
          {
            count: 0,
            datetime: "2008-07-14"
          },
          {
            count: 0,
            datetime: "2008-07-21"
          },
          {
            count: 0,
            datetime: "2008-07-28"
          },
          {
            count: 0,
            datetime: "2008-08-04"
          },
          {
            count: 0,
            datetime: "2008-08-11"
          },
          {
            count: 0,
            datetime: "2008-08-18"
          },
          {
            count: 0,
            datetime: "2008-08-25"
          },
          {
            count: 0,
            datetime: "2008-09-01"
          },
          {
            count: 0,
            datetime: "2008-09-08"
          },
          {
            count: 0,
            datetime: "2008-09-15"
          },
          {
            count: 0,
            datetime: "2008-09-22"
          },
          {
            count: 0,
            datetime: "2008-09-29"
          },
          {
            count: 0,
            datetime: "2008-10-06"
          },
          {
            count: 0,
            datetime: "2008-10-13"
          },
          {
            count: 0,
            datetime: "2008-10-20"
          },
          {
            count: 0,
            datetime: "2008-10-27"
          },
          {
            count: 0,
            datetime: "2008-11-03"
          },
          {
            count: 0,
            datetime: "2008-11-10"
          },
          {
            count: 0,
            datetime: "2008-11-17"
          },
          {
            count: 1,
            datetime: "2008-11-24"
          },
          {
            count: 0,
            datetime: "2008-12-01"
          },
          {
            count: 0,
            datetime: "2008-12-08"
          },
          {
            count: 0,
            datetime: "2008-12-15"
          },
          {
            count: 0,
            datetime: "2008-12-22"
          },
          {
            count: 0,
            datetime: "2008-12-29"
          },
          {
            count: 0,
            datetime: "2009-01-05"
          },
          {
            count: 0,
            datetime: "2009-01-12"
          },
          {
            count: 0,
            datetime: "2009-01-19"
          },
          {
            count: 0,
            datetime: "2009-01-26"
          },
          {
            count: 0,
            datetime: "2009-02-02"
          },
          {
            count: 0,
            datetime: "2009-02-09"
          },
          {
            count: 0,
            datetime: "2009-02-16"
          },
          {
            count: 0,
            datetime: "2009-02-23"
          },
          {
            count: 0,
            datetime: "2009-03-02"
          },
          {
            count: 0,
            datetime: "2009-03-09"
          },
          {
            count: 0,
            datetime: "2009-03-16"
          },
          {
            count: 0,
            datetime: "2009-03-23"
          },
          {
            count: 0,
            datetime: "2009-03-30"
          },
          {
            count: 0,
            datetime: "2009-04-06"
          },
          {
            count: 0,
            datetime: "2009-04-13"
          },
          {
            count: 0,
            datetime: "2009-04-20"
          },
          {
            count: 0,
            datetime: "2009-04-27"
          },
          {
            count: 0,
            datetime: "2009-05-04"
          },
          {
            count: 0,
            datetime: "2009-05-11"
          },
          {
            count: 0,
            datetime: "2009-05-18"
          },
          {
            count: 0,
            datetime: "2009-05-25"
          },
          {
            count: 0,
            datetime: "2009-06-01"
          },
          {
            count: 0,
            datetime: "2009-06-08"
          },
          {
            count: 0,
            datetime: "2009-06-15"
          },
          {
            count: 0,
            datetime: "2009-06-22"
          },
          {
            count: 0,
            datetime: "2009-06-29"
          },
          {
            count: 0,
            datetime: "2009-07-06"
          },
          {
            count: 0,
            datetime: "2009-07-13"
          },
          {
            count: 0,
            datetime: "2009-07-20"
          },
          {
            count: 0,
            datetime: "2009-07-27"
          },
          {
            count: 0,
            datetime: "2009-08-03"
          },
          {
            count: 0,
            datetime: "2009-08-10"
          },
          {
            count: 0,
            datetime: "2009-08-17"
          },
          {
            count: 0,
            datetime: "2009-08-24"
          },
          {
            count: 0,
            datetime: "2009-08-31"
          },
          {
            count: 0,
            datetime: "2009-09-07"
          },
          {
            count: 0,
            datetime: "2009-09-14"
          },
          {
            count: 0,
            datetime: "2009-09-21"
          },
          {
            count: 0,
            datetime: "2009-09-28"
          },
          {
            count: 0,
            datetime: "2009-10-05"
          },
          {
            count: 0,
            datetime: "2009-10-12"
          },
          {
            count: 0,
            datetime: "2009-10-19"
          },
          {
            count: 0,
            datetime: "2009-10-26"
          },
          {
            count: 0,
            datetime: "2009-11-02"
          },
          {
            count: 0,
            datetime: "2009-11-09"
          },
          {
            count: 0,
            datetime: "2009-11-16"
          },
          {
            count: 0,
            datetime: "2009-11-23"
          },
          {
            count: 0,
            datetime: "2009-11-30"
          },
          {
            count: 0,
            datetime: "2009-12-07"
          },
          {
            count: 0,
            datetime: "2009-12-14"
          },
          {
            count: 0,
            datetime: "2009-12-21"
          },
          {
            count: 2,
            datetime: "2009-12-28"
          },
          {
            count: 0,
            datetime: "2010-01-04"
          },
          {
            count: 0,
            datetime: "2010-01-11"
          },
          {
            count: 0,
            datetime: "2010-01-18"
          },
          {
            count: 0,
            datetime: "2010-01-25"
          },
          {
            count: 0,
            datetime: "2010-02-01"
          },
          {
            count: 0,
            datetime: "2010-02-08"
          },
          {
            count: 0,
            datetime: "2010-02-15"
          },
          {
            count: 0,
            datetime: "2010-02-22"
          },
          {
            count: 0,
            datetime: "2010-03-01"
          },
          {
            count: 0,
            datetime: "2010-03-08"
          },
          {
            count: 0,
            datetime: "2010-03-15"
          },
          {
            count: 0,
            datetime: "2010-03-22"
          },
          {
            count: 0,
            datetime: "2010-03-29"
          },
          {
            count: 0,
            datetime: "2010-04-05"
          },
          {
            count: 0,
            datetime: "2010-04-12"
          },
          {
            count: 0,
            datetime: "2010-04-19"
          },
          {
            count: 0,
            datetime: "2010-04-26"
          },
          {
            count: 0,
            datetime: "2010-05-03"
          },
          {
            count: 0,
            datetime: "2010-05-10"
          },
          {
            count: 0,
            datetime: "2010-05-17"
          },
          {
            count: 0,
            datetime: "2010-05-24"
          },
          {
            count: 0,
            datetime: "2010-05-31"
          },
          {
            count: 0,
            datetime: "2010-06-07"
          },
          {
            count: 0,
            datetime: "2010-06-14"
          },
          {
            count: 0,
            datetime: "2010-06-21"
          },
          {
            count: 0,
            datetime: "2010-06-28"
          },
          {
            count: 0,
            datetime: "2010-07-05"
          },
          {
            count: 0,
            datetime: "2010-07-12"
          },
          {
            count: 0,
            datetime: "2010-07-19"
          },
          {
            count: 0,
            datetime: "2010-07-26"
          },
          {
            count: 0,
            datetime: "2010-08-02"
          },
          {
            count: 0,
            datetime: "2010-08-09"
          },
          {
            count: 0,
            datetime: "2010-08-16"
          },
          {
            count: 0,
            datetime: "2010-08-23"
          },
          {
            count: 0,
            datetime: "2010-08-30"
          },
          {
            count: 0,
            datetime: "2010-09-06"
          },
          {
            count: 0,
            datetime: "2010-09-13"
          },
          {
            count: 0,
            datetime: "2010-09-20"
          },
          {
            count: 0,
            datetime: "2010-09-27"
          },
          {
            count: 0,
            datetime: "2010-10-04"
          },
          {
            count: 0,
            datetime: "2010-10-11"
          },
          {
            count: 1,
            datetime: "2010-10-18"
          },
          {
            count: 1,
            datetime: "2010-10-25"
          },
          {
            count: 0,
            datetime: "2010-11-01"
          },
          {
            count: 0,
            datetime: "2010-11-08"
          },
          {
            count: 0,
            datetime: "2010-11-15"
          },
          {
            count: 0,
            datetime: "2010-11-22"
          },
          {
            count: 0,
            datetime: "2010-11-29"
          },
          {
            count: 0,
            datetime: "2010-12-06"
          },
          {
            count: 0,
            datetime: "2010-12-13"
          },
          {
            count: 0,
            datetime: "2010-12-20"
          },
          {
            count: 0,
            datetime: "2010-12-27"
          },
          {
            count: 0,
            datetime: "2011-01-03"
          },
          {
            count: 0,
            datetime: "2011-01-10"
          },
          {
            count: 0,
            datetime: "2011-01-17"
          },
          {
            count: 0,
            datetime: "2011-01-24"
          },
          {
            count: 0,
            datetime: "2011-01-31"
          },
          {
            count: 0,
            datetime: "2011-02-07"
          },
          {
            count: 0,
            datetime: "2011-02-14"
          },
          {
            count: 0,
            datetime: "2011-02-21"
          },
          {
            count: 0,
            datetime: "2011-02-28"
          },
          {
            count: 0,
            datetime: "2011-03-07"
          },
          {
            count: 0,
            datetime: "2011-03-14"
          },
          {
            count: 0,
            datetime: "2011-03-21"
          },
          {
            count: 0,
            datetime: "2011-03-28"
          },
          {
            count: 0,
            datetime: "2011-04-04"
          },
          {
            count: 0,
            datetime: "2011-04-11"
          },
          {
            count: 0,
            datetime: "2011-04-18"
          },
          {
            count: 0,
            datetime: "2011-04-25"
          },
          {
            count: 0,
            datetime: "2011-05-02"
          },
          {
            count: 0,
            datetime: "2011-05-09"
          },
          {
            count: 0,
            datetime: "2011-05-16"
          },
          {
            count: 0,
            datetime: "2011-05-23"
          },
          {
            count: 0,
            datetime: "2011-05-30"
          },
          {
            count: 0,
            datetime: "2011-06-06"
          },
          {
            count: 0,
            datetime: "2011-06-13"
          },
          {
            count: 0,
            datetime: "2011-06-20"
          },
          {
            count: 0,
            datetime: "2011-06-27"
          },
          {
            count: 0,
            datetime: "2011-07-04"
          },
          {
            count: 0,
            datetime: "2011-07-11"
          },
          {
            count: 0,
            datetime: "2011-07-18"
          },
          {
            count: 0,
            datetime: "2011-07-25"
          },
          {
            count: 0,
            datetime: "2011-08-01"
          },
          {
            count: 0,
            datetime: "2011-08-08"
          },
          {
            count: 0,
            datetime: "2011-08-15"
          },
          {
            count: 0,
            datetime: "2011-08-22"
          },
          {
            count: 0,
            datetime: "2011-08-29"
          },
          {
            count: 0,
            datetime: "2011-09-05"
          },
          {
            count: 0,
            datetime: "2011-09-12"
          },
          {
            count: 0,
            datetime: "2011-09-19"
          },
          {
            count: 0,
            datetime: "2011-09-26"
          },
          {
            count: 0,
            datetime: "2011-10-03"
          },
          {
            count: 0,
            datetime: "2011-10-10"
          },
          {
            count: 0,
            datetime: "2011-10-17"
          },
          {
            count: 0,
            datetime: "2011-10-24"
          },
          {
            count: 0,
            datetime: "2011-10-31"
          },
          {
            count: 0,
            datetime: "2011-11-07"
          },
          {
            count: 0,
            datetime: "2011-11-14"
          },
          {
            count: 0,
            datetime: "2011-11-21"
          },
          {
            count: 0,
            datetime: "2011-11-28"
          },
          {
            count: 0,
            datetime: "2011-12-05"
          },
          {
            count: 0,
            datetime: "2011-12-12"
          },
          {
            count: 0,
            datetime: "2011-12-19"
          },
          {
            count: 0,
            datetime: "2011-12-26"
          },
          {
            count: 0,
            datetime: "2012-01-02"
          },
          {
            count: 0,
            datetime: "2012-01-09"
          },
          {
            count: 0,
            datetime: "2012-01-16"
          },
          {
            count: 0,
            datetime: "2012-01-23"
          },
          {
            count: 0,
            datetime: "2012-01-30"
          },
          {
            count: 0,
            datetime: "2012-02-06"
          },
          {
            count: 0,
            datetime: "2012-02-13"
          },
          {
            count: 0,
            datetime: "2012-02-20"
          },
          {
            count: 0,
            datetime: "2012-02-27"
          },
          {
            count: 0,
            datetime: "2012-03-05"
          },
          {
            count: 0,
            datetime: "2012-03-12"
          },
          {
            count: 0,
            datetime: "2012-03-19"
          },
          {
            count: 0,
            datetime: "2012-03-26"
          },
          {
            count: 0,
            datetime: "2012-04-02"
          },
          {
            count: 0,
            datetime: "2012-04-09"
          },
          {
            count: 0,
            datetime: "2012-04-16"
          },
          {
            count: 0,
            datetime: "2012-04-23"
          },
          {
            count: 0,
            datetime: "2012-04-30"
          },
          {
            count: 0,
            datetime: "2012-05-07"
          },
          {
            count: 0,
            datetime: "2012-05-14"
          },
          {
            count: 0,
            datetime: "2012-05-21"
          },
          {
            count: 0,
            datetime: "2012-05-28"
          },
          {
            count: 0,
            datetime: "2012-06-04"
          },
          {
            count: 0,
            datetime: "2012-06-11"
          },
          {
            count: 0,
            datetime: "2012-06-18"
          },
          {
            count: 0,
            datetime: "2012-06-25"
          },
          {
            count: 0,
            datetime: "2012-07-02"
          },
          {
            count: 0,
            datetime: "2012-07-09"
          },
          {
            count: 0,
            datetime: "2012-07-16"
          },
          {
            count: 0,
            datetime: "2012-07-23"
          },
          {
            count: 0,
            datetime: "2012-07-30"
          },
          {
            count: 0,
            datetime: "2012-08-06"
          },
          {
            count: 0,
            datetime: "2012-08-13"
          },
          {
            count: 0,
            datetime: "2012-08-20"
          },
          {
            count: 0,
            datetime: "2012-08-27"
          },
          {
            count: 0,
            datetime: "2012-09-03"
          },
          {
            count: 0,
            datetime: "2012-09-10"
          },
          {
            count: 0,
            datetime: "2012-09-17"
          },
          {
            count: 0,
            datetime: "2012-09-24"
          },
          {
            count: 0,
            datetime: "2012-10-01"
          },
          {
            count: 0,
            datetime: "2012-10-08"
          },
          {
            count: 0,
            datetime: "2012-10-15"
          },
          {
            count: 0,
            datetime: "2012-10-22"
          },
          {
            count: 0,
            datetime: "2012-10-29"
          },
          {
            count: 0,
            datetime: "2012-11-05"
          },
          {
            count: 0,
            datetime: "2012-11-12"
          },
          {
            count: 0,
            datetime: "2012-11-19"
          },
          {
            count: 0,
            datetime: "2012-11-26"
          },
          {
            count: 0,
            datetime: "2012-12-03"
          },
          {
            count: 0,
            datetime: "2012-12-10"
          },
          {
            count: 0,
            datetime: "2012-12-17"
          },
          {
            count: 0,
            datetime: "2012-12-24"
          },
          {
            count: 0,
            datetime: "2012-12-31"
          },
          {
            count: 0,
            datetime: "2013-01-07"
          },
          {
            count: 0,
            datetime: "2013-01-14"
          },
          {
            count: 0,
            datetime: "2013-01-21"
          },
          {
            count: 0,
            datetime: "2013-01-28"
          },
          {
            count: 0,
            datetime: "2013-02-04"
          },
          {
            count: 0,
            datetime: "2013-02-11"
          },
          {
            count: 0,
            datetime: "2013-02-18"
          },
          {
            count: 0,
            datetime: "2013-02-25"
          },
          {
            count: 0,
            datetime: "2013-03-04"
          },
          {
            count: 0,
            datetime: "2013-03-11"
          },
          {
            count: 0,
            datetime: "2013-03-18"
          },
          {
            count: 0,
            datetime: "2013-03-25"
          },
          {
            count: 0,
            datetime: "2013-04-01"
          },
          {
            count: 0,
            datetime: "2013-04-08"
          },
          {
            count: 0,
            datetime: "2013-04-15"
          },
          {
            count: 0,
            datetime: "2013-04-22"
          },
          {
            count: 0,
            datetime: "2013-04-29"
          },
          {
            count: 0,
            datetime: "2013-05-06"
          },
          {
            count: 0,
            datetime: "2013-05-13"
          },
          {
            count: 0,
            datetime: "2013-05-20"
          },
          {
            count: 0,
            datetime: "2013-05-27"
          },
          {
            count: 0,
            datetime: "2013-06-03"
          },
          {
            count: 0,
            datetime: "2013-06-10"
          },
          {
            count: 0,
            datetime: "2013-06-17"
          },
          {
            count: 0,
            datetime: "2013-06-24"
          },
          {
            count: 0,
            datetime: "2013-07-01"
          },
          {
            count: 0,
            datetime: "2013-07-08"
          },
          {
            count: 0,
            datetime: "2013-07-15"
          },
          {
            count: 0,
            datetime: "2013-07-22"
          },
          {
            count: 0,
            datetime: "2013-07-29"
          },
          {
            count: 0,
            datetime: "2013-08-05"
          },
          {
            count: 0,
            datetime: "2013-08-12"
          },
          {
            count: 0,
            datetime: "2013-08-19"
          },
          {
            count: 0,
            datetime: "2013-08-26"
          },
          {
            count: 0,
            datetime: "2013-09-02"
          },
          {
            count: 0,
            datetime: "2013-09-09"
          },
          {
            count: 0,
            datetime: "2013-09-16"
          },
          {
            count: 0,
            datetime: "2013-09-23"
          },
          {
            count: 0,
            datetime: "2013-09-30"
          },
          {
            count: 0,
            datetime: "2013-10-07"
          },
          {
            count: 0,
            datetime: "2013-10-14"
          },
          {
            count: 0,
            datetime: "2013-10-21"
          },
          {
            count: 0,
            datetime: "2013-10-28"
          },
          {
            count: 0,
            datetime: "2013-11-04"
          },
          {
            count: 0,
            datetime: "2013-11-11"
          },
          {
            count: 0,
            datetime: "2013-11-18"
          },
          {
            count: 0,
            datetime: "2013-11-25"
          },
          {
            count: 0,
            datetime: "2013-12-02"
          },
          {
            count: 0,
            datetime: "2013-12-09"
          },
          {
            count: 0,
            datetime: "2013-12-16"
          },
          {
            count: 0,
            datetime: "2013-12-23"
          },
          {
            count: 0,
            datetime: "2013-12-30"
          },
          {
            count: 0,
            datetime: "2014-01-06"
          },
          {
            count: 0,
            datetime: "2014-01-13"
          },
          {
            count: 0,
            datetime: "2014-01-20"
          },
          {
            count: 0,
            datetime: "2014-01-27"
          },
          {
            count: 0,
            datetime: "2014-02-03"
          },
          {
            count: 0,
            datetime: "2014-02-10"
          },
          {
            count: 0,
            datetime: "2014-02-17"
          },
          {
            count: 0,
            datetime: "2014-02-24"
          },
          {
            count: 0,
            datetime: "2014-03-03"
          },
          {
            count: 0,
            datetime: "2014-03-10"
          },
          {
            count: 0,
            datetime: "2014-03-17"
          },
          {
            count: 0,
            datetime: "2014-03-24"
          },
          {
            count: 0,
            datetime: "2014-03-31"
          },
          {
            count: 0,
            datetime: "2014-04-07"
          },
          {
            count: 0,
            datetime: "2014-04-14"
          },
          {
            count: 0,
            datetime: "2014-04-21"
          },
          {
            count: 0,
            datetime: "2014-04-28"
          },
          {
            count: 0,
            datetime: "2014-05-05"
          },
          {
            count: 0,
            datetime: "2014-05-12"
          },
          {
            count: 0,
            datetime: "2014-05-19"
          },
          {
            count: 0,
            datetime: "2014-05-26"
          },
          {
            count: 0,
            datetime: "2014-06-02"
          },
          {
            count: 0,
            datetime: "2014-06-09"
          },
          {
            count: 0,
            datetime: "2014-06-16"
          },
          {
            count: 0,
            datetime: "2014-06-23"
          },
          {
            count: 0,
            datetime: "2014-06-30"
          },
          {
            count: 0,
            datetime: "2014-07-07"
          },
          {
            count: 0,
            datetime: "2014-07-14"
          },
          {
            count: 0,
            datetime: "2014-07-21"
          },
          {
            count: 0,
            datetime: "2014-07-28"
          },
          {
            count: 0,
            datetime: "2014-08-04"
          },
          {
            count: 0,
            datetime: "2014-08-11"
          },
          {
            count: 0,
            datetime: "2014-08-18"
          },
          {
            count: 0,
            datetime: "2014-08-25"
          },
          {
            count: 0,
            datetime: "2014-09-01"
          },
          {
            count: 0,
            datetime: "2014-09-08"
          },
          {
            count: 0,
            datetime: "2014-09-15"
          },
          {
            count: 0,
            datetime: "2014-09-22"
          },
          {
            count: 0,
            datetime: "2014-09-29"
          },
          {
            count: 0,
            datetime: "2014-10-06"
          },
          {
            count: 0,
            datetime: "2014-10-13"
          },
          {
            count: 0,
            datetime: "2014-10-20"
          },
          {
            count: 0,
            datetime: "2014-10-27"
          },
          {
            count: 0,
            datetime: "2014-11-03"
          },
          {
            count: 0,
            datetime: "2014-11-10"
          },
          {
            count: 0,
            datetime: "2014-11-17"
          },
          {
            count: 0,
            datetime: "2014-11-24"
          },
          {
            count: 0,
            datetime: "2014-12-01"
          },
          {
            count: 0,
            datetime: "2014-12-08"
          },
          {
            count: 0,
            datetime: "2014-12-15"
          },
          {
            count: 0,
            datetime: "2014-12-22"
          },
          {
            count: 0,
            datetime: "2014-12-29"
          },
          {
            count: 0,
            datetime: "2015-01-05"
          },
          {
            count: 0,
            datetime: "2015-01-12"
          },
          {
            count: 0,
            datetime: "2015-01-19"
          },
          {
            count: 0,
            datetime: "2015-01-26"
          },
          {
            count: 0,
            datetime: "2015-02-02"
          },
          {
            count: 0,
            datetime: "2015-02-09"
          },
          {
            count: 0,
            datetime: "2015-02-16"
          },
          {
            count: 0,
            datetime: "2015-02-23"
          },
          {
            count: 0,
            datetime: "2015-03-02"
          },
          {
            count: 0,
            datetime: "2015-03-09"
          },
          {
            count: 0,
            datetime: "2015-03-16"
          },
          {
            count: 0,
            datetime: "2015-03-23"
          },
          {
            count: 0,
            datetime: "2015-03-30"
          },
          {
            count: 0,
            datetime: "2015-04-06"
          },
          {
            count: 0,
            datetime: "2015-04-13"
          },
          {
            count: 0,
            datetime: "2015-04-20"
          },
          {
            count: 0,
            datetime: "2015-04-27"
          },
          {
            count: 0,
            datetime: "2015-05-04"
          },
          {
            count: 0,
            datetime: "2015-05-11"
          },
          {
            count: 0,
            datetime: "2015-05-18"
          },
          {
            count: 0,
            datetime: "2015-05-25"
          },
          {
            count: 0,
            datetime: "2015-06-01"
          },
          {
            count: 0,
            datetime: "2015-06-08"
          },
          {
            count: 0,
            datetime: "2015-06-15"
          },
          {
            count: 0,
            datetime: "2015-06-22"
          },
          {
            count: 0,
            datetime: "2015-06-29"
          },
          {
            count: 0,
            datetime: "2015-07-06"
          },
          {
            count: 0,
            datetime: "2015-07-13"
          },
          {
            count: 0,
            datetime: "2015-07-20"
          },
          {
            count: 0,
            datetime: "2015-07-27"
          },
          {
            count: 0,
            datetime: "2015-08-03"
          },
          {
            count: 0,
            datetime: "2015-08-10"
          },
          {
            count: 0,
            datetime: "2015-08-17"
          },
          {
            count: 0,
            datetime: "2015-08-24"
          },
          {
            count: 0,
            datetime: "2015-08-31"
          },
          {
            count: 0,
            datetime: "2015-09-07"
          },
          {
            count: 0,
            datetime: "2015-09-14"
          },
          {
            count: 0,
            datetime: "2015-09-21"
          },
          {
            count: 0,
            datetime: "2015-09-28"
          },
          {
            count: 0,
            datetime: "2015-10-05"
          },
          {
            count: 0,
            datetime: "2015-10-12"
          },
          {
            count: 0,
            datetime: "2015-10-19"
          },
          {
            count: 0,
            datetime: "2015-10-26"
          },
          {
            count: 0,
            datetime: "2015-11-02"
          },
          {
            count: 0,
            datetime: "2015-11-09"
          },
          {
            count: 0,
            datetime: "2015-11-16"
          },
          {
            count: 0,
            datetime: "2015-11-23"
          },
          {
            count: 0,
            datetime: "2015-11-30"
          },
          {
            count: 0,
            datetime: "2015-12-07"
          },
          {
            count: 0,
            datetime: "2015-12-14"
          },
          {
            count: 0,
            datetime: "2015-12-21"
          },
          {
            count: 0,
            datetime: "2015-12-28"
          },
          {
            count: 0,
            datetime: "2016-01-04"
          },
          {
            count: 0,
            datetime: "2016-01-11"
          },
          {
            count: 0,
            datetime: "2016-01-18"
          },
          {
            count: 0,
            datetime: "2016-01-25"
          },
          {
            count: 0,
            datetime: "2016-02-01"
          },
          {
            count: 0,
            datetime: "2016-02-08"
          },
          {
            count: 0,
            datetime: "2016-02-15"
          },
          {
            count: 0,
            datetime: "2016-02-22"
          },
          {
            count: 0,
            datetime: "2016-02-29"
          },
          {
            count: 0,
            datetime: "2016-03-07"
          },
          {
            count: 0,
            datetime: "2016-03-14"
          },
          {
            count: 0,
            datetime: "2016-03-21"
          },
          {
            count: 0,
            datetime: "2016-03-28"
          },
          {
            count: 0,
            datetime: "2016-04-04"
          },
          {
            count: 0,
            datetime: "2016-04-11"
          },
          {
            count: 0,
            datetime: "2016-04-18"
          },
          {
            count: 0,
            datetime: "2016-04-25"
          },
          {
            count: 0,
            datetime: "2016-05-02"
          },
          {
            count: 0,
            datetime: "2016-05-09"
          },
          {
            count: 0,
            datetime: "2016-05-16"
          },
          {
            count: 0,
            datetime: "2016-05-23"
          },
          {
            count: 0,
            datetime: "2016-05-30"
          },
          {
            count: 0,
            datetime: "2016-06-06"
          },
          {
            count: 0,
            datetime: "2016-06-13"
          },
          {
            count: 0,
            datetime: "2016-06-20"
          },
          {
            count: 0,
            datetime: "2016-06-27"
          },
          {
            count: 0,
            datetime: "2016-07-04"
          },
          {
            count: 0,
            datetime: "2016-07-11"
          },
          {
            count: 0,
            datetime: "2016-07-18"
          },
          {
            count: 0,
            datetime: "2016-07-25"
          },
          {
            count: 0,
            datetime: "2016-08-01"
          },
          {
            count: 0,
            datetime: "2016-08-08"
          },
          {
            count: 0,
            datetime: "2016-08-15"
          },
          {
            count: 0,
            datetime: "2016-08-22"
          },
          {
            count: 0,
            datetime: "2016-08-29"
          },
          {
            count: 0,
            datetime: "2016-09-05"
          },
          {
            count: 0,
            datetime: "2016-09-12"
          },
          {
            count: 0,
            datetime: "2016-09-19"
          },
          {
            count: 0,
            datetime: "2016-09-26"
          },
          {
            count: 0,
            datetime: "2016-10-03"
          },
          {
            count: 0,
            datetime: "2016-10-10"
          },
          {
            count: 0,
            datetime: "2016-10-17"
          },
          {
            count: 0,
            datetime: "2016-10-24"
          },
          {
            count: 0,
            datetime: "2016-10-31"
          },
          {
            count: 0,
            datetime: "2016-11-07"
          },
          {
            count: 0,
            datetime: "2016-11-14"
          },
          {
            count: 0,
            datetime: "2016-11-21"
          },
          {
            count: 0,
            datetime: "2016-11-28"
          },
          {
            count: 0,
            datetime: "2016-12-05"
          },
          {
            count: 0,
            datetime: "2016-12-12"
          },
          {
            count: 0,
            datetime: "2016-12-19"
          },
          {
            count: 0,
            datetime: "2016-12-26"
          },
          {
            count: 0,
            datetime: "2017-01-02"
          },
          {
            count: 0,
            datetime: "2017-01-09"
          },
          {
            count: 0,
            datetime: "2017-01-16"
          },
          {
            count: 0,
            datetime: "2017-01-23"
          },
          {
            count: 0,
            datetime: "2017-01-30"
          },
          {
            count: 0,
            datetime: "2017-02-06"
          },
          {
            count: 0,
            datetime: "2017-02-13"
          },
          {
            count: 0,
            datetime: "2017-02-20"
          },
          {
            count: 0,
            datetime: "2017-02-27"
          },
          {
            count: 0,
            datetime: "2017-03-06"
          },
          {
            count: 0,
            datetime: "2017-03-13"
          },
          {
            count: 0,
            datetime: "2017-03-20"
          },
          {
            count: 0,
            datetime: "2017-03-27"
          },
          {
            count: 0,
            datetime: "2017-04-03"
          },
          {
            count: 0,
            datetime: "2017-04-10"
          },
          {
            count: 0,
            datetime: "2017-04-17"
          },
          {
            count: 0,
            datetime: "2017-04-24"
          },
          {
            count: 0,
            datetime: "2017-05-01"
          },
          {
            count: 0,
            datetime: "2017-05-08"
          },
          {
            count: 0,
            datetime: "2017-05-15"
          },
          {
            count: 0,
            datetime: "2017-05-22"
          },
          {
            count: 0,
            datetime: "2017-05-29"
          },
          {
            count: 0,
            datetime: "2017-06-05"
          },
          {
            count: 0,
            datetime: "2017-06-12"
          },
          {
            count: 0,
            datetime: "2017-06-19"
          },
          {
            count: 0,
            datetime: "2017-06-26"
          }
        ]
      };
    }
  });

  this.get('http://plenar.io/v1/api/grid', function (_, request) {
    if (request.queryParams.dataset_name === "speed_camera_locations") {
      return {
        type: "FeatureCollection",
        features: [
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.68376698983157,
                    41.822881546414926
                  ],
                  [
                    -87.68376698983157,
                    41.827376938637904
                  ],
                  [
                    -87.68980020736278,
                    41.827376938637904
                  ],
                  [
                    -87.68980020736278,
                    41.822881546414926
                  ],
                  [
                    -87.68376698983157,
                    41.822881546414926
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.68376698983157,
                    41.84985389975275
                  ],
                  [
                    -87.68376698983157,
                    41.85434929197573
                  ],
                  [
                    -87.68980020736278,
                    41.85434929197573
                  ],
                  [
                    -87.68980020736278,
                    41.84985389975275
                  ],
                  [
                    -87.68376698983157,
                    41.84985389975275
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 4
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.68376698983157,
                    41.89930321420544
                  ],
                  [
                    -87.68376698983157,
                    41.90379860642842
                  ],
                  [
                    -87.68980020736278,
                    41.90379860642842
                  ],
                  [
                    -87.68980020736278,
                    41.89930321420544
                  ],
                  [
                    -87.68376698983157,
                    41.89930321420544
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.68376698983157,
                    41.90379860642841
                  ],
                  [
                    -87.68376698983157,
                    41.90829399865139
                  ],
                  [
                    -87.68980020736278,
                    41.90829399865139
                  ],
                  [
                    -87.68980020736278,
                    41.90379860642841
                  ],
                  [
                    -87.68376698983157,
                    41.90379860642841
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 2
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.67170055476916,
                    41.822881546414926
                  ],
                  [
                    -87.67170055476916,
                    41.827376938637904
                  ],
                  [
                    -87.67773377230037,
                    41.827376938637904
                  ],
                  [
                    -87.67773377230037,
                    41.822881546414926
                  ],
                  [
                    -87.67170055476916,
                    41.822881546414926
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.66566733723795,
                    41.83187233086087
                  ],
                  [
                    -87.66566733723795,
                    41.836367723083846
                  ],
                  [
                    -87.67170055476916,
                    41.836367723083846
                  ],
                  [
                    -87.67170055476916,
                    41.83187233086087
                  ],
                  [
                    -87.66566733723795,
                    41.83187233086087
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.66566733723795,
                    41.881321645313555
                  ],
                  [
                    -87.66566733723795,
                    41.88581703753653
                  ],
                  [
                    -87.67170055476916,
                    41.88581703753653
                  ],
                  [
                    -87.67170055476916,
                    41.881321645313555
                  ],
                  [
                    -87.66566733723795,
                    41.881321645313555
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 2
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.65963411970674,
                    41.84985389975275
                  ],
                  [
                    -87.65963411970674,
                    41.85434929197573
                  ],
                  [
                    -87.66566733723795,
                    41.85434929197573
                  ],
                  [
                    -87.66566733723795,
                    41.84985389975275
                  ],
                  [
                    -87.65963411970674,
                    41.84985389975275
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.65963411970674,
                    41.881321645313555
                  ],
                  [
                    -87.65963411970674,
                    41.88581703753653
                  ],
                  [
                    -87.66566733723795,
                    41.88581703753653
                  ],
                  [
                    -87.66566733723795,
                    41.881321645313555
                  ],
                  [
                    -87.65963411970674,
                    41.881321645313555
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6415344671131,
                    41.83636772308384
                  ],
                  [
                    -87.6415344671131,
                    41.84086311530682
                  ],
                  [
                    -87.64756768464432,
                    41.84086311530682
                  ],
                  [
                    -87.64756768464432,
                    41.83636772308384
                  ],
                  [
                    -87.6415344671131,
                    41.83636772308384
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.62343481451948,
                    41.87233086086761
                  ],
                  [
                    -87.62343481451948,
                    41.87682625309059
                  ],
                  [
                    -87.6294680320507,
                    41.87682625309059
                  ],
                  [
                    -87.6294680320507,
                    41.87233086086761
                  ],
                  [
                    -87.62343481451948,
                    41.87233086086761
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 2
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.62343481451948,
                    41.89480782198247
                  ],
                  [
                    -87.62343481451948,
                    41.899303214205446
                  ],
                  [
                    -87.6294680320507,
                    41.899303214205446
                  ],
                  [
                    -87.6294680320507,
                    41.89480782198247
                  ],
                  [
                    -87.62343481451948,
                    41.89480782198247
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 3
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.61740159698827,
                    41.885817037536526
                  ],
                  [
                    -87.61740159698827,
                    41.890312429759504
                  ],
                  [
                    -87.62343481451948,
                    41.890312429759504
                  ],
                  [
                    -87.62343481451948,
                    41.885817037536526
                  ],
                  [
                    -87.61740159698827,
                    41.885817037536526
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 2
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.61740159698827,
                    41.8903124297595
                  ],
                  [
                    -87.61740159698827,
                    41.894807821982475
                  ],
                  [
                    -87.62343481451948,
                    41.894807821982475
                  ],
                  [
                    -87.62343481451948,
                    41.8903124297595
                  ],
                  [
                    -87.61740159698827,
                    41.8903124297595
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          }
        ]
      };
    } else if (request.queryParams.dataset_name === "red_light_camera_locations") {
      return {
        type: "FeatureCollection",
        features: [
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.804899977523036
                  ],
                  [
                    -87.6839319058525,
                    41.809395369746014
                  ],
                  [
                    -87.68996638036514,
                    41.809395369746014
                  ],
                  [
                    -87.68996638036514,
                    41.804899977523036
                  ],
                  [
                    -87.6839319058525,
                    41.804899977523036
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.822881546414926
                  ],
                  [
                    -87.6839319058525,
                    41.827376938637904
                  ],
                  [
                    -87.68996638036514,
                    41.827376938637904
                  ],
                  [
                    -87.68996638036514,
                    41.822881546414926
                  ],
                  [
                    -87.6839319058525,
                    41.822881546414926
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.8273769386379
                  ],
                  [
                    -87.6839319058525,
                    41.831872330860875
                  ],
                  [
                    -87.68996638036514,
                    41.831872330860875
                  ],
                  [
                    -87.68996638036514,
                    41.8273769386379
                  ],
                  [
                    -87.6839319058525,
                    41.8273769386379
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.84985389975275
                  ],
                  [
                    -87.6839319058525,
                    41.85434929197573
                  ],
                  [
                    -87.68996638036514,
                    41.85434929197573
                  ],
                  [
                    -87.68996638036514,
                    41.84985389975275
                  ],
                  [
                    -87.6839319058525,
                    41.84985389975275
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.87233086086761
                  ],
                  [
                    -87.6839319058525,
                    41.87682625309059
                  ],
                  [
                    -87.68996638036514,
                    41.87682625309059
                  ],
                  [
                    -87.68996638036514,
                    41.87233086086761
                  ],
                  [
                    -87.6839319058525,
                    41.87233086086761
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.876826253090584
                  ],
                  [
                    -87.6839319058525,
                    41.88132164531356
                  ],
                  [
                    -87.68996638036514,
                    41.88132164531356
                  ],
                  [
                    -87.68996638036514,
                    41.876826253090584
                  ],
                  [
                    -87.6839319058525,
                    41.876826253090584
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6839319058525,
                    41.89480782198247
                  ],
                  [
                    -87.6839319058525,
                    41.899303214205446
                  ],
                  [
                    -87.68996638036514,
                    41.899303214205446
                  ],
                  [
                    -87.68996638036514,
                    41.89480782198247
                  ],
                  [
                    -87.6839319058525,
                    41.89480782198247
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.67186295682723,
                    41.89930321420544
                  ],
                  [
                    -87.67186295682723,
                    41.90379860642842
                  ],
                  [
                    -87.67789743133986,
                    41.90379860642842
                  ],
                  [
                    -87.67789743133986,
                    41.89930321420544
                  ],
                  [
                    -87.67186295682723,
                    41.89930321420544
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6658284823146,
                    41.881321645313555
                  ],
                  [
                    -87.6658284823146,
                    41.88581703753653
                  ],
                  [
                    -87.67186295682723,
                    41.88581703753653
                  ],
                  [
                    -87.67186295682723,
                    41.881321645313555
                  ],
                  [
                    -87.6658284823146,
                    41.881321645313555
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.6658284823146,
                    41.89930321420544
                  ],
                  [
                    -87.6658284823146,
                    41.90379860642842
                  ],
                  [
                    -87.67186295682723,
                    41.90379860642842
                  ],
                  [
                    -87.67186295682723,
                    41.89930321420544
                  ],
                  [
                    -87.6658284823146,
                    41.89930321420544
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.64772505877669,
                    41.89930321420544
                  ],
                  [
                    -87.64772505877669,
                    41.90379860642842
                  ],
                  [
                    -87.65375953328932,
                    41.90379860642842
                  ],
                  [
                    -87.65375953328932,
                    41.89930321420544
                  ],
                  [
                    -87.64772505877669,
                    41.89930321420544
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.64169058426405,
                    41.863340076421665
                  ],
                  [
                    -87.64169058426405,
                    41.86783546864464
                  ],
                  [
                    -87.64772505877669,
                    41.86783546864464
                  ],
                  [
                    -87.64772505877669,
                    41.863340076421665
                  ],
                  [
                    -87.64169058426405,
                    41.863340076421665
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.64169058426405,
                    41.881321645313555
                  ],
                  [
                    -87.64169058426405,
                    41.88581703753653
                  ],
                  [
                    -87.64772505877669,
                    41.88581703753653
                  ],
                  [
                    -87.64772505877669,
                    41.881321645313555
                  ],
                  [
                    -87.64169058426405,
                    41.881321645313555
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.63565610975141,
                    41.863340076421665
                  ],
                  [
                    -87.63565610975141,
                    41.86783546864464
                  ],
                  [
                    -87.64169058426404,
                    41.86783546864464
                  ],
                  [
                    -87.64169058426404,
                    41.863340076421665
                  ],
                  [
                    -87.63565610975141,
                    41.863340076421665
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.62962163523878,
                    41.885817037536526
                  ],
                  [
                    -87.62962163523878,
                    41.890312429759504
                  ],
                  [
                    -87.63565610975141,
                    41.890312429759504
                  ],
                  [
                    -87.63565610975141,
                    41.885817037536526
                  ],
                  [
                    -87.62962163523878,
                    41.885817037536526
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.62962163523878,
                    41.89480782198247
                  ],
                  [
                    -87.62962163523878,
                    41.899303214205446
                  ],
                  [
                    -87.63565610975141,
                    41.899303214205446
                  ],
                  [
                    -87.63565610975141,
                    41.89480782198247
                  ],
                  [
                    -87.62962163523878,
                    41.89480782198247
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.61755268621351,
                    41.8903124297595
                  ],
                  [
                    -87.61755268621351,
                    41.894807821982475
                  ],
                  [
                    -87.62358716072615,
                    41.894807821982475
                  ],
                  [
                    -87.62358716072615,
                    41.8903124297595
                  ],
                  [
                    -87.61755268621351,
                    41.8903124297595
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          },
          {
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [
                    -87.61151821170087,
                    41.83636772308384
                  ],
                  [
                    -87.61151821170087,
                    41.84086311530682
                  ],
                  [
                    -87.6175526862135,
                    41.84086311530682
                  ],
                  [
                    -87.6175526862135,
                    41.83636772308384
                  ],
                  [
                    -87.61151821170087,
                    41.83636772308384
                  ]
                ]
              ]
            },
            type: "Feature",
            properties: {
              count: 1
            }
          }
        ]
      };
    }
  });
}
