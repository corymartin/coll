
var List = require('./list').List;
var util = require('./util');


/*
 * Expose `Map`
 */
module.exports.Map = Map;


/**
 * Map
 * ===============
 *
 * @constructor
 * @returns {Map}
 * @api public
 */

function Map() {
  if (!(this instanceof Map))
    return new Map;

  var keys = List();
  var vals = List();

  /**
   * @param {Object} key
   * @returns {Object}
   * @api public
   */

  this.get = function get(key) {
    var i = keys.indexOf(key);
    return vals[i];
  }

  /**
   * @param {Object} key
   * @param {Object} val
   * @returns {Map} this
   * @api public
   */

  this.set = function set(key, val) {
    var i = keys.indexOf(key);
    if (!~i) {
      keys.add(key);
      vals.add(val);
    }
    else {
      vals.replaceAt(i, val);
    }
    return this;
  }

  /**
   * @param {Object} key
   * @returns {Boolean} `true` if removed, `false` otherwise.
   * @api public
   */

  this.remove = function remove(key) {
    var i = keys.indexOf(key)
    if (!!~i) {
      keys.removeAt(i);
      vals.removeAt(i);
      return true;
    }
    return false;
  }

  Object.defineProperty(this, 'keys', {
    get : function() { return keys.toArray(); },
    enumerable   : true,
    configurable : false
  });
}


/**
 * @api private
 */

Object.defineProperty(Map.prototype, '_new', {
  value: function _new() { return new Map; },
  enumerable : false,
  writable   : false
});


/**
 * @api public
 */

Object.defineProperty(Map.prototype, 'length', {
  get : function() { return this.keys.length; },
  enumerable   : true,
  configurable : false
});





/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Map} this
 * @api public
 */

Map.prototype.forEach = function forEach(iterator, context) {
  this.keys.forEach(function(key) {
    iterator.call(context, this.get(key), key, this);
  }, this);
  return this;
}


/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Boolean}
 * @api public
 */

Map.prototype.every = function every(iterator, context) {
  var len = this.length;
  if (!len) return true;
  var i = 0;
  for (; i < len; i++) {
    if (!iterator.call(context, this.get(this.keys[i]), this.keys[i], this))
      return false;
  }
  return true;
}


/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Boolean}
 * @api public
 */

Map.prototype.some = function some(iterator, context) {
  var len = this.length;
  if (!len) return false;
  var i = 0;
  for (; i < len; i++) {
    if (!!iterator.call(context, this.get(this.keys[i]), this.keys[i], this))
      return true;
  }
  return false;
}


/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Map} new Dictionary
 * @api public
 */

Map.prototype.filter = function filter(iterator, context) {
  var filtered = this._new();
  this.forEach(function(val, key, dict) {
    if (!!iterator.call(context, val, key, dict))
      filtered.set(key, val);
  });
  return filtered;
}


/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Map} new Dictionary
 * @api public
 */

Map.prototype.map = function map(iterator, context) {
  var map = this._new();
  var m;
  this.forEach(function(val, key, dict) {
    m = iterator.call(context, val, key, dict);
    map.set(m[0], m[1]);
  });
  return map;
}


/**
 * @param {Function} iterator
 * @param {Object} initval optional
 * @returns {Object}
 * @api public
 */

/*
Map.prototype.reduce = function reduce(initval, iterator) {
  var arglen = arguments.length;
  if (!this.length && arglen === 1)
    throw new TypeError('Reduce of empty dictionary with no initial value');
  if (arglen === 1) iterator = initval;
  var cnt  = 0;
  var self = this;
  return this.keys.reduce(function(a, b) {
    if (!cnt++) {
      a = arglen === 2
        ? initval
        : [a, self.get(a)];
    }
    b = [b, self.get(b)];
    return iterator.call(null, a, b, self);
  });
}
*/


/**
 * @returns {Object}
 * @api public
 */

Map.prototype.toLiteral = function toLiteral() {
  var obj = {};
  this.forEach(function(val, key) {
    obj[key] = val;
  });
  return obj;
}




