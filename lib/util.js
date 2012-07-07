
var hasOwn = Object.prototype.hasOwnProperty;

var util;

module.exports = util = {

  /**
   * @param {Object}
   * @param {Object}
   * @api private
   */

  inherit : (function() {
    function Ctor() {}
    return function inherit( Child, Parent ) {
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
        if (hasOwn.call(obj, key))
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

  determineSearchIndex : function determineSearchIndex(index, length) {
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

  determineLastSearchIndex : function determineLastSearchIndex(index, length) {
    if (index == null || index >= length) index = length;
    else {
      if (index < 0) index += length;
      index = index < 0 ? 0 : index + 1;
    }
    return index >>> 0;
  },


  /**
   * @param {Object} obj
   * @returns {Boolean}
   * @api private
   */

  isNumeric : function isNumeric(obj) {
    if (typeof obj === 'number') return !isNaN(obj);
    return typeof obj !== 'string'
      && !(obj instanceof String)
      && !isNaN(parseFloat(obj));
  },


  /**
   * Simple numeric comparer.
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Number}
   * @api private
   */

  numberComparer : function numberComparer(a, b) {
    return a - b;
  },


  /**
   * Comparer to be used with Array#sort, List#sort, List#max, List#min, etc.
   * Checks for NaN, pushing them to the end of the list/array.
   *
   * @param {Number} a
   * @param {Number} b
   * @returns {Number}
   * @api private
   */

  numberComparerWithNaN : function numberComparerWithNaN(a, b) {
    // Check for NaN
    if (a !== a && b !== b) return 0;
    if (a !== a)            return 1;
    if (b !== b)            return -1;
    return a - b;
  },


  /**
   * Compares two numeric type objects that have #valueOf() functions.
   * Number, Boolean
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {Number}
   * @api private
   */

  valueOfComparer : function valueOfComparer(a, b) {
    return a.valueOf() - b.valueOf();
  },


  /**
   * Compares two numeric type objects that have #valueOf() functions.
   * Takes NaN into consideratin.
   * Number
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {Number}
   * @api private
   */

  valueOfComparerWithNaN : function valueOfComparerWithNaN(a, b) {
    a = a.valueOf();
    b = b.valueOf();
    return util.numberComparerWithNaN(a, b);
  },


  /**
   * Compares dates. Takes 'Invalid Date' (NaN) into consideration.
   *
   * @param {Date} a
   * @param {Date} b
   * @returns {Number}
   * @api private
   */

  dateComparer : function dateComparer(a, b) {
    a = a.getTime();
    b = b.getTime();
    return util.numberComparerWithNaN(a, b);
  },


  /**
   * Returns a comparer function that compares objects
   * by a specific property name.
   *
   * @param {String} name of property
   * @returns {Function} comparer
   * @api private
   */

  propertyComparer : function propertyComparer(name) {
    return function(a, b) {
      a = a[name];
      b = b[name];
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    };
  },


  /**
   * Compares two objects and returns the greater as determined by
   * a `>=` test.
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {Number}
   * @api private
   */

  maxComparer : function maxComparer(a, b) {
    return a >= b ? a : b;
  },


  /**
   * Compares two objects and returns the greater as determined by
   * a `<=` test.
   *
   * @param {Object} a
   * @param {Object} b
   * @returns {Number}
   * @api private
   */

  minComparer : function minComparer(a, b) {
    return a <= b ? a : b;
  }

}

