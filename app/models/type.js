export default class Type {
  constructor() {
    if (arguments.length === 1) {
      this._constructFromTypeString(arguments[0]);
    } else if (arguments.length === 2) {
      this._constructFromParts(arguments[0], arguments[1]);
    } else {
      throw new Error('Type must be instantiated with full type name' +
        'or feature name and property name.');
    }
  }

  _constructFromTypeString(typeString) {
    const lastPeriod = /\.[^.]+$/;
    const idx = typeString.search(lastPeriod);
    if (idx === -1) {
      throw new Error(`Type string ${typeString} is invalid.`);
    }
    this.typeString = typeString;
    this.feature = typeString.slice(0, idx);
    this.property = typeString.slice(idx + 1);
  }

  _constructFromParts(feature, property) {
    this.typeString = `${feature}.${property}`;
    this.feature = feature;
    this.property = property;
  }
}
