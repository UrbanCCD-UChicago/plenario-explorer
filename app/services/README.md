# Plenar.io API Adapter Service

`plenario-explorer/app/services/plenario-api.js`

The Plenar.io API Adpater service is responsible for translating application-specific requests for data into the appropriate backend calls to the Plenar.io API, and then normalizing the responses for consumption in Ember.

## Query Parameter Mapping

The Plenar.io API Adapter service is responsible for mapping application requests using a standard set of query parameters (in camelCase) to the query parameters needed by various API endpoints. These API parameters can be inconsistent across endpoints, so it is the responsibility of individual endpoint functions to consume these **application query parameters** and emit the correct parameters for the endpoint they interact with.

The **application query parameters** are as follows:

- **`datasetNames`** <small>list</small> a list of strings of dataset names in the API, like "metra\_lines" or "311\_non\_emergency\_requests"
- **`startDate`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date or datetime</small>
- **`endDate`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date or datetime</small>
- **`aggregateBy`** <small>string</small> one of `day`, `week`, `month`, `quarter`, `year`
- **`withinArea`** <small>GeoJSON LineString or Polygon</small> a GeoJSON object representing the geographic bounds of the search area
- **`useSimpleBbox`** <small>Boolean</small> whether to use a faster, but less accurate, algorithm for deteriming whether a dataset falls within the search area
- **`downloadType`** <small>string</small> a valid format identifier string for the requested dataset, as defined in the dataset's `downloadFormats` property, such as `json` or `shapefile`

> As a general rule, to minimize chances of triggering a backend error, **application query parameters** that have a value of `undefined` should be ignored instead of passing a parameter with value `undefined` to the API

## Adapter Interface

### `fetch`

#### `fetch.core`

##### `fetch.core.metadata`

- `fetch.core.metadata.events(datasetNames, startDate, endDate, withinArea, useSimpleBbox)`
- `fetch.core.metadata.shapes(datasetNames, withinArea, useSimpleBbox)`

##### `fetch.core.data`

- `fetch.core.data.timeseries(datasetNames, startDate, endDate, aggregateBy, withinArea)`
- `fetch.core.data.timeseriesFor(eventMetadataObjects, startDate, endDate, aggregateBy, withinArea)`
- `fetch.core.data.grids(datasetNames, startDate, endDate, aggregateBy, withinArea)`
- `fetch.core.data.gridsFor(eventMetadataObjects, startDate, endDate, aggregateBy, withinArea)`
- `fetch.core.data.shapes(datasetNames, withinArea)`
- `fetch.core.data.shapesFor(shapeMetadataObjects, withinArea)`

#### `fetch.networks`

##### `fetch.networks.metadata`

##### `fetch.networks.data`

### `adapter`

- `mapQueryParamNames(appQueryParamsHash)`
- `buildDownloadURL(metadataObject, appQueryParamsHash)`

## Expected Response Format

The Ember application expects to consume API data as a JavaScript object with one of the following structures. It is part of the API Adapter's responsibility to translate the raw API responses into this format, to ensure spearation of concerns between the Ember application code and the API interface code.

### Event & Shape Datasets

Event and shape dataset objects are expected to have the following metadata properties

- **`name`** <small>string</small> the internal name for the dataset in the API, like "metra\_lines" or "311\_non\_emergency_requests"
- **`type`** <small>string</small> either `event` or `shape`
- **`humanName`** <small>string</small> a pretty version of the dataset's name for display to the user; most Plenar.io datasets specify this as a property, but if a dataset does not specify a human name this field should be populated by transforming the `name` field
- **`provider`** <small>string</small> the entity providing the dataset, for example "City of Chicago" or "Pittsburgh Police Department"
- **`description`** <small>string</small> the long-form description of the dataset, if one is provided
- **`dateAdded`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date or datetime</small> the date the dataset was originally submitted to Plenar.io
- **`oldest`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date or datetime</small> the date stamp of the oldest item in the dataset, or `undefined` if this is a shape dataset
- **`newest`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date or datetime</small> the date stamp of the most recent item in the dataset, or `undefined` if this is a shape dataset (note that this may be in the future, e.g. datasets tracking event permits are often dated by the event date, not the permit approval date)
- **`lastUpdate`** <small>[ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) datetime</small> the timestamp of the most recent update to the dataset
- **`updateFreq`** <small>string</small> how often the dataset is updated, if specified in API (e.g. "daily", "annually", etc.)
- **`bbox`** <small>GeoJSON Polygon</small> the rectangular bounding box containing all of the dataset's entries
- **`totalCount`** <small>number</small> number of matching entries in the dataset, relative to the current query
- **`urls`:**
  - **`source`** <small>string</small> the URL of the provider's source data from which the Plenar.io dataset is built
  - **`view`** <small>string (optional)</small> a URL pointing to the provider's web interface for the dataset, if one exists
- **`downloadFormats`** <small>list</small> a list of the bulk download formats available for the dataset, as simple objects in the format `{ name: 'Foo', ext: '.foo', downloadType: 'foo' }`, where `downloadType` is the format identifier in the Plenar.io API

--------------------------------------------------------------------------------

# AJAX Service

`plenario-explorer/app/services/ajax.js`

The AJAX service is a simple stub, extending Ember's built-in AJAX service with the FQDN and base path of the Plenar.io API so they do not need to be specified for every AJAX call. Those settings are drawn from the `plenario-explorer/confing/environment.js` file and should not be modified here.

The relevant keys in `environment.js` are:

- `ENV.ajax.host` (currently `"http://plenar.io"`)
- `ENV.ajax.namespace` (currently `"v1/api"`)
