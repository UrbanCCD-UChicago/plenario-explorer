import Ember from 'ember';

function promisify(data) {
  return new Ember.RSVP.Promise(function(resolve, reject){
    resolve(data);
  });
}

export {promisify};
