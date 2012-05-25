
var util      = require('./util');
var TypedList = require('./typedlist').TypedList;




module.exports.List = List;


/**
 * @constructor
 * @extends {TypedList}
 * @param {Array} optional initial values to populate. can be any iterable object.
 * @returns {List}
 * @api public
 */

function List( init ) {
  if (!(this instanceof List)) return new List(init);

  List._super.constructor.call(this, 'Any', init);
}
util.inherit(List, TypedList);


/**
 * @override
 * @api private
 */

Object.defineProperty(List.prototype, '_new', {
  value: function() { return new List; }
});



