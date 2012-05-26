
var util = require('./util');



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





/**
 * @param {Object} obj
 * @param {String} type
 * @returns {Boolean}
 * @api private
 */

var _isType = function(obj, type) {
  if (type === 'Any') return true;
  //TODO: Allow null/undefined values???
  if (type == null) return false;

  return util.isFunction(type)
    ? obj instanceof type
    : _toString.call(obj) === '[object '+type+']';
}


/**
 * @param {Array} arr
 * @param {String} type
 * @param {Number} Optional. Index to start searching at.
 * @returns {Boolean}
 * @api private
 */

var _isTypeEvery = function(arr, type, index) {
  if (type === 'Any') return true;

  index >>>= 0;
  var len = arr.length;

  for (; index < len; index++)
    if (!_isType(arr[index], type)) return false;

  return true;
}


/**
 * @param {String} Actual type expected.
 * @api private
 */

var _typeError = function( type ) {
  if (type == null) throw new TypeError;
  var strType;
  if (util.isString(type))
    strType = type;
  else if (typeof type === 'function' && type.name != null)
    strType = type.name;
  else
    strType = _toString.call(type).slice(8, -1);
  throw new TypeError('Expected ' + strType);
}


var _checkType = function( obj, type ) {
  if (!_isType(obj, type)) _typeError(type);
}

var _functionError = function( obj ) {
  throw new TypeError(obj + ' is not a function');
}

var _checkFunction = function( obj ) {
  if (!util.isFunction(obj)) _functionError(obj);
}








/**
 * TypedList
 * =========
 *
 * @constructor
 * @extends {Array}
 * @param {String|Function} type
 * @param {Iterable} init optional
 * @returns {TypedList}
 */

function TypedList( type, init ) {
  if (type == null)
    throw new TypeError('Parameter `type` is required');

  if (!(this instanceof TypedList)) return new TypedList(type, init);

  Object.defineProperty(this, 'type', {
    value    : type,
    writable : false
  });

  if (init != null) this.addRange(init);
}
util.inherit(TypedList, Array);

module.exports.TypedList = TypedList;



/**
 * @override
 * @param {String|Function} type optional
 * @api private
 */

Object.defineProperty(TypedList.prototype, '_new', {
  value: function(type) {
    type = type || this.type;
    return new TypedList(type);
  }
});




//
// Instance Methods - MUTATORS
// ===========================
//

/**
 * Adds one or more items to the end of the list.
 *
 * @param {Mixed} n items to append to list
 * @returns {Number} length of list
 * @api public
 */

TypedList.prototype.push = function() {
  this.addRange(arguments);
  return this.length;
}


/**
 * Adds one or more items to the beginning of the list.
 *
 * @param {Mixed} n items prepended to list
 * @returns {Number} length of list
 * @api public
 */

