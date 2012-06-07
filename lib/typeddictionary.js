
var TypedList = require('./typedlist').TypedList;
var util      = require('./util');


/*
 * Expose `TypedDictionary`
 */
module.exports.TypedDictionary = TypedDictionary;


/**
 * TypedDictionary
 * ===============
 *
 * @constructor
 * @param {String|Function} keyType
 * @param {String|Function} valType
 * @param {Object} init
 * @returns {TypedDictionary}
 * @api public
 */

function TypedDictionary(keyType, valType, init) {
  if (keyType == null) throw new TypeError('Parameter `keyType` is required');
  if (valType == null) throw new TypeError('Parameter `valType` is required');

  if (!(this instanceof TypedDictionary))
    return new TypedDictionary(keyType, valType, init);

  Object.defineProperty(this, 'keyType', {
    value      : keyType,
    writable   : false,
    enumerable : true
  });

  Object.defineProperty(this, 'valType', {
    value      : valType,
    writable   : false,
    enumerable : true
  });


  var keys = TypedList(keyType);
  var vals = TypedList(valType);


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
   * @returns {TypedDictionary} this
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

Object.defineProperty(TypedDictionary.prototype, '_new', {
  value: function _new(key, val) {
    if (key == null || val == null) {
      key = this.keyType;
      val = this.valType;
    }
    return new TypedDictionary(key, val);
  },
  enumerable : false,
  writable   : false
});


/**
 * @api public
 */

Object.defineProperty(TypedDictionary.prototype, 'length', {
  get : function() { return this.keys.length; },
  enumerable   : true,
  configurable : false
});





/**
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedDictionary} this
 * @api public
 */

TypedDictionary.prototype.forEach = function forEach(iterator, context) {
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

TypedDictionary.prototype.every = function every(iterator, context) {
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

TypedDictionary.prototype.some = function some(iterator, context) {
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
 * @returns {TypedDictionary} new Dictionary
 * @api public
 */

TypedDictionary.prototype.filter = function filter(iterator, context) {
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
 * @returns {TypedDictionary} new Dictionary
 * @api public
 */

TypedDictionary.prototype.map = function map(iterator, context) {
  var map = this._new();
  var m;
  this.forEach(function(val, key, dict) {
    m = iterator.call(context, val, key, dict);
    map.set(m[0], m[1]);
  });
  return map;
}


TypedDictionary.prototype.reduce = function reduce(iterator, initval) {
  if (!this.length && initval === undefined)
    throw new TypeError('Reduce of empty dictionary with no initial value');
  var cnt = 0;
  var self = this;
  return this.keys.reduce(function(a, b) {
    if (!cnt++ && initval === undefined) a = self.get(a);
    b = self.get(b);
    return iterator.call(null, a, b, self);
  }, initval);
}



/**
 * @returns {Object}
 * @api public
 */

TypedDictionary.prototype.toLiteral = function toLiteral() {
  var obj = {};
  this.forEach(function(val, key) {
    obj[key] = val;
  });
  return obj;
}




