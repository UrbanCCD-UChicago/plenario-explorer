import Ember from 'ember';

export function unsnakify(params, namedArgs) {
  let parts = params[0].split('_');
  if (namedArgs) {
    if (namedArgs.titleCase) {
      parts = parts.map(part => part.capitalize());
    } else if (namedArgs.capitalizeFirst) {
      parts[0] = parts[0].capitalize();
    }
  }
  return parts.join(' ');
}

export default Ember.Helper.helper(unsnakify);
