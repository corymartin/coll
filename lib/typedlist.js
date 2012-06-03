
var util = require('./util');



var ArrProto     = Array.prototype;
var _forEach     = ArrProto.forEach;
var _reduce      = ArrProto.reduce;
var _reduceRight = ArrProto.reduceRight;
var _filter      = ArrProto.filter;
var _map         = ArrProto.map;
var _splice      = ArrProto.splice;
var _unshift     = ArrProto.unshift;
var _slice       = ArrProto.slice;
var _sort        = ArrProto.sort;

var ObjProto  = Object.prototype;
var _toString = ObjProto.toString;



/*
 * Expose `TypedList`
 */
module.exports.TypedList = TypedList;



/**
 * TypedList
 * =========
 * A typed, indexed list of items with methods for manipulating, iterating,
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
 * @param {String|Function} type
 * @param {iterable} iterable optional
 * @returns {TypedList}
 */

function TypedList(type, iterable) {
  if (type === undefined)
    throw new TypeError('Parameter `type` is required');

  if (!(this instanceof TypedList))
    return new TypedList(type, iterable);

  Object.defineProperty(this, 'type', {
    value      : type,
    writable   : false,
    enumerable : true
  });

  this.length = 0;

  if (iterable != null)
    this.addRange(iterable);
}


/**
 * List length.
 * @api public
 */

Object.defineProperty(TypedList.prototype, 'length', {
  value         : 0,
  writable      : true,
  enumerable    : true,
  configuruable : false
});


/**
 * @override
 * @param {String|Function} type optional
 * @returns {TypedList} new List
 * @api private
 */

Object.defineProperty(TypedList.prototype, '_new', {
  value: function _new(type) {
    type = type || this.type;
    return new TypedList(type);
  },
  writable   : false,
  enumerable : false
});


/**
 * @param {Object}
 * @api private
 */

Object.defineProperty(TypedList.prototype, '_checkType', {
  value: function _checkType(obj) {
    if (!util.isType(this.type, obj))
      util.throwTypeError(this.type);
  },
  writable   : false,
  enumerable : false
});


/**
 * @param {iterable}
 * @param {Number} index optional start index
 * @api private
 */

Object.defineProperty(TypedList.prototype, '_checkTypeEvery', {
  value: function _checkTypeEvery(arr, index) {
    if (!util.isTypeEvery(this.type, arr, index))
      util.throwTypeError(this.type);
  },
  writable   : false,
  enumerable : false
});



//
// Instance Functions - Borrowed directly from Array
// ========================================================
//

TypedList.prototype.pop         = ArrProto.pop;
TypedList.prototype.shift       = ArrProto.shift;
TypedList.prototype.reverse     = ArrProto.reverse;
TypedList.prototype.join        = ArrProto.join;
TypedList.prototype.some        = ArrProto.some;
TypedList.prototype.every       = ArrProto.every;
TypedList.prototype.indexOf     = ArrProto.indexOf;
TypedList.prototype.lastIndexOf = ArrProto.lastIndexOf;



//
// Instance Functions - MUTATORS
// ========================================================
//


/**
 * PRIVATE - internal use only.
 * Appends one or more items to the end of the list without type checking.
 *
 * @param {Object} n items to add to list
 * @returns (TypedList} this
 * @api private
 */

TypedList.prototype._add = function _add() {
  var i   = 0;
  var len = arguments.length;
  for (; i < len; i++) this[this.length++] = arguments[i];
  return this;
}


/**
 * Adds one or more items to the end of the list.
 *
 * @param {Object} n items to append to list
 * @returns {Number} length of list
 * @api public
 */

TypedList.prototype.push = function push() {
  this.addRange(arguments);
  return this.length;
}


/**
 * Adds one or more items to the beginning of the list.
 *
 * @param {Object} n items prepended to list
 * @returns {Number} length of list
 * @api public
 */

TypedList.prototype.unshift = function unshift() {
  this._checkTypeEvery(arguments);
  return _unshift.apply(this, arguments);
}


/**
 * Sorts/reorders the items in the list.
 * Numeric types (numbers, dates) are sorted numerically.
 * Other types are sorted lexicographically.
 * If a function is passed, that is used to determine sort order.
 *
 * @param {Function} optional
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.sort = function sort(comparer) {
  if (comparer != null) return _sort.call(this, comparer);
  switch (this.type) {
    case Date:
    case 'Date':
      return _sort.call(this, function(a, b) {
        return a.getTime() - b.getTime();
      });
    case Number:
    case 'Number':
      return _sort.call(this, function(a, b) {
        return a - b;
      });
    default:
      return _sort.call(this);
  }
}


/**
 * Adds/removes items from list.
 *
 * @param {Number} index
 * @param {Number} how many to remove
 * @param {Object} n items to insert into list
 * @returns {TypedList} new TypedList of removed items
 * @api public
 */

