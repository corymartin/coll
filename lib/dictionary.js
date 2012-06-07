
var util            = require('./util');
var TypedDictionary = require('./typeddictionary').TypedDictionary;




/*
 * Expose `Dictionary`
 */
module.exports.Dictionary = Dictionary;


/**
 * Dictionary
 * ==========
 *
 * @constructor
 * @extends {TypedDictionary}
 * @param {Object} init
 * @returns {TypedDictionary}
 * @api public
 */

function Dictionary(init) {
  if (!(this instanceof Dictionary))
    return new Dictionary(init);

  //Dictionary._super.constructor.call(this, 'Any', 'Any', init);

  var dict = util.extend({}, init);

  /**
   * @param {Object} key
   * @returns {Object}
   * @api public
   */

  this.get = function get(key) {
    return dict[key];
  }

  /**
   * @param {Object} key
   * @param {Object} val
   * @returns {TypedDictionary} this
   * @api public
   */

  this.set = function set(key, val) {
    dict[key] = val;
    return this;
  }

  /**
   * @param {String} key
   * @returns {Boolean} `true` if removed, `false` otherwise.
   * @api public
   */

  this.remove = function remove(key) {
    var hasKey = !!~this.keys.indexOf(key);
    delete dict[key];
    return hasKey && !~this.keys.indexOf(key);
  }


  Object.defineProperty(this, 'keys', {
    get : function() { return Object.keys(dict); },
    enumerable   : true,
    configurable : true
  });
}
util.inherit(Dictionary, TypedDictionary);


/**
 * @api private
 */

Object.defineProperty(Dictionary.prototype, '_new', {
  value: function _new() { return new Dictionary; },
  enumerable : false,
  writable   : false
});



/**
 * @param {Object} n objects
 * @returns {Dictionary}
 * @api public
 */

Dictionary.prototype.extend = function extend() {
  var len = arguments.length;
  var i   = 0;
  var key, val;
  for (; i < len; i++) {
    for (key in arguments[i]) {
      var val = arguments[i][key];
      this.set(key, val);
    }
  }
  return this;
}


/**
 * @override
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedDictionary} new Dictionary
 * @api public
 */

Dictionary.prototype.map = function map(iterator, context) {
  var map = this._new();
  var o;
  this.forEach(function(val, key, dict) {
    o = iterator.call(context, val, key, dict);
    Array.isArray(o)
      ? map.set(o[0], o[1])
      : map.extend(o);
  });
  return map;
}
