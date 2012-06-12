
var ObjProto  = Object.prototype;
var _toString = ObjProto.toString;



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
   * @param {Object} target
   * @param {Object} n objects to extend from
   * @returns {Object}
   * @api private
   */

  extend : function extend(target) {
    target = target || {};
    var len = arguments.length;
    var i   = 1;
    for (; i < len; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        target[key] = obj[key];
      }
    }
    return target;
  },


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
   * Type checks the passed value.
   *
   * @param {String} type
   * @param {Object} obj
   * @returns {Boolean} `true` if the item passes the type check,
   *    `false` otherwise.
   * @api private
   */

  isType : function(type, obj) {
    if (obj === undefined) return false;
    if (type === 'Any'
      || obj === null)     return true;

    return typeof type === 'function'
      ? obj instanceof type
      : _toString.call(obj) === '[object '+type+']';
  },


  /**
   * Type checks every value in the passed array.
   *
   * @param {Array} arr
   * @param {String} type
   * @param {Number} Optional. Index to start searching at.
   * @returns {Boolean} `true` if every item passes the type check,
   *    `false` otherwise.
   * @api private
   */

  isTypeEvery : function(type, arr, index) {
    index >>>= 0;
    var len = arr.length;
    for (; index < len; index++)
      if (!this.isType(type, arr[index])) return false;
    return true;
  },


  /**
   * @param {String} Actual type expected.
   * @api private
   */

  throwTypeError : function(type) {
    if (type === undefined
      || type === 'Any') throw new TypeError;
    var strType;
    if (_toString.call(type) === '[object String]')
      strType = type;
    else if (typeof type === 'function' && type.name != null)
      strType = type.name;
    else
      strType = _toString.call(type).slice(8, -1);
    throw new TypeError('Expected ' + strType);
  }

}