TypedList.prototype.splice = function splice() {
  if (arguments.length >= 3)
    this._checkTypeEvery(arguments, 2);
  var removed = _splice.apply(this, arguments);
  var ls      = this._new();
  _forEach.call(removed, function(val) {
    ls._add(val);
  });
  return ls;
}


/**
 * Removes all items from the list instance.
 *
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.clear = function clear() {
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

TypedList.prototype.set = function set(index, obj) {
  //TODO: Throw RangeError. Undef logic seems inconsistent.
  if (!(index in this) || obj === undefined) return false;
  this._checkType(obj);
  this[index] = obj;
  return true;
}


/**
 * Appends a single new item to the end of the list.
 *
 * @param {Object} item to add
 * @returns {TypedList} this
 * @api public
 */
//TODO: Rename to append???
TypedList.prototype.add = function add(obj) {
  if (obj === undefined) return this;
  this._checkType(obj);
  this._add(obj);
  return this;
}


/**
 * Appends a range of new items to the end of the list.
 *
 * @param {iterable} iterable
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.addRange = function addRange(iterable) {
  if (iterable == null) return this;
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
 * @returns {TypedList} this
 * @api public
 */
//TODO: return type and methodology not consistent with other methods.
TypedList.prototype.insert = function insert(index, obj) {
  if (index == null || obj === undefined) return this;
  this._checkType(obj);
  _splice.call(this, index, 0, obj);
  return this;
}


/**
 * Inserts a range of new items starting at the specifed index.
 *
 * @param {Number} index
 * @param {iterable} items
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.insertRange = function insertRange(index, iterable) {
  if (index == null
    || iterable == null
    || !iterable.length) return this;
  this._checkTypeEvery(iterable);
  var args = [index, 0];
  _forEach.call(iterable, function(val) {
    args.push(val);
  });
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

TypedList.prototype.remove = function remove(item, index) {
  index = this.indexOf(item, index);
  return !~index
    ? undefined
    : this.removeAt(index);
}


/**
 * Removes the first item in the list to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Boolean} `true` if the item is removed, `false` otherwise.
 * @api public
 */

