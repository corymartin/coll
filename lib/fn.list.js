
var List = require('./list').List;


/*
 * Expose `list` function.
 */
module.exports.list = list;



/**
 * @param {iterable} optional
 * @returns {Function}
 * @api public
 */

function list(init) {
  var ls = new List(init);

  /*
   * Set/Get function
   */
  var sget = function(index, value) {
    return value === undefined
      ? ls.get(index)
      : ls.set(index, value);
  }

  for (var name in List.prototype) {
    var fn = List.prototype[name];
    if (typeof fn === 'function')
      sget[name] = fn.bind(ls);
  }

  // Override List#_new
  Object.defineProperty(ls, '_new', {
    value      : function() { return list(); },
    enumerable : false,
    writable   : false
  });

  /*
   * Since sget is a function it already has a `length` property
   * that doesn't help us and we can't overwrite it.
   * So we'll use `count` instead.
   */
  Object.defineProperty(sget, 'count', {
    get: function() { return ls.length; },
    enumerable   : true,
    configurable : true
  });


  /**
   * @returns {List} a copy of the List instance.
   * @api public
   */

  sget.toList = function() {
    return ls.clone();
  }

  return sget;
}

