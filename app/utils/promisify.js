import Ember from 'ember';

function promisify(data) {
  return new Ember.RSVP.Promise(function(resolve){
    resolve(data);
  });
}

export {promisify};
