
var util = require('./util');



var ArrProto     = Array.prototype;
var _forEach     = ArrProto.forEach;
var _reduce      = ArrProto.reduce;
var _reduceRight = ArrProto.reduceRight;
var _filter      = ArrProto.filter;
var _map         = ArrProto.map;
var _splice      = ArrProto.splice;
var _slice       = ArrProto.slice;
var _sort        = ArrProto.sort;
var _shift       = ArrProto.shift;
var _pop         = ArrProto.pop;

var ObjProto  = Object.prototype;
var _toString = ObjProto.toString;




/*
 * Expose `List`
 */
module.exports.List = List;



/**
 * List
 * =========
 * An indexed list of items with methods for manipulating, iterating,
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
// Instance Functions - Borrowed directly from Array
// ========================================================
//

List.prototype.reverse     = ArrProto.reverse;
List.prototype.join        = ArrProto.join;



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
 * Appentds one or more items to the end of the list.
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
 * @returns {Object} the removed item
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
 * Removes the first item in the list to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Boolean} `true` if the item is removed, `false` otherwise.
 * @api public
 */

List.prototype.removeIf = function removeIf(iterator, context) {
  var index = this.indexIf(iterator, 0, context);
  return !~index
    ? undefined
    : this.removeAt(index);
}


/**
 * Removes every item in the list that passes the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Number} the number of items removed from the list.
 * @api public
 */

List.prototype.removeAll = function removeAll(iterator, context) {
  var len = this.length;
  var removed = [];
  if (!len) return removed;
  var index = 0;
  for (;index < len; index++) {
    index = this.indexIf(iterator, index, context);
    if (!~index) break;
    removed = removed.concat( this.removeAt(index) );
    --len;
  }
  return removed;
}


/**
 * Removes an item at a given index. If the optional `howMany` parameter is
 * passed, a range of items is removed startng at the index.
 *
 * @param {Number} index
 * @param {Number} howMany optional
 * @returns {Object|Array} the items removed from the list
 * @api public
 */

List.prototype.removeAt = function removeAt(index, howMany) {
  if (index >= 0 || this.length + index >= 0)
    index = util.determineSearchIndex(index, this.length);
  if (!(index in this)) throw new RangeError;
  if (howMany == null) howMany = 1;
  var removed = _splice.call(this, index, howMany);
  return removed.length === 1
    ? removed[0]
    : removed;
}


/**
 * Replaces the first occurence of `olditem` with `newitem`
 *
 * @param {Object} olditem
 * @param {Object} newitem
 * @param {Number} index optional
 * @returns {Boolean} `true` if the item was replaced, `false` otherwise.
 * @api public
 */

List.prototype.replace = function replace(olditem, newitem, index) {
  index = this.indexOf(olditem, index);
  return !~index
    ? false
    : !!this.replaceAt(index, newitem);
}


/**
 * Replaces the first item in the list to pass the iterator test
 * with `newitem`
 *
 * @param {Function} iterator
 * @param {Object} newitem
 * @param {Object} context optional
 * @returns {Boolean} `true` if the item was replaced, `false` otherwise.
 * @api public
 */

List.prototype.replaceIf = function replaceIf(iterator, newitem, context) {
  var index = this.indexIf(iterator, 0, context);
  return !~index
    ? false
    : !!this.replaceAt(index, newitem);
}


/**
 * Replaces every item in the list that passes the iterator test
 * with `newitem`
 *
 * @param {Function} iterator
 * @param {Object} newitem
 * @param {Object} context optional
 * @returns {Boolean} `true` if the item was replaced, `false` otherwise.
 * @api public
 */

List.prototype.replaceAll = function replaceAll(iterator, newitem, context) {
  var len = this.length;
  var replaced = false;
  if (!len) return replaced;
  var index = 0;
  for (;index < len; index++) {
    index = this.indexIf(iterator, index, context);
    if (!~index) break;
    replaced = !!this.replaceAt(index, newitem);
    --len;
  }
  return replaced;
}


/**
 * Replaces an item at a given index with `newitem`
 *
 * @param {Number} index
 * @param {Object} newitem
 * @returns {Object} the replaced item.
 * @api public
 */

List.prototype.replaceAt = function replaceAt(index, newitem) {
  if (index >= 0 || this.length + index >= 0)
    index = util.determineSearchIndex(index, this.length);
  if (!(index in this)) throw new RangeError;
  var replaced = this[index];
  this[index] = newitem;
  return replaced;
}


