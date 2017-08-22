import { Serializer } from 'ember-cli-mirage';
import _ from 'npm:lodash';

export default Serializer.extend({

  serialize(response, request) {
    const json = Serializer.prototype.serialize.apply(this, arguments);

    const rootKey = _.includes(request.url, 'sensor-networks') ? 'data' : 'objects';

    const returnVal = {};
    returnVal[rootKey] = _.values(json)[0];

    // console.log(returnVal);

    return returnVal;
  },

});
