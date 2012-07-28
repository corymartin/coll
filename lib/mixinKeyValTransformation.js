
var coll = require('./coll');

/*
 * Objects must have the following properties and functions to use this mixin:
 *
 * - `#keys`
 * - `#values`
 * - `#length`
 * - `#get(key)`
 * - `#set(key, val)`
 * - `#_new()`
 */

module.exports = function() {

  /**
   * @param {Object} context optional
   * @param {Function} iterator
   * @returns {Object} new instance
   * @api public
   */

  this.filter = function filter(context, iterator) {
    if (arguments.length < 2) {
      iterator = arguments[0];
      context  = null;
    }
    var filtered = this._new();
    this.forEach(function(key, val, obj) {
      if (!!iterator.call(context, key, val, obj))
        filtered.set(key, val);
    });
    return filtered;
  };


  /**
   * @param {Object} context optional
   * @param {Function} iterator
   * @returns {Object} new instance
   * @api public
   */

  this.reject = function reject(context, iterator) {
    if (arguments.length < 2) {
      iterator = arguments[0];
      context  = null;
    }
    var rejected = this._new();
    this.forEach(function(key, val, obj) {
      if (!iterator.call(context, key, val, obj))
        rejected.set(key, val);
    });
    return rejected;
  };


  /**
   * @returns {Object} new instance
   * @api public
   */

  this.clone = function clone() {
    var c = this._new();
    this.forEach(function(key, val) {
      c.set(key, val);
    });
    return c;
  };


  /**
   * @param {Function} optional serializer to convert object keys to strings
   * @returns {Object}
   * @api public
   */

  this.toLiteral = function toLiteral(serializer) {
    var hasSerializer = typeof serializer === 'function';
    var obj = {};
    this.forEach(function(key, val) {
      if (hasSerializer) key = serializer(key, val);
      obj[key] = val;
    });
    return obj;
  };


  /**
   * @returns {Array}
   * @api public
   */

  this.toArray = function toArray() {
    var arr = [];
    this.forEach(function(key, val) {
      arr.push([key, val]);
    });
    return arr;
  };


  /**
   * @param {Object} defaults Object literal | Dict OR Array of tuples | Map
   * @returns {Object} new instance
   * @api public
   */

  this.fill = function fill(defaults) {
    // Test for equivalent Key/Val implementation via func defs.
    // Functions of two Dict instances will be equal, but will not
    // be equal to that of Map instances, etc.
    if (defaults._new !== this._new) {
      defaults = this._new(defaults);
    }
    var clone = this.clone();
    defaults.forEach(function(key, val) {
      if (!clone.hasKey(key)) {
        clone.set(key, val);
      }
    });
    return clone;
  };

};

