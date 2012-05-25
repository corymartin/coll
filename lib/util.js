
var ArrProto     = Array.prototype;
var _forEach     = ArrProto.forEach;
var _every       = ArrProto.every;
var _some        = ArrProto.some;
var _reduce      = ArrProto.reduce;
var _reduceRight = ArrProto.reduceRight;
var _filter      = ArrProto.filter;
var _map         = ArrProto.map;
var _indexOf     = ArrProto.indexOf;
var _lastIndexOf = ArrProto.lastIndexOf;
var _push        = ArrProto.push;
var _splice      = ArrProto.splice;
var _unshift     = ArrProto.unshift;
var _slice       = ArrProto.slice;
var _sort        = ArrProto.sort;


var ObjProto        = Object.prototype;
var _toString       = ObjProto.toString;
var _hasOwnProperty = ObjProto.hasOwnProperty;



module.exports = {

  /**
   * @param {Object}
   * @param {Object}
   * @api private
   */

  inherit : (function() {
    function Ctor() {}
    return function( Child, Parent ) {
      Ctor.prototype = Parent.prototype;
      Child.prototype = new Ctor;
      Child._super = Parent.prototype;
      Child.prototype.constructor = Child;
    }
  }()),


  /**
   * @param {Number} index
   * @param {Number} length
   * @returns {Number}
   * @api private
   */

  determineSearchIndex : function(index, length) {
    if (index != null) {
      if (index < 0) index = length + index;
      if (index < 0) index = 0;
    }
    return index >>> 0;
  },


  /**
   * @param {Number} index
   * @param {Number} length
   * @returns {Number}
   * @api private
   */

  determineLastSearchIndex : function(index, length) {
    if (index == null || index >= length) index = length;
    else {
      if (index < 0) index += length;
      index = index < 0 ? 0 : index + 1;
    }
    return index >>> 0;
  },


  /**
   * @param {Mixed} obj
   * @returns {Boolean}
   * @api private
   */

  isFunction : function(obj) {
    return typeof obj === 'function';
  },


  /**
   * @param {Mixed} obj
   * @returns {Boolean}
   * @api private
   */

  isString : function(obj) {
    return _toString.call(obj) === '[object String]';
  }

}