TypedList.prototype.unshift = function() {
  if (!_isTypeEvery(arguments, this.type)) _typeError(this.type);
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

TypedList.prototype.sort = function(comparer) {
  if (comparer != null) return _sort.call(this, comparer);
  switch (this.type) {
    case Date:
    case 'Date':
      return _sort.call(this, function(a, b) {
        return a.getTime() > b.getTime();
      });
    case Number:
    case 'Number':
      return _sort.call(this, function(a, b) {
        return a > b;
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
 * @param {Mixed} n items to insert into list
 * @returns {TypedList} new TypedList of removed items
 * @api public
 */

TypedList.prototype.splice = function() {
  if (arguments.length >= 3 && !_isTypeEvery(arguments, this.type, 2))
    _typeError(this.type);
  var removed = _splice.apply(this, arguments);
  var ls      = this._new();
  _forEach.call(removed, function(val) {
    ls[ls.length++] = val;
  });
  return ls;
}


/**
 * Removes all items from the list instance.
 *
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.clear = function() {
  _splice.call(this, 0);
  return this;
}


/**
 * Set a list item at a particular index to a new value.
 *
 * @param {Number} index must exist within list
 * @param {Mixed} obj
 * @returns {Boolean} `true` if the item is set successfully,
 *  `false` otherwise.
 * @api public
 */

TypedList.prototype.set = function(index, obj) {
  if (!(index in this) || obj == null) return false;
  _checkType(obj, this.type);
  this[index] = obj;
  return true;
}


/**
 * Appends a single new item to the end of the list.
 *
 * @param {Mixed} item to add
 * @returns {TypedList} this
 * @api public
 */
//TODO: Rename to append???
TypedList.prototype.add = function(obj) {
  if (obj == null) return this;
  _checkType(obj, this.type);
  this[this.length++] = obj;
  return this;
}


/**
 * Appends a range of new items to the end of the list.
 *
 * @param {Iterable} items
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.addRange = function(items) {
  if (items == null) return this;
  var i   = 0;
  var len = items.length;
  for (; i < len; i++) this.add(items[i]);
  return this;
}


/**
 * Inserts a single new item at the specifed index.
 *
 * @param {Number} index
 * @param {Mixed} obj
 * @returns {TypedList} this
 * @api public
 */
//TODO: return type and methodology not consistent with other methods.
TypedList.prototype.insert = function(index, obj) {
  if (index == null || obj == null) return this;
  _checkType(obj, this.type);
  _splice.call(this, index, 0, obj);
  return this;
}


/**
 * Inserts a range of new items starting at the specifed index.
 *
 * @param {Number} index
 * @param {Iterable} items
 * @returns {TypedList} this
 * @api public
 */

TypedList.prototype.insertRange = function(index, items) {
  if (index == null || items == null || !items.length) return this;
  if (!_isTypeEvery(items, this.type)) _typeError(this.type);
  var args = [index, 0];
  _forEach.call(items, function(val) {
    args.push(val);
  });
  _splice.apply(this, args);
  return this;
}


/**
 * Removes the first occurence of the passed item in the list.
 * Uses strict equality.
 *
 * @param {Mixed} item
 * @param {Number} index optional
 * @returns {Boolean} `true` if the item is removed, `false` otherwise.
 * @api public
 */

TypedList.prototype.remove = function(item, index) {
  var index = this.indexOf(item, index);
  return !~index
    ? false
    : !!this.removeAt(index);
}


/**
 * Removes the first item in the list to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Boolean} `true` if the item is removed, `false` otherwise.
 * @api public
 */

TypedList.prototype.removeIf = function(iterator, context) {
  var index = this.indexIf(iterator, 0, context);
  return !~index
    ? false
    : !!this.removeAt(index);
}


/**
 * Removes every item in the list that passes the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Number} the number of items removed from the list.
 */

TypedList.prototype.removeAll = function(iterator, context) {
  var len = this.length;
  if (!len) return 0;
  var cnt   = 0;
  var index = 0;
  for (; index < len; index++) {
    index = this.indexIf(iterator, index, context);
    if (!~index) break;
    this.removeAt(index);
    ++cnt; --len;
  }
  return cnt;
}


/**
 * Removes an item at a given index. If the optional `howMany` parameter is
 * passed, a range of items is removed startng at the index.
 *
 * @param {Number} index
 * @param {Number} howMany optional
 * @returns {Number} the number of items removed from the list.
 * @api public
 */

TypedList.prototype.removeAt = function(index, howMany) {
  if (!this.length) return 0;
  if (index < 0 && this.length + index < 0) return 0;
  index = util.determineSearchIndex(index, this.length);
  if (howMany == null) howMany = 1;
  return _splice.call(this, index, howMany).length;
}



//
// Instance Methods - ACCESSORS
// ============================
//


/**
 * Extracts all or part of the list.
 *
 * @param {Number} begin optional
 * @param {Number} end optional
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.slice = function(begin, end) {
  var arr = begin == null
    || (begin === 0 && (end == null || end === this.length))
    ? this
    : _slice.call(this, begin, end);
  var ls = this._new();
  _forEach.call(arr, function(val) {
    ls[ls.length++] = val;
  });
  return ls;
}


/**
 * Joins the list with one or more other iterable objects.
 *
 * @param {Iterable} n iterables to concatenate
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.concat = function() {
  var len  = arguments.length;
  var copy = this.clone();
  if (!len) return copy;
  var i = -1;
  while (++i < len) copy.addRange(arguments[i]);
  return copy;
}


/**
 * Returns the number of occurences of the passed item within the list.
 * If not argument is supplied, the list's length is returned.
 *
 * @param {Mixed} obj optional
 * @returns {Number} the number of occurences of obj if passed,
 *  otherwise the list's length
 * @api public
 */

TypedList.prototype.count = function(obj) {
  if (obj == null) return this.length;
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

TypedList.prototype.countIf = function(iterator, context) {
  return this.indicesIf(iterator, 0, context).length;
}


/**
 * Determines if the passed item is in the list.
 *
 * @param {Mixed} obj
 * @returns {Boolean} true if the item is in the list, false otherwise
 * @api public
 */

TypedList.prototype.contains = function(obj) {
  return !!~this.indexOf(obj);
}


/**
 * Returns the first item to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Mixed}
 *  the first item to pass the iterator test, otherwise `undefined`
 * @api public
 */

TypedList.prototype.find = function(iterator, context) {
  var i = this.indexIf(iterator, 0, context);
  return i >= 0 ? this[i] : undefined;
}


/**
 * Returns the last item to pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {Mixed}
 *  the first item from the end of the list to pass the iterator test,
 *  otherwise `undefined`
 * @api public
 */

TypedList.prototype.findLast = function(iterator, context) {
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

TypedList.prototype.findAll = function(iterator, context) {
  var indexes = this.indicesIf(iterator, 0, context);
  var values  = this._new();
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

TypedList.prototype.toArray = function() {
  return _slice.call(this);
}


/**
 * Returns a copy of the list.
 *
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.clone = function() {
  var ls = this._new();
  if (!this.length) return ls;
  this.forEach(function(val) {
    ls[ls.length++] = val;
  });
  return ls;
}


/**
 * Returns the item at the specified index.
 *
 * @param {Number} index
 * @returns {Mixed} value at index
 * @api public
 */

TypedList.prototype.get = function(index) {
  return this[index];
}


/**
 * Returns the first item in the list.
 * If the optional `howMany` parameter is passed, it returns an array of the
 * first "howMany" values.
 *
 * @param {Number} howMany optional
 * @returns {Mixed} the first item, or
 *  if `howMany` is passed a new list of the first "howMany" items
 * @api public
 */

TypedList.prototype.first = function(howMany) {
  var len = this.length;
  if (howMany == null) {
    if (!len) return undefined;
    return this[0];
  }
  if (!len) return this._new();
  howMany = Math.abs(howMany) >>> 0;
  var i  = 0;
  var ls = this._new();
  for (; i < len && i < howMany; i++) ls.add(this[i]);
  return ls;
}


/**
 * Returns the last item in the list.
 * If the optional `howMany` parameter is passed, it returns an array of the
 * last "howMany" values.
 *
 * @param {Number} howMany optional
 * @returns {Mixed} the last item, or
 *  if `howMany` is passed a new list of the last "howMany" items
 * @api public
 */

TypedList.prototype.last = function(howMany) {
  var len = this.length;
  if (howMany == null) {
    if (!len) return undefined;
    return this[len - 1];
  }
  if (!len) return this._new();
  howMany = Math.abs(howMany) >>> 0;
  var i  = howMany > len ? 0 : len - howMany;
  var ls = this._new();
  for (; i < len; i++) ls.add(this[i]);
  return ls;
}


/**
 * Returns a new list of non-duplicate items found with the instance list.
 * Duplicates are determined with strict equality.
 *
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.unique = function() {
  var uniq = this._new();
  this.forEach(function(item, i, ls) {
    if (!uniq.contains(item)) uniq.add(item);
  });
  return uniq;
}



//
// Instance Methods - INDEXING
// ===========================
//


/**
 * Returns the index of the first item in the list to pass the iterator test.
 *
 * @param {Function} callback test iterator
 * @param {Number} optional starting index
 * @param {Object} optional context for callback
 * @returns {Number} index of first matching item, or -1 if not found
 */

TypedList.prototype.indexIf = function(iterator, index, context) {
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
 * @param {Mixed} item to find
 * @param {Number} optional starting index
 * @returns {Number} index of first matching item, or -1 if not found
 */

TypedList.prototype.lastIndexIf = function(iterator, index, context) {
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
 * @param {Mixed} Value to search for.
 * @param {Number} Optional. Index to start search from.
 * @returns {Array} Array of indexes for each occurence of value.
 * @api public
 */

TypedList.prototype.indicesOf = function(value, index) {
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

TypedList.prototype.indicesIf = function(iterator, index, context) {
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
// Instance Methods - ITERATORS
// ============================
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

TypedList.prototype.forEach = function(iterator, context) {
  _forEach.call(this, iterator, context);
  return this;
}



//TODO
TypedList.prototype.forEachAsync = function(iterator, context) {
  this.forEach(function(val, i, ls) {
    process.nextTick(function() {
      iterator.call(context, val, i, ls);
    });
  });
}



/**
 * Reduces the list into a single accumulated value.
 * Left to right.
 *
 * @param {Function} iterator callback
 * @param {Mixed} initVal optional
 * @returns {Mixed} accumulated value
 * @api public
 */

TypedList.prototype.reduce = function(iterator, initVal) {
  if      (initVal != null) _checkType(initVal, this.type);
  else if (!this.length)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduce.apply(this, arguments);
}

/**
 * Reduces the list into a single accumulated value.
 * Right to left.
 *
 * @param {Function} iterator callback
 * @param {Mixed} optional initial value
 * @returns {Mixed} accumulated value
 */

TypedList.prototype.reduceRight = function(iterator, initVal) {
  if      (initVal != null) _checkType(initVal, this.type);
  else if (!this.length)
    throw new TypeError('Reduce of empty List with no initial value');
  return _reduceRight.apply(this, arguments);
}


/**
 * Returns a new list composed of items that pass the iterator test.
 *
 * @param {Function} iterator
 * @param {Object} context optional
 * @returns {TypedList} new TypedList
 * @api public
 */

TypedList.prototype.filter = function(iterator, context) {
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

TypedList.prototype.reject = function(iterator, context) {
  var result = this._new();
  this.forEach(function(val, i) {
    if (!iterator.call(context, val, i, this)) result.add(val);
  }, this);
  return result;
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

TypedList.prototype.partition = function(iterator, context) {
  var a = this._new();
  var b = this._new();
  this.forEach(function(val, i, ls) {
    !!iterator.call(context, val, i, ls)
      ? a.add(val)
      : b.add(val);
  });
  return [a, b];
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
//TODO: make type first param?
TypedList.prototype.map = function(iterator, context, type) {


  if (!this.length) return this.clone();
  var result = this._new(type);
  var arr = _map.call(this, iterator, context);
  result.addRange(arr);
  return result;
}


