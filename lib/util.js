
module.exports = {

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
    if (obj instanceof Date) return !isNaN(obj.getTime());
    if (typeof obj === 'number') return !isNaN(obj);
    return typeof obj !== 'string' && !isNaN(parseFloat(obj));
  }

}

