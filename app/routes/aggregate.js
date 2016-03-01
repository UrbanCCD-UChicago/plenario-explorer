import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({
  mockedTimeseries: [
    {
      attribution: "City of Chicago",
      description: "All open graffiti removal requests made to 311 and all requests completed since January 1, 2011. The Department of Streets & Sanitation's Graffiti Blasters crews offer a vandalism removal service to private property owners. Graffiti Blasters employ blast trucks that use baking soda under high water pressure to erase painted graffiti from brick, stone and other mineral surfaces. They also use paint trucks to cover graffiti on the remaining surfaces. Organizations and residents may report graffiti and request its removal. 311 sometimes receives duplicate requests for graffiti removal. Requests that have been labeled as Duplicates are in the same geographic area and have been entered into 311’s Customer Service Requests (CSR) system at around the same time as a previous request. Duplicate reports/requests are labeled as such in the Status field,",
      view_url: "http://data.cityofchicago.org/api/views/hec5-y4x5/rows",
      source_url: "http://data.cityofchicago.org/api/views/hec5-y4x5/rows.csv?accessType=DOWNLOAD",
      bbox: {
        type: "Polygon",
        coordinates: [
          [
            [
              -87.9201468772724,
              41.6446953564915
            ],
            [
              -87.9201468772724,
              42.0226602680775
            ],
            [
              -87.5243810071102,
              42.0226602680775
            ],
            [
              -87.5243810071102,
              41.6446953564915
            ],
            [
              -87.9201468772724,
              41.6446953564915
            ]
          ]
        ]
      },
      obs_from: "1926-02-05",
      date_added: "2014-09-10 16:50:00.787127",
      contributor_email: null,
      contributor_organization: null,
      contributor_name: null,
      items: [
        {
          count: 0,
          datetime: "2016-02-23"
        },
        {
          count: 0,
          datetime: "2016-02-24"
        },
        {
          count: 0,
          datetime: "2016-02-25"
        },
        {
          count: 0,
          datetime: "2016-02-26"
        },
        {
          count: 0,
          datetime: "2016-02-27"
        },
        {
          count: 0,
          datetime: "2016-02-28"
        },
        {
          count: 1,
          datetime: "2016-02-29"
        },
        {
          count: 0,
          datetime: "2016-03-01"
        }
      ],
      last_update: "2016-03-01T14:06:35.144558",
      obs_to: "2016-02-29",
      human_name: "311 Service Requests - Graffiti Removal",
      dataset_name: "311_service_requests_graffiti_removal",
      update_freq: "daily"
    },
    {
      attribution: "City of Chicago",
      description: "Permits issued by the Department of Buildings in the City of Chicago from 2006 to the present.",
      view_url: "http://data.cityofchicago.org/api/views/ydr8-5enu/rows",
      source_url: "http://data.cityofchicago.org/api/views/ydr8-5enu/rows.csv?accessType=DOWNLOAD",
      bbox: {
        type: "Polygon",
        coordinates: [
          [
            [
              -87.914533827,
              41.644701941
            ],
            [
              -87.914533827,
              42.022645121
            ],
            [
              -87.524677085,
              42.022645121
            ],
            [
              -87.524677085,
              41.644701941
            ],
            [
              -87.914533827,
              41.644701941
            ]
          ]
        ]
      },
      obs_from: "2001-11-19",
      date_added: "2014-09-10 18:07:26.991109",
      contributor_email: null,
      contributor_organization: null,
      contributor_name: null,
      items: [
        {
          count: 0,
          datetime: "2016-02-23"
        },
        {
          count: 1,
          datetime: "2016-02-24"
        },
        {
          count: 0,
          datetime: "2016-02-25"
        },
        {
          count: 0,
          datetime: "2016-02-26"
        },
        {
          count: 0,
          datetime: "2016-02-27"
        },
        {
          count: 0,
          datetime: "2016-02-28"
        },
        {
          count: 0,
          datetime: "2016-02-29"
        },
        {
          count: 0,
          datetime: "2016-03-01"
        }
      ],
      last_update: "2016-03-01T14:27:32.143894",
      obs_to: "2016-03-01",
      human_name: "Building Permits",
      dataset_name: "building_permits",
      update_freq: "daily"
    },
    {
      attribution: "City of Chicago",
      description: "Applications to the Chicago Department of Transportation for permits under its jurisdiction, which typically are permits to block or otherwise affect public streets in some way. Because all permits start as applications, this dataset also serves as a list of permits granted. See more information about CDOT permits at http://www.cityofchicago.org/city/en/depts/cdot/provdrs/construction_information/svcs/online-permit-portal.html.",
      view_url: "https://data.cityofchicago.org/api/views/pubx-yq2d/rows",
      source_url: "https://data.cityofchicago.org/api/views/pubx-yq2d/rows.csv?accessType=DOWNLOAD",
      bbox: {
        type: "Polygon",
        coordinates: [
          [
            [
              -87.939864912,
              41.644693974
            ],
            [
              -87.939864912,
              42.022779861
            ],
            [
              -87.524587387,
              42.022779861
            ],
            [
              -87.524587387,
              41.644693974
            ],
            [
              -87.939864912,
              41.644693974
            ]
          ]
        ]
      },
      obs_from: "1991-01-18",
      date_added: "2015-12-17 23:46:27.169279",
      contributor_email: "willengler@uchicago.edu",
      contributor_organization: "Plenario Admin",
      contributor_name: "willengler",
      items: [
        {
          count: 0,
          datetime: "2016-02-23"
        },
        {
          count: 0,
          datetime: "2016-02-24"
        },
        {
          count: 0,
          datetime: "2016-02-25"
        },
        {
          count: 0,
          datetime: "2016-02-26"
        },
        {
          count: 0,
          datetime: "2016-02-27"
        },
        {
          count: 0,
          datetime: "2016-02-28"
        },
        {
          count: 0,
          datetime: "2016-02-29"
        },
        {
          count: 1,
          datetime: "2016-03-01"
        }
      ],
      last_update: "2016-03-01T14:35:30.784647",
      obs_to: "2112-08-25",
      human_name: "Transportation Department Permits",
      dataset_name: "transportation_department_permits",
      update_freq: "daily"
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
      pointDatasets: this.mockedTimeseries,
      shapeDatasets: this.mockedShapeDatasets,
      timeseries: [{data: [[moment('2010-11-29'), 3], [moment('2010-12-06'), 7]]}]
    };
  }
});
