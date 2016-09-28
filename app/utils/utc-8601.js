/**
 * Returns moment.js moment as 8601 timestamp in UTC
 * @param moment Moment JS object
 * @returns string
 */
export default function utc8601(moment) {
  return moment.utc().format();
}
