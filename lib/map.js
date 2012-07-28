
var util                      = require('./util');
var mixinKeyValIteration      = require('./mixinKeyValIteration');
var mixinKeyValTransformation = require('./mixinKeyValTransformation');


/*
 * Expose `Map`
 */
module.exports.Map = Map;


/**
 * Map
 * ===============
 *
 * @constructor
 * @param {Array} init key/value pairs
 * @returns {Map}
 * @api public
 */

function Map(init) {
  if (!(this instanceof Map))
    return new Map(init);

  this._map = {keys:[], vals:[]}

  // Add init key/val pairs, if passed
  if (init instanceof Array) {
    init.forEach(function(pair) {
      this.set(pair[0], pair[1]);
    }, this);
  }
};


/**
 * @api private
 */

Object.defineProperty(Map.prototype, '_new', {
  value: function _new(init) { return new Map(init); },
  enumerable : false,
  writable   : false
});


/**
 * @api public
 */

Object.defineProperty(Map.prototype, 'length', {
  get : function() { return this._map.keys.length; },
  enumerable   : true,
  configurable : false
});


/**
 * Exposes a copy of the keys.
 *
 * @api public
 */

Object.defineProperty(Map.prototype, 'keys', {
  get : function() { return this._map.keys.slice(); },
  enumerable   : true,
  configurable : false
});


/**
 * Exposes a copy of the values.
 *
 * @api public
 */

Object.defineProperty(Map.prototype, 'values', {
  get : function() { return this._map.vals.slice(); },
  enumerable   : true,
  configurable : false
});


/**
 * @param {Object} key
 * @param {Object} _default optional
 * @returns {Object}
 * @api public
 */

Map.prototype.get = function get(key, _default) {
  var i = util.indexOf(this._map.keys, key);
  if (!~i) {
    if (arguments.length === 1)
      throw new ReferenceError(key);
    return _default;
  }
  return this._map.vals[i];
};


/**
 * @param {Object} key
 * @param {Object} val
 * @returns {Map} this
 * @api public
 */

Map.prototype.set = function set(key, val) {
  var i = util.indexOf(this._map.keys, key);
  if (!~i) {
    this._map.keys.push(key);
    this._map.vals.push(val);
  }
  else {
    this._map.vals.splice(i, 1, val);
  }
  return this;
};


/**
 * @param {Object} key
 * @returns {Boolean} `true` if removed, `false` otherwise.
 * @api public
 */

Map.prototype.remove = function remove(key) {
  var i = util.indexOf(this._map.keys, key);
  if (!~i)
    throw new ReferenceError(key);
  var val = this._map.vals[i];
  this._map.keys.splice(i, 1);
  this._map.vals.splice(i, 1);
  return val;
};


/**
 * @returns {Object} this
 * @api public
 */

Map.prototype.clear = function clear() {
  this._map.keys = [];
  this._map.vals = [];
  return this;
};


/**
 * @param {Object} key
 * @returns {Boolean}
 * @api public
 */

Map.prototype.hasKey = function hasKey(key) {
  return util.indexOf(this._map.keys, key) >= 0;
};



/*
 * Add Mixin Functions to Prototype
 */

mixinKeyValIteration.call(Map.prototype);
mixinKeyValTransformation.call(Map.prototype);

