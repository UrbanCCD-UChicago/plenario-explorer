import Ember from 'ember';

export function displayLatlong(params, hash) {
  const coords = {
    lat: params[0][1],
    lng: params[0][0],
  };

  const result = {
    lat_suffix: 'N/S', // Use the Chicago L style for 0 lat/lng
    lng_suffix: 'E/W',
  };

  if (coords.lat !== 0) {
    result.lat_suffix = coords.lat > 0 ? 'N' : 'S';
  }
  if (coords.lng !== 0) {
    result.lng_suffix = coords.lng > 0 ? 'E' : 'W';
  }

  result.declat = Math.abs(coords.lat);
  result.declng = Math.abs(coords.lng);

  // There is a non-negligible loss in precision when converting to DMS.
  // Only use this for vanity printouts; in general you're better off
  // sticking to decimal degrees
  if (hash && hash.arcUnits) {
    result.dmslat = decToDms(result.declat);
    result.dmslng = decToDms(result.declng);
    const r = result;
    return Ember.String.htmlSafe(`${r.dmslat.d}°${r.dmslat.m}'${r.dmslat.s}" ${result.lat_suffix}, ` +
      `${r.dmslng.d}°${r.dmslng.m}'${r.dmslng.s}" ${result.lng_suffix}`);
  }

  return Ember.String.htmlSafe(`${result.declat}°&nbsp;${result.lat_suffix}, ${result.declng}°&nbsp;${result.lng_suffix}`);
}

function decToDms(coord) {
  const d = Math.floor(coord);
  const m = Math.floor((coord - d) * 60);
  const s = Math.round((coord - d - (m / 60)) * 3600 * 100) / 100;
  return { d, m, s };
}

export default Ember.Helper.helper(displayLatlong);
