import URI from 'uri';

/**
 * QueryConverter stores a list of string to string pairs
 * as a hash (Embereño for POJO) and can export that list as a JSON string,
 * a URL query string, or a hash.
 * We will use the JSON string representation as an ID for Ember Data.
 * To ensure a 1-1 mapping from queries to IDs,
 * ID representation of a query must be sorted alphabetically by key.
 */
export default function QueryConverter() {
  this.fromId = function(id){
    this.hash = JSON.parse(id);
  };
  this.fromHash = function(hash){
    this.hash = hash;
  };
  this.fromQueryString = function(qString){
    this.hash = URI(qString).query(true);
  };
  this.toId = function(){
    // JS objects maintain insertion ordering! Woah.
    // http://stackoverflow.com/questions/5467129/sort-javascript-object-by-key/31102605#31102605
    var orderedHash = {};
    var unorderedHash = this.hash;
    Object.keys(this.hash).sort().forEach(function(key){
      orderedHash[key] = unorderedHash[key];
    });
    return JSON.stringify(orderedHash);
  };
  this.toHash = function(){
    return this.hash;
  };
  this.toQueryString = function(){
    return URI('').addQuery(this.hash).toString();
  };
}
