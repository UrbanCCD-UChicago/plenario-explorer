/*
Utilities for dealing with map tiles and other information related to the Open Street Map-defined
standards of internet mapping.
 */

/* Borrowed from http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames */
function lng2tile(lonDeg, zoom) {
  const n = 2 ** zoom;
  return Math.floor(n * ((lonDeg + 180) / 360));
}

/* Borrowed from http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames */
function lat2tile(latDeg, zoom) {
  const π = Math.PI;
  const latRad = latDeg * (π / 180);
  const n = 2 ** zoom;
  return Math.floor(n * ((1 - (Math.log(Math.tan(latRad) + (1 / Math.cos(latRad))) / π)) / 2));
}

function getCenterTileURLFragment(bounds, zoom) {
  const { lat, lng } = L.latLngBounds(bounds).getCenter();
  return `${zoom}/${lng2tile(lng, zoom)}/${lat2tile(lat, zoom)}`;
}

export { lng2tile, lat2tile, getCenterTileURLFragment };
