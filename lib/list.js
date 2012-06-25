
var util = require('./util');



var ArrProto     = Array.prototype;
var _forEach     = ArrProto.forEach;
var _some        = ArrProto.some;
var _every       = ArrProto.every;
var _reduce      = ArrProto.reduce;
var _reduceRight = ArrProto.reduceRight;
var _filter      = ArrProto.filter;
var _map         = ArrProto.map;
var _splice      = ArrProto.splice;
var _slice       = ArrProto.slice;
var _sort        = ArrProto.sort;
var _reverse     = ArrProto.reverse;
var _shift       = ArrProto.shift;
var _pop         = ArrProto.pop;




/*
 * Expose `List`
 */
module.exports.List = List;



/**
 * List
 * =========
 * An indexed list of items with functions for manipulating, iterating,
 * searching, indexing, transforming, and inspecting.
 *
 * Similar to or inspired by:
 *
 * - [C#'s List](http://msdn.microsoft.com/en-us/library/6sh2ey19.aspx)
 * - [Haskell's Data.List](http://www.haskell.org/ghc/docs/latest/html/libraries/base/Data-List.html)
 * - [Ruby's Array](http://www.ruby-doc.org/core-1.9.3/Array.html)
 * - [Python's list](http://docs.python.org/dev/library/functions.html#list)
 * - [and JS's own Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array)
 *
 * ...but attempting to keep with a JS style.
 *
 *
 * @constructor
 * @param {init} optional initial values to populate.
 *  Can be any iterable object.
 * @returns {List}
 * @api public
 */

function List(init) {
  if (!(this instanceof List)) return new List(init);

  this.length = 0;

  if (init != null)
    this.addRange(init);
}


/**
 * List length.
 * @api public
 */

Object.defineProperty(List.prototype, 'length', {
  value         : 0,
  writable      : true,
  enumerable    : true,
  configuruable : false
});




//
// Instance Functions - Borrowed from Array
// ========================================================
//

List.prototype.join    = ArrProto.join;



//
// Instance Functions - MUTATORS
// ========================================================
//


/**
 * Removes all items from the list instance.
 *
 * @returns {List} this
 * @api public
 */

List.prototype.clear = function clear() {
  _splice.call(this, 0);
  return this;
}


/**
 * Set a list item at a particular index to a new value.
 *
 * @param {Number} index must exist within list
 * @param {Object} obj
 * @returns {Boolean} `true` if the item is set successfully,
 *  `false` otherwise.
 * @api public
 */

List.prototype.set = function set(index, obj) {
  if (!(index in this)) throw new RangeError;
  if (arguments.length < 2) return this;
  this[index] = obj;
  return this;
}


/**
 * Appends one or more items to the end of the list.
 *
 * @param {Object} n items to add
 * @returns {List} this
 * @api public
 */

List.prototype.add = function add() {
  var i   = 0;
  var len = arguments.length;
  for (; i < len; i++) this[this.length++] = arguments[i];
  return this;
}


/**
 * Appends a range of new items to the end of the list.
 *
 * @param {iterable} iterable
 * @returns {List} this
 * @api public
 */

List.prototype.addRange = function addRange(iterable) {
  if (iterable == null || !iterable.length) return this;
  var i   = 0;
  var len = iterable.length;
  for (;i < len; i++) this.add(iterable[i]);
  return this;
}


/**
 * Inserts a single new item at the specifed index.
 *
 * @param {Number} index
 * @param {Object} obj
 * @returns {List} this
 * @api public
 */

List.prototype.insert = function insert(index, obj) {
  if (!(index in this)) throw new RangeError;
  if (arguments.length < 2) return this;
  _splice.call(this, index, 0, obj);
  return this;
}


/**
 * Inserts a range of new items starting at the specifed index.
 *
 * @param {Number} index
 * @param {iterable} items
 * @returns {List} this
 * @api public
 */