/**
 * Sorts the items in the list.
 * Numeric types (numbers, dates) are sorted numerically.
 * Other types are sorted lexicographically.
 * If a function is passed, that is used to determine sort order.
 *
 * @param {Function} optional
 * @returns {List} this
 * @api public
 */

List.prototype.sort = function sort(comparer) {
  if (this.length <= 1) return this;
  if (comparer != null)
    return _sort.call(this, comparer);

  var isnumeric = this.every(function(val) {
    return typeof val === 'number'
      || val instanceof Date
      || val instanceof Number
      || (val !== null && typeof val !== 'string' && !isNaN(val));
  });

  if (isnumeric) {
    return _sort.call(this, function(a, b) {
      return a - b;
    });
  }
  else
    return _sort.call(this);
}



//
// Instance Functions - ACCESSORS
// ========================================================
//


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
 * If not argument is supplied, the list's length is returned.
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
 * @param {Function} iterator
 * @param {Object} context optional
 * @api public
 */

List.prototype.countIf = function countIf(iterator, context) {
  return this.indicesIf(iterator, 0, context).length;
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
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Object}
 *  the first item to pass the iterator test, otherwise `undefined`
 * @api public
 */

List.prototype.find = function find(iterator, context) {
  var i = this.indexIf(iterator, 0, context);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns the last item to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Object}
 *  the first item from the end of the list to pass the iterator test,
 *  otherwise `undefined`
 * @api public
 */