TypedList.prototype.removeIf = function removeIf(iterator, context) {
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

TypedList.prototype.removeAll = function removeAll(iterator, context) {
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

TypedList.prototype.removeAt = function removeAt(index, howMany) {
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

TypedList.prototype.replace = function replace(olditem, newitem, index) {
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

TypedList.prototype.replaceIf = function replaceIf(iterator, newitem, context) {
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

TypedList.prototype.replaceAll = function replaceAll(iterator, newitem, context) {
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

TypedList.prototype.replaceAt = function replaceAt(index, newitem) {
  if (index >= 0 || this.length + index >= 0)
    index = util.determineSearchIndex(index, this.length);
  if (!(index in this)) throw new RangeError;
  this._checkType(newitem);
  var replaced = this[index];
  this[index] = newitem;
  return replaced;
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
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.slice = function slice(begin, end) {
  var arr = begin == null
    || (begin === 0 && (end == null || end === this.length))
    ? this
    : _slice.call(this, begin, end);
  var ls = this._new();
  _forEach.call(arr, function(val) {
    ls._add(val);
  });
  return ls;
}


/**
 * Joins the list with one or more other iterable objects.
 *
 * @param {iterable} n iterables to concatenate
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.concat = function concat() {
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

TypedList.prototype.count = function count(obj) {
  if (obj === undefined) return this.length;
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

TypedList.prototype.countIf = function countIf(iterator, context) {
  return this.indicesIf(iterator, 0, context).length;
}


/**
 * Determines if the passed item is in the list.
 *
 * @param {Object} obj
 * @returns {Boolean} true if the item is in the list, false otherwise
 * @api public
 */

TypedList.prototype.contains = function contains(obj) {
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

TypedList.prototype.find = function find(iterator, context) {
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

TypedList.prototype.findLast = function findLast(iterator, context) {
  var i = this.lastIndexIf(iterator, null, context);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns every item to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @return {TypedList} new TypedList of all values passing the iterator test
 * @api public
 */

TypedList.prototype.findAll = function findAll(iterator, context) {
  var indexes = this.indicesIf(iterator, 0, context);
  var values  = this._new();
  if (indexes.length) {
    _forEach.call(indexes, function(i) {
      values._add(this[i]);
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

TypedList.prototype.toArray = function toArray() {
  return _slice.call(this);
}


/**
 * Returns a copy of the list.
 *
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.clone = function clone() {
  var ls = this._new();
  if (!this.length) return ls;
  this.forEach(function(val) {
    ls._add(val);
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

TypedList.prototype.get = function get(index) {
  return this[index];
}


/**
 * Returns the first item in the list.
 * If the list is empty, `undefined` is returned.
 *
 * @returns {Object} the first item, or `undefined` if the list is empty.
 * @api public
 */

TypedList.prototype.first = function first() {
  return this[0];
}


/**
 * Returns the last item in the list.
 * If the list is empty, `undefined` is returned.
 *
 * @returns {Object} the last item, or `undefined` if the list is empty.
 * @api public
 */

TypedList.prototype.last = function last() {
  return this.length
    ? this[this.length - 1]
    : undefined;
}


/**
 * Returns a new list of non-duplicate items found with the instance list.
 * Duplicates are determined with strict equality.
 *
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.unique = function unique() {
  var uniq = this._new();
  this.forEach(function(item, i, ls) {
    if (!uniq.contains(item)) uniq._add(item);
  });
  return uniq;
}


/**
 * Returns a new list of values present in both the list and in the
 * passed iterable.
 *
 * @param {TypedList} list
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.intersect = function intersect(list) {
  var ls = this._new();
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

TypedList.prototype.max = function max(comparer, context) {
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

TypedList.prototype.min = function min(comparer, context) {
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
 * @returns {TypedList} new List
 * @api public
 */

TypedList.prototype.take = function take(howMany) {
  if (howMany == null || isNaN(howMany = +howMany))
    throw new TypeError;
  if (howMany < 0) howMany = 0;
  return this.slice(0, howMany);
}


/**
 * Returns a new list of contiguous items, starting at the beginning of
 * the list, so long as the iterator function returns true.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedList} new List
 * @api public
 */

TypedList.prototype.takeWhile = function takeWhile(iterator, context) {
  var take = this._new();
  this.some(function(val, i, ls) {
    if (!!iterator.call(context, val, i, ls)) {
      take._add(val);
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
 * @returns {TypedList} new List
 * @api public
 */

TypedList.prototype.drop = function drop(howMany) {
  if (howMany == null || isNaN(howMany = +howMany))
    throw new TypeError;
  if (howMany < 0) howMany = 0;
  return this.slice(howMany);
}


/**
 * Returns a new list of contiguous items, starting from the first item
 * in the instance list that fails the passed iterator function.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedList} new List
 * @api public
 */

TypedList.prototype.dropWhile = function dropWhile(iterator, context) {
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

TypedList.prototype.group = function group(iterator, context) {
  var group = {};
  this.forEach(function(val, i, ls) {
    var key = iterator != null
      ? iterator.call(context, val, i, ls)
      : val;
    if (group[key] == null) group[key] = this._new();
    group[key].add(val);
  }, this);
  return group;
}



//
// Instance Functions - INDEXING
// ========================================================
//


/**
 * Returns the index of the first item in the list to pass the iterator test.
 *
 * @param {Function} callback test iterator
 * @param {Number} optional starting index
 * @param {Object} optional context for callback
 * @returns {Number} index of first matching item, or -1 if not found
 */

TypedList.prototype.indexIf = function indexIf(iterator, index, context) {
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

TypedList.prototype.lastIndexIf = function lastIndexIf(iterator, index, context) {
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

TypedList.prototype.indicesOf = function indicesOf(value, index) {
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

TypedList.prototype.indicesIf = function indicesIf(iterator, index, context) {
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
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.forEach = function forEach(iterator, context) {
  _forEach.call(this, iterator, context);
  return this;
}


/**
 * Reduces the list into a single accumulated value.
 * Left to right.
 *
 * @param {Function} iterator callback
 * @param {Object} initVal optional
 * @returns {Object} accumulated value
 * @api public
 */

TypedList.prototype.reduce = function reduce(iterator, initVal) {
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

TypedList.prototype.reduceRight = function reduceRight(iterator, initVal) {
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

TypedList.prototype.partition = function partition(iterator, context) {
  var a = this._new();
  var b = this._new();
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
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.filter = function filter(iterator, context) {
  var ls       = this._new();
  var filtered = _filter.call(this, iterator, context);
  return ls.addRange(filtered);
}


/**
 * Returns a new list composed of items that fail the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.reject = function reject(iterator, context) {
  var result = this._new();
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
 * @param {String|Function} type optional new type of returned list
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.map = function map(iterator, context, type) {
  var ls = this._new(type);
  if (!this.length) return ls;
  var arr = _map.call(this, iterator, context);
  return ls.addRange(arr);
}


/**
 * Inserts the passed item between every element in the list.
 *
 * @param {Object} obj
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.intersperse = function intersperse(obj) {
  this._checkType(obj);
  return this.reduce(function(ls, val, index) {
    if (index)
      ls._add(obj, val);
    else
      ls._add(val);
    return ls;
  }, this._new());
}


