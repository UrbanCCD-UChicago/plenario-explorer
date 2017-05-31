import Ember from 'ember';

function promisify(data) {
  return new Ember.RSVP.Promise((resolve) => {
    resolve(data);
  });
}

export { promisify };
