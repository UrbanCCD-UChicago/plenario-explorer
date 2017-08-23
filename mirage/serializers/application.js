import { Serializer } from 'ember-cli-mirage';
import _ from 'npm:lodash';

export default Serializer.extend({

  serialize(response, request, ...rest) {
    const json = Serializer.prototype.serialize.apply(this, [response, request, ...rest]);

    const rootKey = _.includes(request.url, 'sensor-networks') ? 'data' : 'objects';

    const returnVal = {};
    returnVal[rootKey] = _.values(json)[0];

    return returnVal;
  },

});
