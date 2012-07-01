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
   * @returns {Object} this
   * @api public
   */

  this.forEach = function forEach(context, iterator) {
    if (arguments.length < 2) {
      iterator = arguments[0];
      context  = null;
    }
    this.keys.forEach(function(key) {
      iterator.call(context, key, this.get(key), this);
    }, this);
    return this;
  };


  /**
   * @param {Object} context optional
   * @param {Function} iterator
   * @returns {Boolean}
   * @api public
   */

  this.some = function some(context, iterator) {
    if (arguments.length < 2) {
      iterator = arguments[0];
      context  = null;
    }
    var keys = this.keys;
    var len  = keys.length;
    if (!len) return false;
    var i = 0;
    for (; i < len; i++) {
      if (!!iterator.call(context, keys[i], this.get(keys[i]), this))
        return true;
    }
    return false;
  };


  /**
   * @param {Object} context optional
   * @param {Function} iterator
   * @returns {Boolean}
   * @api public
   */

  this.every = function every(context, iterator) {
    if (arguments.length < 2) {
      iterator = arguments[0];
      context  = null;
    }
    var keys = this.keys;
    var len  = this.length;
    if (!len) return true;
    var i = 0;
    for (; i < len; i++) {
      if (!iterator.call(context, keys[i], this.get(keys[i]), this))
        return false;
    }
    return true;
  };

};