List.prototype.insertRange = function insertRange(index, iterable) {
  if (!(index in this)) throw new RangeError;
  if (iterable == null || !iterable.length) return this;
  var args = [index, 0];
  var i   = 0;
  var len = iterable.length;
  for (;i < len; i++) args.push(iterable[i]);
  _splice.apply(this, args);
  return this;
}


/**
 * Removes the first occurence of the passed item in the list.
 *
 * @param {Object} item
 * @param {Number} index optional
 * @returns {Boolean} `true` if removed, `false` otherwise
 * @api public
 */

List.prototype.remove = function remove(item, index) {
  index = this.indexOf(item, index);
  return !~index
    ? undefined
    : this.removeAt(index);
}


/**
 * Removes and returns the first item in the list.
 *
 * @returns {Object}
 * @api public
 */

List.prototype.removeFirst = function removeFirst() {
  return _shift.call(this);
}


/**
 * Removes and returns the last item in the list.
 *
 * @returns {Object}
 * @api public
 */

List.prototype.removeLast = function removeLast() {
  return _pop.call(this);
}


/**
 * Removes the first item in the list that passes the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {Object} the removed value
 * @api public
 */

List.prototype.removeIf = function removeIf(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var index = this.indexIf(null, context, iterator);
  return !~index
    ? undefined
    : this.removeAt(index);
}


/**
 * Removes every item in the list that passes the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List of removed items
 * @api public
 */

List.prototype.removeAll = function removeAll(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var len     = this.length;
  var removed = new List;
  if (!len) return removed;
  var index = 0;
  while (index < len) {
    index = this.indexIf(index, context, iterator);
    if (!~index) break;
    removed = removed.add(
      this.removeAt(index)
    );
    --len;
  }
  return removed;
}


/**
 * Removes the item at the given index. If the optional `howmany` parameter is
 * passed, a range of items is removed startng at the index.
 *
 * @param {Number} index
 * @param {Number} howmany optional
 * @returns {Object|List} the items removed from the list
 * @api public
 */

List.prototype.removeAt = function removeAt(index, howmany) {
  if (index >= 0 || this.length + index >= 0)
    index = util.determineSearchIndex(index, this.length);
  if (!(index in this)) throw new RangeError;
  if (howmany == null) howmany = 1;
  var removed = _splice.call(this, index, howmany);
  return removed.length === 1
    ? removed[0]
    : new List(removed);
}


/**
 * Extracts all or part of the list.
 *
 * @param {Number} begin optional
 * @param {Number} end optional
 * @returns {List} new List
 * @api public
 */

List.prototype.slice = function slice(begin, end) {
  // If slicing entire list, more performant to not use Array#slice
  var arr = begin == null
    || (begin === 0 && (end == null || end === this.length))
    ? this
    : _slice.call(this, begin, end);
  return new List(arr);
}


/**
 * Joins the list with one or more other iterable objects.
 *
 * @param {iterable} n iterables to concatenate
 * @returns {List} new List
 * @api public
 */

List.prototype.concat = function concat() {
  var len  = arguments.length;
  var copy = this.clone();
  if (!len) return copy;
  var i = 0;
  for (;i < len; i++) copy.addRange(arguments[i]);
  return copy;
}


/**
 * Returns the number of occurences of the passed item within the list.
 * If no argument is supplied, the list's length is returned.
 *
 * @param {Object} obj optional
 * @returns {Number} the number of occurences of obj if passed,
 *  otherwise the list's length
 * @api public
 */

List.prototype.count = function count(obj) {
  if (!arguments.length) return this.length;
  return this.indicesOf(obj).length;
}


/**
 * Returns the number of occurences that the iterator test success against
 * the items within the list.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {Number}
 * @api public
 */

List.prototype.countIf = function countIf(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  return this.indicesIf(null, context, iterator).length;
}


