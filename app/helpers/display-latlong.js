import Ember from "ember";

export function displayLatlong(params, hash) {
  const coords = params[0];
  let lat_suffix = '';
  let lng_suffix = '';
  if (coords[1] !== 0) {
    lat_suffix = params[1] > 0 ? 'S' : 'N';
  }
  if (coords[0] !== 0) {
    lng_suffix = params[0] > 0 ? 'E' : 'W';
  }

  const lat = Math.abs(coords[1]);
  const lng = Math.abs(coords[0]);

  if (hash.arcunits) {
    const dmslat = _decToDms(lat);
    const dmslng = _decToDms(lng);
    return `${dmslat} ${lat_suffix}, ${dmslng} ${lng_suffix}`;
  }

  return `${lat} ${lat_suffix}, ${lng} ${lng_suffix}`;
}

function _decToDms(coord) {
  const d = Math.floor(coord);
  const m = Math.floor((coord - d) * 60);
  const s = Math.round((coord - d - (m / 60)) * 3600 * 100) / 100;
  return `${d}°${m}'${s}"`;
}

export default Ember.Helper.helper(displayLatlong);
