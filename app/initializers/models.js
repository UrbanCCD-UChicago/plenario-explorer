import StreamCollection from '../models/stream-collection';

export function initialize(application) {
  console.log('Registering!');
  application.register('model:stream-collection', StreamCollection);
}

export default {
  name: 'models',
  initialize
};
