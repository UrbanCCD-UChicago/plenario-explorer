import Ember from 'ember';

const q = Ember.inject.service();

class Node {
  constructor(nodeGeoJSON) {
    Ember.merge(this, nodeGeoJSON);
    this.properties.metadata = humanizeMetadata(nodeGeoJSON.properties.info);
  }

  /**
   * Return all nodes post-processed into Node models.
   * @returns {Promise.<TResult>}
   */
  static all() {
    return q.allNodeMetadata()
    .then(nodeResponse => 
      nodeResponse.map(nodeRecord => new Node(nodeRecord))
    );
  }
}

/**
 * Collection of functions that take a potential
 * info type specified on Node responses
 * and outputs a key and value suitable for users
 * to see in a metadata table.
 */
const transforms = {
  'orientation': orientation => ['Facing', orientation.value],
  'height': height => ['Height', `${height.value} ${height.unit}`]
};

function humanizeMetadata(metadata) {
  const humanized = {};
  for (let key of Object.keys(metadata)) {
    if (key in transforms) {
      const [name, val] = transforms[key](metadata[key]);
      humanized[name] = val;
    }
  }
  return humanized;
}

export {Node};

