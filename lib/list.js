
var util      = require('./util');
var TypedList = require('./typedlist').TypedList;



/*
 * Expose `TypedList`
 */
module.exports.List = List;



/**
 * List
 * ====
 * Essentially a `TypedList('Any')`
 *
 *
 * @constructor
 * @extends {TypedList}
 * @param {iterable} optional initial values to populate.
 *    Can be any iterable object.
 * @returns {List}
 * @api public
 */

function List(init) {
  if (!(this instanceof List)) return new List(init);

  List._super.constructor.call(this, 'Any', init);
}
util.inherit(List, TypedList);


/**
 * @override
 * @returns {List} new List
 * @api private
 */

Object.defineProperty(List.prototype, '_new', {
  value: function() { return new List; },
  writable   : false,
  enumerable : false
});