/**
 * Determines if the passed item is in the list.
 *
 * @param {Object} obj
 * @returns {Boolean} true if the item is in the list, false otherwise
 * @api public
 */

List.prototype.contains = function contains(obj) {
  return !!~this.indexOf(obj);
}


/**
 * Returns the first item to pass the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {Object}
 *  the first item to pass the iterator test, otherwise `undefined`
 * @api public
 */

List.prototype.find = function find(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var i = this.indexIf(null, context, iterator);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns the last item to pass the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {Object}
 *  the first item from the end of the list to pass the iterator test,
 *  otherwise `undefined`
 * @api public
 */

List.prototype.findLast = function findLast(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var i = this.lastIndexIf(null, context, iterator);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns every item to pass the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @return {List} new List of all values passing the iterator test
 * @api public
 */

List.prototype.findAll = function findAll(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var indexes = this.indicesIf(null, context, iterator);
  var values  = new List;
  _forEach.call(indexes, function(i) {
    values.add(this[i]);
  }, this);
  return values;
}


/**
 * Copies the items in the list to an `Array` and returns the it.
 *
 * @returns {Array} an array of the list's contents
 * @api public
 */

List.prototype.toArray = function toArray() {
  return this.reduce([], function(arr, item) {
    arr.push(item);
    return arr;
  });
}


/**
 * Returns a copy of the list.
 *
 * @returns {List} new List
 * @api public
 */

List.prototype.clone = function clone() {
  return new List(this);
}


/**
 * Returns a copy of the list with all occurences of `undefined`,
 * `null`, and `NaN` removed.
 *
 * @returns {List} new List
 * @api public
 */

List.prototype.clean = function clean() {
  var ls = this.clone();
  ls.removeAll(function(val, i) {
    return val == null || val !== val;
  });
  return ls;
}


/**
 * Returns the item at the specified index.
 *
 * @param {Number} index
 * @returns {Object} value at index
 * @api public
 */

List.prototype.get = function get(index) {
  if (!(index in this)) throw new RangeError;
  return this[index];
}


/**
 * Returns the first item in the list.
 * If the list is empty, `undefined` is returned.
 *
 * @returns {Object} the first item, or `undefined` if the list is empty.
 * @api public
 */

List.prototype.first = function first() {
  return this[0];
}


/**
 * Returns the last item in the list.
 * If the list is empty, `undefined` is returned.
 *
 * @returns {Object} the last item, or `undefined` if the list is empty.
 * @api public
 */

List.prototype.last = function last() {
  return this.length
    ? this[this.length - 1]
    : undefined;
}


/**
 * Returns a new list of non-duplicate items found with the instance list.
 * Duplicates are determined with strict equality.
 *
 * @returns {List} new List
 * @api public
 */

List.prototype.unique = function unique() {
  var uniq = new List;
  this.forEach(function(item, i, ls) {
    if (!uniq.contains(item)) uniq.add(item);
  });
  return uniq;
}


/**
 * Returns a new list of values present in both the list and in the
 * passed iterable.
 *
 * @param {iterable} list
 * @returns {List} new List
 * @api public
 */

List.prototype.intersect = function intersect(list) {
  var ls = new List;
  if (!(list instanceof List)) list = new List(list);
  this.forEach(function(val) {
    if (!ls.contains(val) && list.contains(val))
      ls.add(val);
  });
  return ls;
}


/**
 * Returns the maximum value from the list.
 * If the optional comparer function is passed, the value returned from it
 * will be used to determine maximum value.
 *
 * @param {Function} comparer optional
 * @returns {Object}
 * @api public
 */

List.prototype.max = function max(comparer) {
  if (!this.length) return;
  if (comparer == null) {
    return this.reduce(function(a, b) {
      return +a >= +b ? a : b;
    });
  }

  var max;
  return this.reduce(function(a, b) {
    max = comparer(a, b);
    return max >= 0 ? a : b;
  });
}


/**
 * Returns the minimum value from the list.
 * If the optional comparer function is passed, the value returned from it
 * will be used to determine maximum value.
 *
 * @param {Function} comparer optional
 * @returns {Object}
 * @api public
 */

List.prototype.min = function min(comparer) {
  if (!this.length) return;
  if (comparer == null) {
    return this.reduce(function(a, b) {
      return +a <= +b ? a : b;
    });
  }

  var min;
  return this.reduce(function(a, b) {
    min = comparer(a, b);
    return min <= 0 ? a : b;
  });
}



//
// Instance Functions - SUB-LISTS
// ========================================================
//


/**
 * Returns the first `howmany` contiguous items from the list.
 *
 * @param {Number} howmany
 * @returns {List} new List
 * @api public
 */

List.prototype.take = function take(howmany) {
  if (typeof howmany !== 'number') throw new TypeError;
  if (howmany < 0) howmany = 0;
  return this.slice(0, howmany);
}


/**
 * Returns a new list of contiguous items, starting at the beginning of
 * the list, so long as the iterator function returns true.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List
 * @api public
 */

List.prototype.takeWhile = function takeWhile(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var take = new List;
  this.some(function(val, i, ls) {
    if (!!iterator.call(context, val, i, ls)) {
      take.add(val);
      return false;
    }
    return true
  });
  return take;
}


/**
 * Returns a list of contiguous items, dropping the first `howmany` items
 * from the instance list.
 *
 * @param {Number} howmany
 * @returns {List} new List
 * @api public
 */

List.prototype.drop = function drop(howmany) {
  if (typeof howmany !== 'number') throw new TypeError;
  if (howmany < 0) howmany = 0;
  return this.slice(howmany);
}


/**
 * Returns a new list of contiguous items, starting from the first item
 * in the instance list that fails the passed iterator function.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List
 * @api public
 */

List.prototype.dropWhile = function dropWhile(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var index = 0;
  this.every(function(val, i, ls) {
    if (!iterator.call(context, val, i, ls)) {
      index = i;
      return false
    }
    return true;
  });
  return this.slice(index);
}


/**
 * Returns a hash of sublists, grouped either by equality to each other
 * or by the result of the optional iterator function.
 *
 * @param {Object} context optional
 * @param {Function} iterator optional
 * @returns {Object} hash of sublists
 * @api public
 */

List.prototype.group = function group(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  return this.reduce({}, function(group, val, i, ls) {
    var key = iterator != null
      ? iterator.call(context, val, i, ls)
      : val;
    if (group[key] == null) group[key] = new List;
    group[key].add(val);
    return group;
  });
}



//
// Instance Functions - INDEXING
// ========================================================
//

List.prototype.indexOf     = ArrProto.indexOf;
List.prototype.lastIndexOf = ArrProto.lastIndexOf;

/**
 * Returns the index of the first item in the list to pass the iterator test.
 *
 * @param {Number} index optional
 * @param {Object} context optional
 * @param {Function}
 * @returns {Number} index of first matching item, or -1 if not found
 */

List.prototype.indexIf = function indexIf(index, context, iterator) {
  switch (arguments.length) {
    case 2:
      iterator = arguments[1];
      context  = null;
      break;
    case 1:
      iterator = arguments[0];
      context  = null;
      index    = null;
  }
  var len = this.length;
  if (!len) return -1;
  index = util.determineSearchIndex(index, len);
  for (; index < len; index++)
    if (!!iterator.call(context, this[index], index, this)) return index;
  return -1;
}


/**
 * Returns the index of the last item in the list to pass the iterator test.
 *
 * @param {Number} index optional
 * @param {Object} context optional
 * @param {Function}
 * @returns {Number} index of first matching item, or -1 if not found
 */

List.prototype.lastIndexIf = function lastIndexIf(index, context, iterator) {
  switch (arguments.length) {
    case 2:
      iterator = arguments[1];
      context  = null;
      break;
    case 1:
      iterator = arguments[0];
      context  = null;
      index    = null;
  }
  var len = this.length;
  if (!len) return -1;
  index = util.determineLastSearchIndex(index, len);
  while (index--)
    if (!!iterator.call(context, this[index], index, this)) return index;
  return -1;
}


/**
 * Returns the indices of every item in the list matching the passed value.
 *
 * @param {Object} Value to search for.
 * @param {Number} Optional. Index to start search from.
 * @returns {List} List of indexes for each occurence of value.
 * @api public
 */

List.prototype.indicesOf = function indicesOf(value, index) {
  var len     = this.length;
  var indices = new List;
  if (!len) return indices;
  var index = util.determineSearchIndex(index, len);
  for (; index < len; index++) {
    index = this.indexOf(value, index);
    if (!~index) break;
    indices.add(index);
  }
  return indices;
}


/**
 * Returns the indices of the every item in the list passing the iterator test.
 *
 *    ls.indicesIf(function(){});
 *    ls.indicesIf(4, function(){});
 *    ls.indicesIf(null, {yo:'joe'}, function(){});
 *
 * @param {Number} Optional. Index to start search from.
 * @param {Object} Optional. Object to be used as `this` within the iterator function.
 * @param {Function} Iterator function. Must return true/false.
 * @returns {List} List of indexes for each occurence of value.
 * @api public
 */

List.prototype.indicesIf = function indicesIf(index, context, iterator) {
  switch (arguments.length) {
    case 2:
      iterator = arguments[1];
      context  = null;
      break;
    case 1:
      iterator = arguments[0];
      context  = null;
      index    = 0;
  }
  var len     = this.length;
  var indices = new List;
  if (!len) return indexes;
  var index = util.determineSearchIndex(index, len);
  for (; index < len; index++) {
    if (!!iterator.call(context, this[index], index, this))
      indices.add(index);
  }
  return indices;
}



//
// Instance Functions - ITERATORS
// ========================================================
//


/**
 * Iterates over the items in the list,
 * invoking the passed function each time.
 *
 * @param {Object} context optional
 * @param {Function} iterator callback
 * @returns {List} this
 * @api public
 */

List.prototype.forEach = function forEach(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  _forEach.call(this, iterator, context);
  return this;
}


/**
 * @param {Object} context optional
 * @param {Function} iterator test
 * @returns {Boolean}
 * @api public
 */

List.prototype.some = function some(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  return _some.call(this, iterator, context);
}


/**
 * @param {Object} context optional
 * @param {Function} iterator test
 * @returns {Boolean}
 * @api public
 */

List.prototype.every = function every(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  return _every.call(this, iterator, context);
}


/**
 * Reduces the list into a single accumulated value.
 * Left to right.
 *
 * @param {Object} initval optional
 * @param {Function} iterator callback
 * @returns {Object} accumulated value
 * @api public
 */

List.prototype.reduce = function reduce(initval, iterator) {
  var args = arguments.length >= 2
    ? [iterator, initval]
    : [arguments[0]];
  if (!this.length && arguments.length < 2)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduce.apply(this, args);
}

/**
 * Reduces the list into a single accumulated value.
 * Right to left.
 *
 * @param {Function} iterator callback
 * @param {Object} optional initial value
 * @returns {Object} accumulated value
 */

List.prototype.reduceRight = function reduceRight(initval, iterator) {
  var args = arguments.length >= 2
    ? [iterator, initval]
    : [arguments[0]];
  if (!this.length && arguments.length < 2)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduceRight.apply(this, args);
}


/**
 * Returns an array containing two list. The first list is composed of the
 * items passing the iterator test. The second list is composed of those
 * that failed it.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {Array} two lists,
 *  the first composed of items passing the iterator test,
 *  the second those that failed it
 * @api public
 */

List.prototype.partition = function partition(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var a = new List;
  var b = new List;
  this.forEach(function(val, i, ls) {
    !!iterator.call(context, val, i, ls)
      ? a.add(val)
      : b.add(val);
  });
  return [a, b];
}



//
// Instance Functions - TRANSFORMATION
// ========================================================
//


/**
 * Returns a new, sorted list of the instance's items.
 * Numeric types (numbers, dates) are sorted numerically.
 * Other types are sorted lexicographically.
 * If a function is passed, that is used to determine sort order.
 *
 * @param {Function} optional
 * @returns {List} new List
 * @api public
 */

List.prototype.sort = function sort(comparer) {
  if (this.length <= 1) return this.clone();

  if (comparer != null) {
    var arr = this.toArray();
    arr.sort(comparer);
    return new List(arr);
  }

  // Split items into 3 arrays:
  //  - numeric
  //  - boolean
  //  - everything else
  var parts = this.reduce([[],[],[]], function(pts, val) {
    if (util.isNumeric(val))
      pts[0].push(val);
    else if (typeof val === 'boolean' || val instanceof Boolean)
      pts[1].push(val);
    else
      pts[2].push(val);
    return pts;
  });
  // Numerics
  parts[0].sort(function(a, b) {
    return a - b;
  });
  // Booleans
  parts[1].sort(function(a, b) {
    return a - b;
  });
  // Everything else
  parts[2].sort();

  return new List()
    .addRange(parts[0])
    .addRange(parts[1])
    .addRange(parts[2]);
}


/**
 * Returns a new list of the instance's of items with their order reversed.
 *
 * @returns {List} new List
 * @api public
 */

List.prototype.reverse = function reverse() {
  var ls = this.clone();
  if (this.length <= 1) return ls;
  return _reverse.call(ls);
}


/**
 * Returns a new list composed of items that pass the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List
 * @api public
 */

List.prototype.filter = function filter(context, iterator) {
  if (!this.length) return new List;
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var filtered = _filter.call(this, iterator, context);
  return new List(filtered);
}


/**
 * Returns a new list composed of items that fail the iterator test.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List
 * @api public
 */

List.prototype.reject = function reject(context, iterator) {
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var result = new List;
  this.forEach(this, function(val, i) {
    if (!iterator.call(context, val, i, this)) result.add(val);
  });
  return result;
}


/**
 * Creates a new list of values determined by the iterator function.
 *
 * @param {Object} context optional
 * @param {Function} iterator
 * @returns {List} new List
 * @api public
 */

List.prototype.map = function map(context, iterator) {
  if (!this.length) return new List;
  if (arguments.length < 2) {
    iterator = arguments[0];
    context  = null;
  }
  var arr = _map.call(this, iterator, context);
  return new List(arr);
}


/**
 * Inserts the passed item between every element in the list.
 *
 * @param {Object} obj
 * @returns {List} new List
 * @api public
 */

List.prototype.intersperse = function intersperse(obj) {
  return this.reduce(new List, function(ls, val, index) {
    if (index)
      ls.add(obj, val);
    else
      ls.add(val);
    return ls;
  });
}



//
// Static Functions
// ========================================================
//


/**
 * Returns a `List` of numbers from `start` up to and including `end`.
 * If only `start` is passed, a list of numbers ranging from `0` through
 * `start` will be returned. If the optional `step` parameter is passed,
 * that will be used as the incrementing value. The default is `1`.
 *
 * @params {Number} start
 * @params {Number} end optional
 * @params {Number} step optional
 * @returns {List}
 * @api public
 */

List.range = function range(start, end, step) {
  var arglen = arguments.length;
  var ls     = new List;
  if (!arglen) return ls;
  if (arglen === 1) {
    end   = start;
    start = 0;
  }
  step = step != null ? Math.abs(step) : 1;
  if (step <= 0)
    throw new TypeError('Step increment must be greater than zero');
  while (start <= end) {
    ls.add(start);
    start += step;
  }
  return ls;
};

