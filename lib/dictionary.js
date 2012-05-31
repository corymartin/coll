
var util = require('./util');

//TODO: Change name to Dict?

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

  var dict = util.extend({}, init);

  this.get = function(key) { return dict[key]; }
  this.set = function(key, val) { dict[key] = val; }
  Object.defineProperty(this, 'keys', {
    get : function() { return Object.keys(dict); },
    enumerable : true
  });
}

