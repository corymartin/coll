
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
   * @param {Object} obj
   * @param {String} type
   * @returns {Boolean} `true` if the item passes the type check,
   *    `false` otherwise.
   * @api private
   */

  isType : function(obj, type) {
    if (type === 'Any') return true;
    if (obj == null)    return false;

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

  isTypeEvery : function(arr, type, index) {
    if (type === 'Any') return true;
    index >>>= 0;
    var len = arr.length;
    for (; index < len; index++)
      if (!this.isType(arr[index], type)) return false;
    return true;
  },


  /**
   * @param {String} Actual type expected.
   * @api private
   */

  throwTypeError : function(type) {
    if (type == null) throw new TypeError;
    var strType;
    if (this.isString(type))
      strType = type;
    else if (typeof type === 'function' && type.name != null)
      strType = type.name;
    else
      strType = _toString.call(type).slice(8, -1);
    throw new TypeError('Expected ' + strType);
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

