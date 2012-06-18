
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

  var keys = [];
  var vals = [];

  /**
   * @param {Object} key
   * @param {Object} _default optional
   * @returns {Object}
   * @api public
   */

  this.get = function get(key, _default) {
    var i = keys.indexOf(key);
    if (!~i) {
      if (arguments.length >= 2)
        return _default;
      throw new ReferenceError(key);
    }
    return vals[i];
  };

  /**
   * @param {Object} key
   * @param {Object} val
   * @returns {Map} this
   * @api public
   */

  this.set = function set(key, val) {
    var i = keys.indexOf(key);
    if (!~i) {
      keys.push(key);
      vals.push(val);
    }
    else {
      vals.splice(i, 1, val);
    }
    return this;
  };

  /**
   * @param {Object} key
   * @returns {Boolean} `true` if removed, `false` otherwise.
   * @api public
   */

  this.remove = function remove(key) {
    var i = keys.indexOf(key);
    if (!~i)
      throw new ReferenceError(key);
    var val = vals[i];
    keys.splice(i, 1);
    vals.splice(i, 1);
    return val;
  };

  /**
   * @returns {Object} this
   * @api public
   */

  this.clear = function clear() {
    keys = [];
    vals = [];
    return this;
  };

  /**
   * @param {Object} key
   * @returns {Boolean}
   * @api public
   */

  this.hasKey = function hasKey(key) {
    return !!~keys.indexOf(key);
  };

  /**
   * Exposes a copy of the keys.
   *
   * @api public
   */

  Object.defineProperty(this, 'keys', {
    get : function() { return keys.slice(); },
    enumerable   : true,
    configurable : false
  });

  /**
   * Exposes a copy of the values.
   *
   * @api public
   */

  Object.defineProperty(this, 'values', {
    get : function() { return vals.slice(); },
    enumerable   : true,
    configurable : false
  });

  // Add init key/val pairs, if passed
  if (Array.isArray(init)) {
    init.forEach(function(pair) {
      this.set(pair[0], pair[1]);
    }, this);
  }
};


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


/*
 * Add Mixin Functions to Prototype
 */

mixinKeyValIteration.call(Map.prototype);
mixinKeyValTransformation.call(Map.prototype);

