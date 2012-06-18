
var util                      = require('./util');
var mixinKeyValIteration      = require('./mixinKeyValIteration');
var mixinKeyValTransformation = require('./mixinKeyValTransformation');




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

  var dict = util.extend({}, init);

  /**
   * @param {Object} key
   * @param {Object} _default optional
   * @returns {Object}
   * @throws {ReferenceError}
   * @api public
   */

  this.get = function get(key, _default) {
    if (!this.hasKey(key)) {
      if (arguments.length >= 2)
        return _default;
      throw new ReferenceError(key);
    }
    return dict[key];
  };

  /**
   * @param {Object} key
   * @param {Object} val
   * @returns {Dict} this
   * @api public
   */

  this.set = function set(key, val) {
    dict[key] = val;
    return this;
  };

  /**
   * @param {String} key
   * @returns {Object} the removed value
   * @throws {ReferenceError}
   * @api public
   */

  this.remove = function remove(key) {
    if (!this.hasKey(key))
      throw new ReferenceError(key);
    var val = dict[key];
    delete dict[key];
    return val;
  };

  /**
   * @param {Object} key
   * @returns {Boolean}
   * @api public
   */

  this.hasKey = function hasKey(key) {
    var k;
    for (k in dict) {
      if (k === key) return true;
    }
    return false;
  };

  /**
   * An array of the dictionary's keys.
   *
   * @api public
   */

  Object.defineProperty(this, 'keys', {
    get : function() {
      // More performant than Object.keys()
      var arr = [];
      var key;
      for (key in dict) arr.push(key);
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

  Object.defineProperty(this, 'values', {
    get : function() {
      var arr = [];
      var key;
      for (key in dict) {
        arr.push(dict[key]);
      }
      return arr;
    },
    enumerable   : true,
    configurable : false
  });
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
  var key, val;
  for (; i < len; i++) {
    for (key in arguments[i]) {
      val = arguments[i][key];
      this.set(key, val);
    }
  }
  return this;
};

