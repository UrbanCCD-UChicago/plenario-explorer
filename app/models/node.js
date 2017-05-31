import Ember from 'ember';

export default Ember.Object.extend({
  init() {
    const nodeGeoJSON = this.get('nodeGeoJSON');
    Ember.merge(this, nodeGeoJSON);
    const meta = nodeGeoJSON.properties.info;
    this.properties.metadata = meta ? humanizeMetadata(meta) : {};
  },
});

/**
 * Collection of functions that take a potential
 * info type specified on Node responses
 * and outputs a key and value suitable for users
 * to see in a metadata table.
 */
const transforms = {
  orientation: orientation => ['Facing', orientation.value],
  height: height => ['Height', `${height.value} ${height.unit}`],
};

function humanizeMetadata(metadata) {
  const humanized = {};
  for (const key of Object.keys(metadata)) {
    if (key in transforms) {
      const [name, val] = transforms[key](metadata[key]);
      humanized[name] = val;
    }
  }
  return humanized;
}
