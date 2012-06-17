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
    this.forEach(function(val, key, obj) {
      if (!!iterator.call(context, val, key, obj))
        filtered.set(key, val);
    });
    return filtered;
  };


  /**
   * @returns {Object} new instance
   * @api public
   */

  this.copy = function copy() {
    var c = this._new();
    this.forEach(function(val, key) {
      c.set(key, val);
    });
    return c;
  };


  /**
   * @returns {Object} this
   * @api public
   */

  this.clear = function clear() {
    var keys = this.keys;
    keys.forEach(function(key) {
      this.remove(key);
    }, this);
    return this;
  };


  /**
   * @param {Function} optional serializer to convert object keys to strings
   * @returns {Object}
   * @api public
   */

  this.toLiteral = function toLiteral(serializer) {
    var hasSerializer = typeof serializer === 'function';
    var obj = {};
    this.forEach(function(val, key) {
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
    this.forEach(function(val, key) {
      arr.push([key, val]);
    });
    return arr;
  };

};

