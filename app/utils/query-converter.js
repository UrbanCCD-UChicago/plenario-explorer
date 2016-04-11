/* global URI */

/**
 * QueryConverter stores a list of string to string pairs
 * as a hash (Embereño for POJO) and can export that list as
 * a URL query string or a hash.
 */
export default function QueryConverter() {

  this.fromHash = function(hash){
    this.hash = hash;
    return this;
  };

  this.fromQueryString = function(qString){
    this.hash = URI(qString).query(true);
    return this;
  };

  this.toHash = function(){
    return this.hash;
  };

  this.toQueryString = function(){
    console.log(this.hash);
    return URI('').addQuery(this.hash).toString();
  };
}