List.prototype.findLast = function findLast(iterator, context) {
  var i = this.lastIndexIf(iterator, null, context);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns every item to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @return {List} new List of all values passing the iterator test
 * @api public
 */

List.prototype.findAll = function findAll(iterator, context) {
  var indexes = this.indicesIf(iterator, 0, context);
  var values  = new List;
  if (indexes.length) {
    _forEach.call(indexes, function(i) {
      values.add(this[i]);
    }, this);
  }
  return values;
}


/**
 * Copies the items in the list to an `Array` and returns the it.
 *
 * @returns {Array} an array of the list's contents
 * @api public
 */

List.prototype.toArray = function toArray() {
  return _slice.call(this);
}


/**
 * Returns a copy of the list.
 *
 * @returns {List} new List
 * @api public
 */

List.prototype.clone = function clone() {
  if (!this.length) return new List;
  return this.slice();
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
 * @param {List} list
 * @returns {List} new List
 * @api public
 */

List.prototype.intersect = function intersect(list) {
  var ls = new List;
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
 * @param {Object} context optional
 * @returns {Object}
 * @api public
 */

List.prototype.max = function max(comparer, context) {
  if (!this.length) return;
  if (comparer == null) {
    return this.reduce(function(a, b) {
      return +a >= +b ? a : b;
    });
  }

  var max;
  return this.reduce(function(a, b) {
    max = comparer.call(context, a, b);
    return max >= 0 ? a : b;
  });
}


/**
 * Returns the minimum value from the list.
 * If the optional comparer function is passed, the value returned from it
 * will be used to determine maximum value.
 *
 * @param {Function} comparer optional
 * @param {Object} context optional
 * @returns {Object}
 * @api public
 */

List.prototype.min = function min(comparer, context) {
  if (!this.length) return;
  if (comparer == null) {
    return this.reduce(function(a, b) {
      return +a <= +b ? a : b;
    });
  }

  var res;
  return this.reduce(function(a, b) {
    res = comparer.call(context, a, b);
    return res <= 0 ? a : b;
  });
}



//
// Instance Functions - SUB-LISTS
// ========================================================
//


/**
 * Returns the first `howMany` contiguous items from the list.
 *
 * @param {Number} howMany
 * @returns {List} new List
 * @api public
 */

List.prototype.take = function take(howMany) {
  if (typeof howMany !== 'number') throw new TypeError;
  if (howMany < 0) howMany = 0;
  return this.slice(0, howMany);
}


/**
 * Returns a new list of contiguous items, starting at the beginning of
 * the list, so long as the iterator function returns true.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {List} new List
 * @api public
 */

List.prototype.takeWhile = function takeWhile(iterator, context) {
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
 * Returns a list of contiguous items, dropping the first `howMany` items
 * from the instance list.
 *
 * @param {Number} howMany
 * @returns {List} new List
 * @api public
 */

List.prototype.drop = function drop(howMany) {
  if (typeof howMany !== 'number') throw new TypeError;
  if (howMany < 0) howMany = 0;
  return this.slice(howMany);
}


/**
 * Returns a new list of contiguous items, starting from the first item
 * in the instance list that fails the passed iterator function.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {List} new List
 * @api public
 */

List.prototype.dropWhile = function dropWhile(iterator, context) {
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
 * @param {Function} iterator optional
 * @param {Object} context optional
 * @returns {Object} hash of sublists
 * @api public
 */

List.prototype.group = function group(iterator, context) {
  var group = {};
  this.forEach(function(val, i, ls) {
    var key = iterator != null
      ? iterator.call(context, val, i, ls)
      : val;
    if (group[key] == null) group[key] = new List;
    group[key].add(val);
  }, this);
  return group;
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
 * @param {Function} callback test iterator
 * @param {Number} optional starting index
 * @param {Object} optional context for callback
 * @returns {Number} index of first matching item, or -1 if not found
 */

List.prototype.indexIf = function indexIf(iterator, index, context) {
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
 * @param {Object} item to find
 * @param {Number} optional starting index
 * @returns {Number} index of first matching item, or -1 if not found
 */

List.prototype.lastIndexIf = function lastIndexIf(iterator, index, context) {
  var len = this.length;
  if (!len) return -1;
  index = util.determineLastSearchIndex(index, len);
  while (index--)
    if (!!iterator.call(context, this[index], index, this)) return index;
  return -1;
}


/**
 * Returns the indices of the every item in the list matching the passed value.
 *
 * @param {Object} Value to search for.
 * @param {Number} Optional. Index to start search from.
 * @returns {Array} Array of indexes for each occurence of value.
 * @api public
 */

List.prototype.indicesOf = function indicesOf(value, index) {
  var len     = this.length;
  var indices = [];
  if (!len) return indices;
  var index = util.determineSearchIndex(index, len);
  for (; index < len; index++) {
    index = this.indexOf(value, index);
    if (!~index) break;
    indices.push(index);
  }
  return indices;
}


/**
 * Returns the indices of the every item in the list passing the iterator test.
 *
 * @param {Function} Iterator function. Must return true/false.
 * @param {Number} Optional. Index to start search from.
 * @param {Object} Optional. Object to be used as `this` within the iterator function.
 * @returns {Array} Array of indexes for each occurence of value.
 * @api public
 */

List.prototype.indicesIf = function indicesIf(iterator, index, context) {
  var len     = this.length;
  var indices = [];
  if (!len) return indexes;
  var index = util.determineSearchIndex(index, len);
  for (; index < len; index++) {
    if (!!iterator.call(context, this[index], index, this))
      indices.push(index);
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
 * @param {Function} iterator callback
 * @param {Object} optional context
 * @returns {List} this
 * @api public
 */

List.prototype.forEach = function forEach(iterator, context) {
  _forEach.call(this, iterator, context);
  return this;
}

List.prototype.some        = ArrProto.some;
List.prototype.every       = ArrProto.every;

/**
 * Reduces the list into a single accumulated value.
 * Left to right.
 *
 * @param {Function} iterator callback
 * @param {Object} initVal optional
 * @returns {Object} accumulated value
 * @api public
 */

List.prototype.reduce = function reduce(iterator, initVal) {
  if (!this.length && initVal === undefined)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduce.apply(this, arguments);
}

/**
 * Reduces the list into a single accumulated value.
 * Right to left.
 *
 * @param {Function} iterator callback
 * @param {Object} optional initial value
 * @returns {Object} accumulated value
 */

List.prototype.reduceRight = function reduceRight(iterator, initVal) {
  if (!this.length && initVal === undefined)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduceRight.apply(this, arguments);
}


/**
 * Returns an array containing two list. The first list is composed of the
 * items passing the iterator test. The second list is composed of those
 * that failed it.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Array} two lists,
 *  the first composed of items passing the iterator test,
 *  the second those that failed it
 * @api public
 */

List.prototype.partition = function partition(iterator, context) {
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
 * Returns a new list composed of items that pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {List} new List
 * @api public
 */

List.prototype.filter = function filter(iterator, context) {
  var ls       = new List;
  var filtered = _filter.call(this, iterator, context);
  return ls.addRange(filtered);
}


/**
 * Returns a new list composed of items that fail the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {List} new List
 * @api public
 */

List.prototype.reject = function reject(iterator, context) {
  var result = new List;
  this.forEach(function(val, i) {
    if (!iterator.call(context, val, i, this)) result.add(val);
  }, this);
  return result;
}


/**
 * Creates a new list of values determined by the iterator function.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {List} new List
 * @api public
 */

List.prototype.map = function map(iterator, context) {
  if (!this.length) return new List;
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
  return this.reduce(function(ls, val, index) {
    if (index)
      ls.add(obj, val);
    else
      ls.add(val);
    return ls;
  }, new List);
}


