
var util                      = require('./util');
var mixinKeyValIteration      = require('./mixinKeyValIteration');
var mixinKeyValTransformation = require('./mixinKeyValTransformation');

var _hasOwn = Object.prototype.hasOwnProperty;



/*
 * Expose `Dict`
 */
module.exports.Dict = Dict;


/**
 * Dict
 * ==========
 *
 * @constructor
 * @param {Object} init
 * @returns {Dict}
 * @api public
 */

function Dict(init) {
  if (!(this instanceof Dict))
    return new Dict(init);

  this._dict = util.extend({}, init);
};


/**
 * @api private
 */

Object.defineProperty(Dict.prototype, '_new', {
  value: function _new() { return new Dict; },
  enumerable : false,
  writable   : false
});


/**
 * @api public
 */

Object.defineProperty(Dict.prototype, 'length', {
  get : function() { return this.keys.length; },
  enumerable   : true,
  configurable : false
});


/**
 * An array of the dictionary's keys.
 *
 * @api public
 */

Object.defineProperty(Dict.prototype, 'keys', {
  get : function() {
    // More performant than Object.keys()
    var arr = [];
    var key;
    for (key in this._dict) arr.push(key);
    return arr;
  },
  enumerable   : true,
  configurable : true
});


/**
 * An array of the dictionary's values.
 *
 * @api public
 */

Object.defineProperty(Dict.prototype, 'values', {
  get : function() {
    var arr = [];
    var key;
    for (key in this._dict) {
      arr.push(this._dict[key]);
    }
    return arr;
  },
  enumerable   : true,
  configurable : false
});


/**
 * @param {Object} key
 * @param {Object} _default optional
 * @returns {Object}
 * @throws {ReferenceError}
 * @api public
 */

Dict.prototype.get = function get(key, _default) {
  if (!this.hasKey(key)) {
    if (arguments.length === 1)
      throw new ReferenceError(key);
    return _default;
  }
  return this._dict[key];
};

/**
 * @param {Object} key
 * @param {Object} val
 * @returns {Dict} this
 * @api public
 */

Dict.prototype.set = function set(key, val) {
  this._dict[key] = val;
  return this;
};

/**
 * @param {String} key
 * @returns {Object} the removed value
 * @throws {ReferenceError}
 * @api public
 */

Dict.prototype.remove = function remove(key) {
  if (!this.hasKey(key))
    throw new ReferenceError(key);
  var val = this._dict[key];
  delete this._dict[key];
  return val;
};

/**
 * @returns {Object} this
 * @api public
 */

Dict.prototype.clear = function clear() {
  this._dict = {};
  return this;
};

/**
 * @param {Object} key
 * @returns {Boolean}
 * @api public
 */

Dict.prototype.hasKey = function hasKey(key) {
  var k;
  for (k in this._dict) {
    if (k === key) return true;
  }
  return false;
};



/*
 * Add Mixin Functions to Prototype
 */

mixinKeyValIteration.call(Dict.prototype);
mixinKeyValTransformation.call(Dict.prototype);


/**
 * @param {Object} n objects
 * @returns {Dict} this
 * @api public
 */

Dict.prototype.add = function add() {
  var len = arguments.length;
  var i   = 0;
  var key, val, obj;
  for (; i < len; i++) {
    obj = arguments[i];
    for (key in obj) {
      if (_hasOwn.call(obj, key)) {
        val = obj[key];
        this.set(key, val);
      }
    }
  }
  return this;
};

