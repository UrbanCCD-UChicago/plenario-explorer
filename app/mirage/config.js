export default function() {

  this.get('http://plenar.io/api/v1/datasets?dataset_name=crimes_2001_to_present', function() {
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
    }
  });

  this.get('http://plenar.io/api/v1/datasets?dataset_name=building_permits', function() {
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
    }
  });

  this.get('http://plenar.io/api/v1/datasets', function() {
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

  this.get('/v1/api/detail-aggregate', () => {
    return '{meta:{status:"ok",query:{agg:"week",location_geom__within:{crs:{type:"name",properties:{name:"EPSG:4326"}},type:"Polygon",coordinates:[[[-87.64176964759827,41.850639123649636],[-87.64176964759827,41.881320144894765],[-87.59301781654358,41.881320144894765],[-87.59301781654358,41.850639123649636],[-87.64176964759827,41.850639123649636]]]},obs_date__ge:"2015-11-13T00:00:00",data_type:"json",obs_date__le:"2016-02-11T00:00:00"},message:[]},objects:[{count:44,datetime:"2015-11-09"},{count:104,datetime:"2015-11-16"},{count:104,datetime:"2015-11-23"},{count:117,datetime:"2015-11-30"},{count:112,datetime:"2015-12-07"},{count:120,datetime:"2015-12-14"},{count:115,datetime:"2015-12-21"},{count:123,datetime:"2015-12-28"},{count:115,datetime:"2016-01-04"},{count:132,datetime:"2016-01-11"},{count:111,datetime:"2016-01-18"},{count:97,datetime:"2016-01-25"},{count:47,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}]}';
  });

  this.get('/v1/api/detail-aggregate/slow', () => {
    return '{meta:{status:"ok",query:{agg:"week",location_geom__within:{crs:{type:"name",properties:{name:"EPSG:4326"}},type:"Polygon",coordinates:[[[-87.64176964759827,41.850639123649636],[-87.64176964759827,41.881320144894765],[-87.59301781654358,41.881320144894765],[-87.59301781654358,41.850639123649636],[-87.64176964759827,41.850639123649636]]]},obs_date__ge:"2015-11-13T00:00:00",data_type:"json",obs_date__le:"2016-02-11T00:00:00"},message:[]},objects:[{count:48,datetime:"2015-11-09"},{count:69,datetime:"2015-11-16"},{count:47,datetime:"2015-11-23"},{count:98,datetime:"2015-11-30"},{count:58,datetime:"2015-12-07"},{count:70,datetime:"2015-12-14"},{count:33,datetime:"2015-12-21"},{count:32,datetime:"2015-12-28"},{count:60,datetime:"2016-01-04"},{count:95,datetime:"2016-01-11"},{count:90,datetime:"2016-01-18"},{count:78,datetime:"2016-01-25"},{count:89,datetime:"2016-02-01"},{count:54,datetime:"2016-02-08"}]}';
  }, { timing: 3000 });

  this.get('v1/api/timeseries', () => {
    return '{meta:{status:"ok",query:{location_geom__within:{crs:{type:"name",properties:{name:"EPSG:4326"}},type:"Polygon",coordinates:[[[-87.66236901283264,41.83682786072714],[-87.66236901283264,41.887965758804484],[-87.58203148841858,41.887965758804484],[-87.58203148841858,41.83682786072714],[-87.66236901283264,41.83682786072714]]]},obs_date__ge:"2015-11-13T00:00:00",data_type:"json",obs_date__le:"2016-02-11T00:00:00",agg:"week",dataset_name__in:["electrical_permits_current","sfpd_incidents_from_1_january_2003","new_hampshire_final_csv","2003_campaign_expenditures","economic_development_compliance_chapter_380_agreem","speed_camera_locations","building_permits_current","city_of_champaign_historic_landmarks","sfpd_incidents_previous_three_months","building_violations","cta_ridership_for_average_weekday_in_october_2012","nypd_motor_vehicle_collisions","child_care_regulated_programs","311_service_requests_street_lights_all_out","311_service_requests_vacant_and_abandoned_building","average_daily_traffic_counts","micro_market_recovery_program_cases","credit_access_businesses","311_service_requests_graffiti_removal","food_inspections","311_service_requests_rodent_baiting","311_service_requests_tree_debris","disabled_parking","2013_campaign_expenditures","crime_csv","311_service_requests_street_lights_one_out","2001_campaign_expenditures","311_service_requests_pot_holes_reported","apd_incident_extract_2010","food_service_establishment_last_inspection","building_permits","curb_ramps","business_licenses","cdph_environmental_complaints","iema_non_dental_facilities_in_illinois_with_radiat","311_service_requests_for_2007","311_service_requests_sanitation_code_complaints","311_service_requests_alley_lights_out","trade_permits_current","micro_market_recovery_program_permits","2013_campaign_contributions","ppd_crime_incidents_2012_2014","2013_ecad_multi_family_energy_audit_and_eui_data","red_light_camera_locations","311_service_requests_abandoned_vehicles","nyc_service_volunteer_opportunities","liquor_authority_quarterly_list_of_active_licenses","lapd_crime_and_collision_raw_data_2014","mayors_24_hour_hotline_nemo_snow_related_calls","building_permits_since_2009","capital_improvement_passthrough_petitions","austin_animal_center_stray_map","cdph_environmental_permits","cdph_environmental_inspections","july_is_love_my_parks_month","seattle_police_department_911_incident_response","311_service_requests_2009","311_service_requests_for_2008","flu_shot_clinic_locations_2013_standard_format","2005_campaign_expenditures","universal_pre_k_upk_school_locations","iema_dental_facilities_in_illinois","2001_campaign_contributions","apd_incident_extract_2011","landlord_utility_passthroughs","new_york_s_great_appliance_swap_out","2009_campaign_expenditures","capital_projects_nys_thruway_authority_capital_pro","311_service_requests_for_2006","operating_and_maintenance_petitions","lapd_crime_and_collision_raw_data_for_2013","apd_incident_extract_2008","2005_campaign_contributions","apd_incident_extract_2009","state_university_construction_fund_sucf_contracts_","solar_photovoltaic_pv_incentive_program_beginning_","code_violation_cases","2003_campaign_contributions","bird_conservation_areas","2009_campaign_contributions","ecad_commercial_portfolio_manager_reported_data_20","idol_public_works_prohibited_contractors","market_street_hub","open_business_locations_san_francisco","chicago_redlight_tickets_csv","water_quality_sampling_data","311_unified_data","advantage_after_school_program","austin_crime_map","individual_landmarks","real_estate_tax_balances","graffiti_30_days","cdph_environmental_hold_on_city_issued_permits_and","mobile_food_schedule","311_service_requests_garbage_carts","crime_incident_reports","mayor_s_24_hour_hotline_service_requests","mobile_food_facility_permit","cta_ridership_avg_weekday_bus_stop_boardings_in_oc","sfpd_incident_all_datetime_csv","sfpd_incidents_current_year_2014","environmental_control_asbestos_abatement_permits_2","cook_county_recorder_of_deeds_foreclosures_2012_ja","graffiti","environmental_control_asbestos_demolition_permits_","street_tree_list","transportation_department_permits","cook_county_recorder_of_deeds_mortgages_2012_janua","dallas_police_public_data_rms_incidents_with_geolo","micro_market_recovery_program_violations_and_inspe","311_service_requests_tree_trims","crimes_2001_to_present","cook_county_recorder_of_deeds_foreclosures_2011_co","alternative_fuel_locations","cook_county_recorder_of_deeds_mortgages_2011_compl","apd_incident_extract_ytd","case_data_from_san_francisco_311_sf311","mayors_24_hour_hotline_cases_created_last_90_days"],buffer:100},message:[]},objects:[{items:[{count:3,datetime:"2015-11-09"},{count:17,datetime:"2015-11-16"},{count:18,datetime:"2015-11-23"},{count:15,datetime:"2015-11-30"},{count:10,datetime:"2015-12-07"},{count:12,datetime:"2015-12-14"},{count:15,datetime:"2015-12-21"},{count:19,datetime:"2015-12-28"},{count:29,datetime:"2016-01-04"},{count:28,datetime:"2016-01-11"},{count:15,datetime:"2016-01-18"},{count:30,datetime:"2016-01-25"},{count:21,datetime:"2016-02-01"},{count:10,datetime:"2016-02-08"}],dataset_name:"311_service_requests_abandoned_vehicles"},{items:[{count:5,datetime:"2015-11-09"},{count:26,datetime:"2015-11-16"},{count:11,datetime:"2015-11-23"},{count:9,datetime:"2015-11-30"},{count:10,datetime:"2015-12-07"},{count:20,datetime:"2015-12-14"},{count:20,datetime:"2015-12-21"},{count:3,datetime:"2015-12-28"},{count:12,datetime:"2016-01-04"},{count:28,datetime:"2016-01-11"},{count:6,datetime:"2016-01-18"},{count:17,datetime:"2016-01-25"},{count:14,datetime:"2016-02-01"},{count:4,datetime:"2016-02-08"}],dataset_name:"311_service_requests_alley_lights_out"},{items:[{count:11,datetime:"2015-11-09"},{count:129,datetime:"2015-11-16"},{count:115,datetime:"2015-11-23"},{count:142,datetime:"2015-11-30"},{count:94,datetime:"2015-12-07"},{count:57,datetime:"2015-12-14"},{count:124,datetime:"2015-12-21"},{count:41,datetime:"2015-12-28"},{count:74,datetime:"2016-01-04"},{count:128,datetime:"2016-01-11"},{count:97,datetime:"2016-01-18"},{count:171,datetime:"2016-01-25"},{count:98,datetime:"2016-02-01"},{count:33,datetime:"2016-02-08"}],dataset_name:"311_service_requests_graffiti_removal"},{items:[{count:5,datetime:"2015-11-09"},{count:19,datetime:"2015-11-16"},{count:11,datetime:"2015-11-23"},{count:25,datetime:"2015-11-30"},{count:22,datetime:"2015-12-07"},{count:30,datetime:"2015-12-14"},{count:21,datetime:"2015-12-21"},{count:13,datetime:"2015-12-28"},{count:27,datetime:"2016-01-04"},{count:48,datetime:"2016-01-11"},{count:25,datetime:"2016-01-18"},{count:31,datetime:"2016-01-25"},{count:59,datetime:"2016-02-01"},{count:87,datetime:"2016-02-08"}],dataset_name:"311_service_requests_pot_holes_reported"},{items:[{count:0,datetime:"2015-11-09"},{count:29,datetime:"2015-11-16"},{count:13,datetime:"2015-11-23"},{count:8,datetime:"2015-11-30"},{count:21,datetime:"2015-12-07"},{count:18,datetime:"2015-12-14"},{count:14,datetime:"2015-12-21"},{count:7,datetime:"2015-12-28"},{count:15,datetime:"2016-01-04"},{count:14,datetime:"2016-01-11"},{count:7,datetime:"2016-01-18"},{count:26,datetime:"2016-01-25"},{count:9,datetime:"2016-02-01"},{count:14,datetime:"2016-02-08"}],dataset_name:"311_service_requests_rodent_baiting"},{items:[{count:2,datetime:"2015-11-09"},{count:5,datetime:"2015-11-16"},{count:5,datetime:"2015-11-23"},{count:11,datetime:"2015-11-30"},{count:2,datetime:"2015-12-07"},{count:5,datetime:"2015-12-14"},{count:7,datetime:"2015-12-21"},{count:4,datetime:"2015-12-28"},{count:2,datetime:"2016-01-04"},{count:8,datetime:"2016-01-11"},{count:5,datetime:"2016-01-18"},{count:11,datetime:"2016-01-25"},{count:9,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"311_service_requests_sanitation_code_complaints"},{items:[{count:9,datetime:"2015-11-09"},{count:28,datetime:"2015-11-16"},{count:15,datetime:"2015-11-23"},{count:22,datetime:"2015-11-30"},{count:15,datetime:"2015-12-07"},{count:8,datetime:"2015-12-14"},{count:8,datetime:"2015-12-21"},{count:18,datetime:"2015-12-28"},{count:18,datetime:"2016-01-04"},{count:7,datetime:"2016-01-11"},{count:14,datetime:"2016-01-18"},{count:11,datetime:"2016-01-25"},{count:12,datetime:"2016-02-01"},{count:5,datetime:"2016-02-08"}],dataset_name:"311_service_requests_street_lights_all_out"},{items:[{count:68,datetime:"2015-11-09"},{count:95,datetime:"2015-11-16"},{count:71,datetime:"2015-11-23"},{count:78,datetime:"2015-11-30"},{count:49,datetime:"2015-12-07"},{count:52,datetime:"2015-12-14"},{count:53,datetime:"2015-12-21"},{count:44,datetime:"2015-12-28"},{count:83,datetime:"2016-01-04"},{count:43,datetime:"2016-01-11"},{count:34,datetime:"2016-01-18"},{count:49,datetime:"2016-01-25"},{count:52,datetime:"2016-02-01"},{count:19,datetime:"2016-02-08"}],dataset_name:"311_service_requests_street_lights_one_out"},{items:[{count:0,datetime:"2015-11-09"},{count:0,datetime:"2015-11-16"},{count:0,datetime:"2015-11-23"},{count:0,datetime:"2015-11-30"},{count:0,datetime:"2015-12-07"},{count:0,datetime:"2015-12-14"},{count:0,datetime:"2015-12-21"},{count:0,datetime:"2015-12-28"},{count:0,datetime:"2016-01-04"},{count:1,datetime:"2016-01-11"},{count:0,datetime:"2016-01-18"},{count:0,datetime:"2016-01-25"},{count:0,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"311_service_requests_tree_debris"},{items:[{count:0,datetime:"2015-11-09"},{count:26,datetime:"2015-11-16"},{count:6,datetime:"2015-11-23"},{count:4,datetime:"2015-11-30"},{count:2,datetime:"2015-12-07"},{count:9,datetime:"2015-12-14"},{count:22,datetime:"2015-12-21"},{count:2,datetime:"2015-12-28"},{count:5,datetime:"2016-01-04"},{count:0,datetime:"2016-01-11"},{count:11,datetime:"2016-01-18"},{count:2,datetime:"2016-01-25"},{count:3,datetime:"2016-02-01"},{count:2,datetime:"2016-02-08"}],dataset_name:"311_service_requests_tree_trims"},{items:[{count:0,datetime:"2015-11-09"},{count:0,datetime:"2015-11-16"},{count:0,datetime:"2015-11-23"},{count:0,datetime:"2015-11-30"},{count:1,datetime:"2015-12-07"},{count:0,datetime:"2015-12-14"},{count:2,datetime:"2015-12-21"},{count:0,datetime:"2015-12-28"},{count:0,datetime:"2016-01-04"},{count:3,datetime:"2016-01-11"},{count:0,datetime:"2016-01-18"},{count:2,datetime:"2016-01-25"},{count:0,datetime:"2016-02-01"},{count:2,datetime:"2016-02-08"}],dataset_name:"311_service_requests_vacant_and_abandoned_building"},{items:[{count:20,datetime:"2015-11-09"},{count:139,datetime:"2015-11-16"},{count:66,datetime:"2015-11-23"},{count:154,datetime:"2015-11-30"},{count:161,datetime:"2015-12-07"},{count:107,datetime:"2015-12-14"},{count:72,datetime:"2015-12-21"},{count:106,datetime:"2015-12-28"},{count:124,datetime:"2016-01-04"},{count:130,datetime:"2016-01-11"},{count:88,datetime:"2016-01-18"},{count:149,datetime:"2016-01-25"},{count:118,datetime:"2016-02-01"},{count:70,datetime:"2016-02-08"}],dataset_name:"building_permits"},{items:[{count:0,datetime:"2015-11-09"},{count:0,datetime:"2015-11-16"},{count:0,datetime:"2015-11-23"},{count:0,datetime:"2015-11-30"},{count:0,datetime:"2015-12-07"},{count:0,datetime:"2015-12-14"},{count:0,datetime:"2015-12-21"},{count:0,datetime:"2015-12-28"},{count:0,datetime:"2016-01-04"},{count:0,datetime:"2016-01-11"},{count:3,datetime:"2016-01-18"},{count:7,datetime:"2016-01-25"},{count:5,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"building_violations"},{items:[{count:11,datetime:"2015-11-09"},{count:50,datetime:"2015-11-16"},{count:32,datetime:"2015-11-23"},{count:58,datetime:"2015-11-30"},{count:93,datetime:"2015-12-07"},{count:58,datetime:"2015-12-14"},{count:22,datetime:"2015-12-21"},{count:27,datetime:"2015-12-28"},{count:87,datetime:"2016-01-04"},{count:46,datetime:"2016-01-11"},{count:50,datetime:"2016-01-18"},{count:72,datetime:"2016-01-25"},{count:104,datetime:"2016-02-01"},{count:33,datetime:"2016-02-08"}],dataset_name:"business_licenses"},{items:[{count:0,datetime:"2015-11-09"},{count:0,datetime:"2015-11-16"},{count:0,datetime:"2015-11-23"},{count:3,datetime:"2015-11-30"},{count:3,datetime:"2015-12-07"},{count:1,datetime:"2015-12-14"},{count:1,datetime:"2015-12-21"},{count:0,datetime:"2015-12-28"},{count:3,datetime:"2016-01-04"},{count:7,datetime:"2016-01-11"},{count:0,datetime:"2016-01-18"},{count:0,datetime:"2016-01-25"},{count:0,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"cdph_environmental_complaints"},{items:[{count:4,datetime:"2015-11-09"},{count:6,datetime:"2015-11-16"},{count:3,datetime:"2015-11-23"},{count:4,datetime:"2015-11-30"},{count:1,datetime:"2015-12-07"},{count:6,datetime:"2015-12-14"},{count:7,datetime:"2015-12-21"},{count:1,datetime:"2015-12-28"},{count:5,datetime:"2016-01-04"},{count:14,datetime:"2016-01-11"},{count:2,datetime:"2016-01-18"},{count:0,datetime:"2016-01-25"},{count:0,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"cdph_environmental_inspections"},{items:[{count:0,datetime:"2015-11-09"},{count:2,datetime:"2015-11-16"},{count:4,datetime:"2015-11-23"},{count:5,datetime:"2015-11-30"},{count:5,datetime:"2015-12-07"},{count:2,datetime:"2015-12-14"},{count:1,datetime:"2015-12-21"},{count:0,datetime:"2015-12-28"},{count:26,datetime:"2016-01-04"},{count:7,datetime:"2016-01-11"},{count:4,datetime:"2016-01-18"},{count:0,datetime:"2016-01-25"},{count:0,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"cdph_environmental_permits"},{items:[{count:116,datetime:"2015-11-09"},{count:292,datetime:"2015-11-16"},{count:277,datetime:"2015-11-23"},{count:303,datetime:"2015-11-30"},{count:307,datetime:"2015-12-07"},{count:375,datetime:"2015-12-14"},{count:301,datetime:"2015-12-21"},{count:321,datetime:"2015-12-28"},{count:308,datetime:"2016-01-04"},{count:322,datetime:"2016-01-11"},{count:316,datetime:"2016-01-18"},{count:309,datetime:"2016-01-25"},{count:119,datetime:"2016-02-01"},{count:0,datetime:"2016-02-08"}],dataset_name:"crimes_2001_to_present"},{items:[{count:17,datetime:"2015-11-09"},{count:68,datetime:"2015-11-16"},{count:37,datetime:"2015-11-23"},{count:73,datetime:"2015-11-30"},{count:89,datetime:"2015-12-07"},{count:84,datetime:"2015-12-14"},{count:36,datetime:"2015-12-21"},{count:16,datetime:"2015-12-28"},{count:38,datetime:"2016-01-04"},{count:25,datetime:"2016-01-11"},{count:17,datetime:"2016-01-18"},{count:31,datetime:"2016-01-25"},{count:11,datetime:"2016-02-01"},{count:3,datetime:"2016-02-08"}],dataset_name:"food_inspections"},{items:[{count:117,datetime:"2015-11-09"},{count:248,datetime:"2015-11-16"},{count:135,datetime:"2015-11-23"},{count:287,datetime:"2015-11-30"},{count:176,datetime:"2015-12-07"},{count:232,datetime:"2015-12-14"},{count:77,datetime:"2015-12-21"},{count:136,datetime:"2015-12-28"},{count:267,datetime:"2016-01-04"},{count:258,datetime:"2016-01-11"},{count:228,datetime:"2016-01-18"},{count:204,datetime:"2016-01-25"},{count:233,datetime:"2016-02-01"},{count:146,datetime:"2016-02-08"}],dataset_name:"transportation_department_permits"}]}'
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
