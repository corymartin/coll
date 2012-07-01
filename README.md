Coll
====

JavaScript Collections for Node.js

### API should be considered *alpha* and subject to change.

Installation
============
Install with NPM:

```
$ npm install coll
```

In your JavaScript:

```js
var List = require('coll').List;
var Dict = require('coll').Dict;
var Map  = require('coll').Map;
```

The Classes
===========

- __[List]__
  - *List Creation*
  - [List Constructor]
  - [List.range]
  - *Properties*
  - [List#length]
  - *Accessor Functions*
  - [List#get]
  - [List#slice]
  - [List#first]
  - [List#last]
  - [List#min]
  - [List#max]
  - *Mutator Functions*
  - [List#set]
  - [List#add]
  - [List#addRange]
  - [List#insert]
  - [List#insertRange]
  - [List#remove]
  - [List#removeFirst]
  - [List#removeLast]
  - [List#removeIf]
  - [List#removeAll]
  - [List#removeAt]
  - [List#clear]
  - *Search Functions*
  - [List#find]
  - [List#findLast]
  - [List#findAll]
  - [List#contains]
  - [List#count]
  - [List#countIf]
  - [List#filter]
  - [List#reject]
  - *Transformation Functions*
  - [List#sort]
  - [List#reverse]
  - [List#concat]
  - [List#map]
  - [List#intersperse]
  - [List#join]
  - [List#unique]
  - [List#clean]
  - [List#clone]
  - [List#toArray]
  - *Sub-List Functions*
  - [List#take]
  - [List#takeWhile]
  - [List#drop]
  - [List#dropWhile]
  - [List#group]
  - [List#partition]
  - [List#intersect]
  - *Indexing Functions*
  - [List#indexOf]
  - [List#lastIndexOf]
  - [List#indexIf]
  - [List#lastIndexIf]
  - [List#indicesOf]
  - [List#indicesIf]
  - *Iteration Functions*
  - [List#forEach]
  - [List#some]
  - [List#every]
  - [List#reduce]
  - [List#reduceRight]
- __[Dict]__
  - *Dict Creation*
  - [Dict Constructor]
  - *Properties*
  - [Dict#length]
  - [Dict#keys]
  - [Dict#values]
  - *Accessor Functions*
  - [Dict#hasKey]
  - [Dict#get]
  - *Mutator Functions*
  - [Dict#set]
  - [Dict#add]
  - [Dict#remove]
  - [Dict#clear]
  - *Iteration Functions*
  - [Dict#forEach]
  - [Dict#some]
  - [Dict#every]
  - *Search Functions*
  - [Dict#filter]
  - [Dict#reject]
  - *Transformation Functions*
  - [Dict#clone]
  - [Dict#toLiteral]
  - [Dict#toArray]
- __[Map]__
  - *Map Creation*
  - [Map Constructor]
  - *Properties*
  - [Map#length]
  - [Map#keys]
  - [Map#values]
  - *Accessor Functions*
  - [Map#hasKey]
  - [Map#get]
  - *Mutator Functions*
  - [Map#set]
  - [Map#remove]
  - [Map#clear]
  - *Iteration Functions*
  - [Map#forEach]
  - [Map#some]
  - [Map#every]
  - *Search Functions*
  - [Map#filter]
  - [Map#reject]
  - *Transformation Functions*
  - [Map#clone]
  - [Map#toLiteral]
  - [Map#toArray]



<a name='list'></a>
List
====
An indexed list of items with functions for manipulating, iterating,
searching, indexing, and transforming.


<a name='list-constructor'></a>
List Constructor
----------------
`new` is optional

```js
var ls1 = new List;
var ls2 = List();

ls1 instanceof List; // true
ls2 instanceof List; // true
```

Accepts any *iterable* item to initially populate the list.
An iterable is most anything with indexes and a length property
that can be iterated over.

```js
var ls1 = List([2, 4, 6]);
// ls1 => [2, 4, 5]

var ls2 = List('abc');
// ls2 => ['a', 'b', 'c']

var ls3 = List(List([true, 2.99]))
// ls3 => [true, 2.99]

;(function() {
  var argls = List(arguments);
  // argls => ['hi', true, /foo/]
})('hi', true, /foo/);
```


List Functions
--------------

<a name='list_range'></a>
### List.range( start [, end [, step]] )
Returns a `List` of numbers from `start` up to and including `end`.
If only `start` is passed, a list of numbers ranging from `0` through
`start` will be returned. If the optional `step` parameter is passed,
that will be used as the incrementing value. The default increment is `1`.

```js
var ls = List.range(-4, 4);
// ls => [-4, -3, -2, -1, 0, 1, 2, 3, 4]
```
```js
var ls = List.range(3);
// ls => [0, 1, 2, 3]
```
```js
var ls = List.range(8, 18, 2);
// ls => [8, 10, 12, 14, 16, 18]
```


List Instance Properties
------------------------

<a name='list-length'></a>
### List#length
Number of items in the list.

```js
var ls = List([2,4,6]);
// ls.length => 3
```

List Instance Functions
-----------------------

<a name='list-get'></a>
### List#get( index )
Returns the item at the specifed index.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.get(2);
// x => 'pear'
```

<a name='list-slice'></a>
### List#slice( [beginindex [, endindex]] )
Returns a section of the list.
Functions the same as `Array#slice` except this version returns
an instance of `List`.

```js
var ls = List('abcde');
var x = ls.slice(2, 4);
// x  => ['c', 'd']
// ls => ['a', 'b', 'c', 'd', 'e']
```

<a name='list-first'></a>
### List#first()
Returns the first item in the list.
If the list is empty, `undefined` is returned.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.first();
// x => 'apple'
```

<a name='list-last'></a>
### List#last()
Returns the last item in the list.
If the list is empty, `undefined` is returned.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.last();
// x => 'grape'
```

<a name='list-min'></a>
### List#min( [comparer] )
Returns the item with the minimum value from the list.

The optional `comparer` parameter can be either a function or a string.
If it is a function, then it will be used to determine the minimum value.
`comparer` functions work as they do in `Array#sort`.

If `comparer` is a string, then it will be assumed that the list is composed
of objects and the value to be compared will be that of the
property name passed.

```js
var ls = List([4,2,8,5]);
var x = ls.min();
// x => 2
```
```js
// With optional comparer function
var ls = List(['aaa', 'bb', 'ccccccc', 'dddd']);
var x = ls.min(function(a, b) {
  return a.length - b.length;
});
// x => 'bb'
```
```js
// With optional comparer property name
var ls = List([
  {foo:34, bar:'erf'},
  {foo:12, bar:'xcv'},
  {foo:45, bar:'bhu'},
  {foo:26, bar:'aer'}
]);
var x = ls.min('bar');
// x => {foo:26, bar:'aer'}
```

<a name='list-max'></a>
### List#max( [comparer] )
Returns the item with the maximum value from the list.

The optional `comparer` parameter can be either a function or a string.
If it is a function, then it will be used to determine the maximum value.
`comparer` functions work as they do in `Array#sort`.

If `comparer` is a string, then it will be assumed that the list is composed
of objects and the value to be compared will be that of the
property name passed.

```js
var ls = List([4,2,8,5]);
var x = ls.max();
// x => 8
```
```js
// With optional comparer function
var ls = List(['aaa', 'bb', 'ccccccc', 'dddd']);
var x = ls.max(function(a, b) {
  return a.length - b.length;
});
// x => 'ccccccc'
```
```js
// With optional comparer property name
var ls = List([
  {foo:34, bar:'erf'},
  {foo:12, bar:'xcv'},
  {foo:45, bar:'bhu'},
  {foo:26, bar:'aer'}
]);
var x = ls.max('bar');
// x => {foo:12, bar:'xcv'}
```

<a name='list-set'></a>
### List#set( index, obj )
Set the list item at `index` to `obj`.

```js
var ls = List([1,2,3]);
ls.set(1, 99);
// ls => [1, 99, 3]
```

<a name='list-add'></a>
### List#add( item [, item*N*] )
Appends one or more items to the end of the list.
Returns the list instance.

```js
var ls = List('abc');
ls.add('d');
ls.add('e', 'f');
// ls => ['a', 'b', 'c', 'd', 'e', 'f']
```

<a name='list-addrange'></a>
### List#addRange( iterable )
Appends a range of new items to the end of the list.
Returns the list instance.

```js
var ls = List();
ls.addRange([2,4,6]);
ls.addRange('abc');
// ls => [2, 4, 6, 'a', 'b', 'c']
```

<a name='list-insert'></a>
### List#insert( index, item )
Inserts a new item at the specified index.
Returns the list instance.

```js
var ls = List('abd');
ls.insert(2, 'c');
// ls => ['a', 'b', 'c', 'd']
```

<a name='list-insertrange'></a>
### List#insertRange( index, iterable )
Inserts a range of new items starting at the specifed index.
Returns the list instance.

```js
var ls = List([10,20,30]);
ls.insertRange(1, [12,14]);
// ls => [10, 12, 14, 20, 30]
```

<a name='list-remove'></a>
### List#remove( item [, index] )
Removes the first occurence of the passed item in the list.
Returns the removed item, or `undefined` if the item is not in the list.
If the optional `index` parameter is passed, the first matching item after
that index will be removed.

```js
var ls = List([1,4,2,6,2,3]);
var x = ls.remove(2);
// x  => 2
// ls => [1, 4, 6, 2, 3]
```

<a name='list-removefirst'></a>
### List#removeFirst()
Removes and returns the first item in the list.

```js
var ls = List(['some', 'text', 'and', 'stuff']);
var x = ls.removeFirst();
// x  => 'some'
// ls => ['text', 'and', 'stuff']
```

<a name='list-removelast'></a>
### List#removeLast()
Removes and returns the last item in the list.

```js
var ls = List(['some', 'text', 'and', 'stuff']);
var x = ls.removeLast();
// x  => 'stuff'
// ls => ['some', 'text', 'and']
```

<a name='list-removeif'></a>
### List#removeIf( [context,] iterator )
Removes and returns the first item in the list to pass the `iterator` function.
If no item passes the `iterator` test, `undefined` is returned.

```js
var ls = List([2,4,6,7,8]);
var x = ls.removeIf(function(item, index, list) {
  return item % 2 !== 0;
});
// x  => 7
// ls => [2, 4, 6, 8]

// With optional context
var obj = {foo:'bar'};
ls.removeIf(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-removeall'></a>
### List#removeAll( [context,] iterator )
Removes every item in the list that passes the `iterator` test.
Returns a new `List` of the removed items.

```js
var ls = List([1,2,3,4,5,6,7,8]);
var x = ls.removeAll(function(item, index, list) {
  return item % 2 === 0;
});
// x  => [2, 4, 6, 8]
// ls => [1, 3, 5, 7]


// With optional context
var obj = {foo:'bar'};
ls.removeAll(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-removeat'></a>
### List#removeAt( index [, howmany] )
Removes the item at the given index.
Returns the removed item.
If the optional `howmany` parameter is passed, a range of items is removed
starting at the index. A new `List` of the removed items will then be returned.

```js
var ls = List('abcdef');
var x = removeAt(2);
// x  => 'c'
// ls => ['a', 'b', 'd' 'e', 'f']
```
```js
// With `howmany` parameter
var ls = List('abcdef');
var x = removeAt(2, 3);
// x  => ['c', 'd', 'e']
// ls => ['a', 'b', 'f']
```

<a name='list-clear'></a>
### List#clear()
Removes all items from the list. Returns the instance.

```js
var ls = List([1,2,3]);
var x = ls.clear();
// ls => []
x === ls; // true
```

<a name='list-find'></a>
### List#find( [context,] iterator )
Returns the first item in the list to pass the `iterator` test.
If no item passes the `iterator` test, `undefined` is returned.

```js
var ls = List(23, '45', Date.now(), 'foo', 99.99, 'bar']);
var x = ls.find(function(item, index, list) {
  return isNaN(item);
});
// x => 'foo'

// With optional context
var obj = {foo:'bar'};
ls.find(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-findLast'></a>
### List#findLast( [context,] iterator )
Returns the last item in the list that passes the `iterator` test.
If no item passes the `iterator` test, `undefined` is returned.

```js
var ls = List(['aa', 'bb', 'cccccccc', 'dd', 'eeeeee']);
var x = ls.findLast(function(item, index, list) {
  return item.length < 3;
});
// x => 'dd'

// With optional context
var obj = {foo:'bar'};
ls.findLast(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-findall'></a>
### List#findAll( [context,] iterator )
Returns a new `List` of every item in the instance list that passes the
`iterator` test.

```js
var ls = List(['aa', 'bb', 'cccccccc', 'dd', 'eeeeee']);
var x = ls.findAll(function(item, index, list) {
  return item.length < 3;
});
// x => ['aa', 'bb', 'dd']

// With optional context
var obj = {foo:'bar'};
ls.findAll(obj, function(item, index, list) {
  // this => {foo:'bar'}
```

<a name='list-contains'></a>
### List#contains( item )
Determines if the passed item is in the list.

```js
var ls = List(['top', 'bottom', 'left']);
ls.contains('left');  // true
ls.contains('right'); // false
```

<a name='list-count'></a>
### List#count( [item] )
Returns the number of occurences of `item` within the list.
If no argument is passed, the list's length is returned.

```js
var ls = List([2,4,2,7,2,8]);
var x = ls.count(2);
// x => 3
```

<a name='list-countif'></a>
### List#countIf( [context,] iterator )
Returns the number of occurences that the `iterator` tests successfully against
the items in the list.

```js
var ls = List([1,2,3,4,5,6,7,8,9]);
var x = ls.countIf(function(item, index, list) {
  return item % 2 === 0;
});
// x => 4

// With optional context
var obj = {foo:'bar'};
ls.countIf(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-filter'></a>
### List#filter( [context,] iterator )
Returns a new `List` composed of items that pass the `iterator` function.

```js
var ls = List([
  {name:'Jay'}, {name:'Joan'}, {name:'Bob'}, {name:'Flo'}, {name:'Jim'}
]);
var x = ls.filter(function(item, index, list) {
  return item.name[0] === 'J';
});
// x => [
//  {name:'Jay'}, {name:'Joan'}, {name:'Jim'}
// ]

// With optional context
var obj = {foo:'bar'};
ls.filter(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-reject'></a>
### List#reject( [context,] iterator )
Returns a new `List` composed of items that fail the `iterator` function.

```js
var ls = List([
  {name:'Jay'}, {name:'Joan'}, {name:'Bob'}, {name:'Flo'}, {name:'Jim'}
]);
var x = ls.reject(function(item, index, list) {
  return item.name[0] === 'J';
});
// x => [
//  {name:'Bob'}, {name:'Flo'}
// ]

// With optional context
var obj = {foo:'bar'};
ls.reject(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-sort'></a>
### List#sort( [comparer] )
Returns a new, sorted `List` of the instance's items.
Numeric items (numbers, dates, booleans) are sorted numerically.
Other types are sorted lexicographically.

If a list contains mixed types, the order of sort precedence is:

1. number literals
2. string literals
3. boolean literals
4. date objects
5. number objects
6. string objects
7. boolean objects
8. regexes
9. functions
10. objects
11. arrays
12. global properties (`NaN`, `Infinity`, `undefined`, `null`)

The optional `comparer` parameter can be either a function or a string.
If it is a function, then it will be used to determine sort order.
`comparer` functions work as they do in `Array#sort`.

If `comparer` is a string, then it will be assumed that the list is composed
of objects and they will be sorted by the property name passed.

```js
var ls = List([33, 4, 77, 5, 2, 8]);
var x = ls.sort();
// x  => [2, 4, 5, 8, 33, 77]
```
```js
// Mixed types
var date1 = new Date('2012-06-23')
var date2 = new Date('2000-01-01')
var ls = List(
  [9, 'a', /foo/, true, 0, date1, {a:1}, 'sd', date2, 5, false, '1']
);
var x = ls.sort();
// x =>
//  [0, 5, 9, '1', 'a', 'sd', false, true, date2, date1 /foo/, {a:1}]
```
```js
// With optional comparer function
var ls = List([33, 4, 77, 5, 2, 8]);
var x = ls.sort(function(a, b) {
  return b - a;
});
// x  => [77, 33, 8, 5, 4, 2]
```
```js
// With optional comparer property name
var ls = List([
  {foo:34, bar:'erf'},
  {foo:12, bar:'xcv'},
  {foo:45, bar:'bhu'},
  {foo:26, bar:'aer'}
]);
var x = ls.sort('bar');
// x => [
//  {foo:26, bar:'aer'},
//  {foo:45, bar:'bhu'},
//  {foo:34, bar:'erf'},
//  {foo:12, bar:'xcv'}
// ]
```

<a name='list-reverse'></a>
### List#reverse()
Returns a new `List` of the instance's items with their order reversed.

```js
var ls = List('abc');
var x = ls.reverse();
// x  => ['c', 'b', 'a']
// ls => ['a', 'b', 'c']
```

<a name='list-concat'></a>
### List#concat( iterable [, iterable*N*] )
Returns a new `List` composed of the instance list concatenated to one or more
passed iterables.

```js
var ls = List([2, true]);
var x = ls.concat('abc', List([0,1,2]), [12.99]);
// x  => [2, true, 'a', 'b', 'c', 0, 1, 2, 12.99]
// ls => [2, true]
```

<a name='list-map'></a>
### List#map( [context,] iterator )
Returns a new `List` of values determined by the `iterator` function.

```js
var ls = List([
  {name:'Jay'}, {name:'Joan'}, {name:'Bob'}, {name:'Flo'}, {name:'Jim'}
]);
var x = ls.map(function(item, index, list) {
  return 'User ' + item.name;
});
// x => [
//  'User Jay', 'User Joan', 'User Bob', 'User Flo', 'User Jim'
// ]

// With optional context
var obj = {foo:'bar'};
ls.map(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-intersperse'></a>
### List#intersperse( obj )
Returns a new `List` with `obj` inserted between every item in the list.

```js
var ls = List([1,2,3,4,5]);
var x = ls.intersperse('|');
// x => [
//  1, '|', 2, '|', 3, '|', 4, '|', 5
// ]
```

<a name='list-join'></a>
### List#join( [separator] )
Borrowed from `Array#join`.

```js
var ls = List([2, 4, 6]);
var x = ls.join();
// x => '2,4,6'

x = ls.join(' - ');
// x => '2 - 4 - 6'
```

<a name='list-unique'></a>
### List#unique()
Returns a new `List` of non-duplicate items found within the instance list.
Duplicates are determines with strict equality.

```js
var ls = List('abcddcba');
var x = ls.unique();
// x => ['a', 'b', 'c', 'd']
```

<a name='list-clean'></a>
### List#clean()
Returns a copy of the list with all occurences of `undefined`, `null`, and
`NaN` removed.

```js
var ls = List(['a', null, 0, false, undefined, +'foo', 'bar']);
var x = ls.clean();
// x => ['a', 0, false, 'bar']
```

<a name='list-clone'></a>
### List#clone()
Returns a copy of the list in a new instance.

```js
var ls = List([2,4]);
var x = ls.clone();
// x  => [2, 4]
// ls => [2, 4]
x instanceof List; // true
x === ls;          // false
```

<a name='list-toarray'></a>
### List#toArray()
Returns a copy of the list's items in an `Array`.

```js
var ls = List([true, 'fajita', 4.89]);
var x = ls.toArray();
// x => [true, 'fajita', 4.89]
Array.isArray(x); // true;
```

<a name='list-take'></a>
### List#take( howmany )
Returns a new `List` of the first `howmany` contiguous items from the
instance list.

```js
var ls = List('abcdefg');
var x = ls.take(3);
// x => ['a', 'b', 'c']
```

<a name='list-takewhile'></a>
### List#takeWhile( [context,] iterator )
Returns a new `List` of contiguous items, starting at the beginning of the
list, so long as the `iterator` function returns true.

```js
var ls = List([4,2,6,3,8,4,2,6]);
var x = ls.takeWhile(function(item, index, list) {
  return item < 8;
});
// x => [4, 2, 6, 3]

// With optional context
var obj = {foo:'bar'};
ls.takeWhile(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-drop'></a>
### List#drop( howmany )
Returns a new `List` of contiguous items, dropping the first `howmany` items
from the instance list.

```js
var ls = List('abcdefg');
var x = ls.drop(3);
// x => ['d', 'e', 'f', 'g']
```

<a name='list-dropwhile'></a>
### List#dropWhile( [context,] iterator )
Returns a new `List` of contiguous items, starting at the first item in the
instance list that fails the passed `iterator` function.

```js
var ls = List([4,2,6,3,8,4,2,6]);
var x = ls.dropWhile(function(item, index, list) {
  return item < 8;
});
// x => [8, 4, 2, 6]

// With optional context
var obj = {foo:'bar'};
ls.dropWhile(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-group'></a>
### List#group( [[context,] iterator] )
Returns a hash of sublists, grouped either by equality to each other or by
the result of the optional `iterator` function.

```js
var ls = List([2,3,1,2,2,3]);
var x = ls.group();
// x => {
//  '1' : [1],
//  '2' : [2, 2, 2],
//  '3' : [3, 3]
// }
```
```js
// With optional iterator function
var ls = List(['#fff', '#3366ee', 'magenta', '#ccc', 'red'])
var hexColorRegex = /^#[abcdef0-9]{3,6}$/i;
var x = ls.group(function(item, index, list) {
  return hexColorRegex.test(item)
    ? 'hex'
    : 'named';
});
// x => {
//  hex   : ['#fff', '#3366ee', '#ccc'],
//  named : ['magenta', 'red']
// }
```

<a name='list-partition'></a>
### List#partition( [context,] iterator )
Returns an `Array` of two `List`s. The first list is composed of the items
that pass the `iterator` function. The second list is composed of those items
that failed it.

```js
var ls = List([2,4,8,3,6,3,9,0,7]);
var x = ls.partition(function(item, index, list) {
  return item < 5;
});
// x => [
//  [2, 4, 3, 3, 0],
//  [8, 6, 9, 7]
// ]
Array.isArray(x);     // true
x[0] instanceof List; // true
x[1] instanceof List; // true

// With optional context
var obj = {foo:'bar'};
ls.partition(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-intersect'></a>
### List#intersect( iterable )
Returns a new `List` of items present in both the instance list and in the
passed iterable.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.intersect(['peach', 'pear', 'plum', 'apple', 'mango']);
// x => ['apple', 'pear']
```

<a name='list-indexof'></a>
### List#indexOf( item [, index] )
Returns the index of the first occurence of `item` in the list.
If `item` is not found, `-1` will be returned.
Borrowed from `Array#indexOf`.

```js
var ls = List([1.99, 8.99, 3.99, 1.99, 7.99, 3.99, 1.99]);
var x = ls.indexOf(3.99);
// x => 2
x = ls.indexOf(9.99);
// x => -1
```

<a name='list-lastindexof'></a>
### List#lastIndexOf( item [, index] )
Returns the index of the last occurence of `item` in the list.
If `item` is not found, `-1` will be returned.
Borrowed from `Array#lastIndexOf`.

```js
var ls = List([1.99, 8.99, 3.99, 1.99, 7.99, 3.99, 1.99]);
var x = ls.lastIndexOf(3.99);
// x => 5
x = ls.lastIndexOf(9.99);
// x => -1
```

<a name='list-indexif'></a>
### List#indexIf( [index, [context,]] iterator )
Returns the index of the first item in the list that passes the `iterator`
function.

```js
var ls = List([
  {name:'Leo'}, {name:'Jeb'}, {name:'Jojo'}, {name:'Flo'}, {name:'Jojo'}
]);
var x = ls.indexIf(function(item, index, list) {
  return item.name === 'Jojo';
});
// x => 2
```
```js
// With optional start index
var ls = List([2,3,6,4,7,4,6]);
var x = ls.indexIf(2, function(item, index, list) {
  return item % 2 !== 0;
});
// x => 4
```
```js
// With optional context
var obj = {foo:'bar'};
ls.indexIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-lastindexif'></a>
### List#lastIndexIf( [index, [context,]] iterator )
Returns the index of the last item in the list that passes the `iterator`
function.

```js
var ls = List([
  {name:'Leo'}, {name:'Jeb'}, {name:'Jojo'}, {name:'Flo'}, {name:'Jojo'}
]);
var x = ls.lastIndexIf(function(item, index, list) {
  return item.name === 'Jojo';
});
// x => 4
```
```js
// With optional start index
var ls = List([2,3,6,4,7,4,6]);
var x = ls.lastIndexIf(3, function(item, index, list) {
  return item % 2 !== 0;
});
// x => 1
```
```js
// With optional context
var obj = {foo:'bar'};
ls.lastIndexIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-indicesof'></a>
### List#indicesOf( item [, index] )
Returns the indices of every item in the list matching `item`.

```js
var ls = List('abcaegaatf');
var x = ls.indicesOf('a');
// x => [0, 3, 6, 7]
```
```js
// With optional index
var ls = List('abcaegaatf');
var x = ls.indicesOf('a', 2);
// x => [3, 6, 7]
```

<a name='list-indicesif'></a>
### List#indicesIf( [index, [context,]] iterator )
Returns the indices of every item in the list that passes the `iterator
function.

```js
var ls = List([1,2,3,4,5,6,7]);
var x = ls.indicesIf(function(item, index, list) {
  return item % 2 === 0;
});
// x => [1, 3, 5]
```
```js
// With optional start index
var ls = List([1,2,3,4,5,6,7]);
var x = ls.indicesIf(2, function(item, index, list) {
  return item % 2 === 0;
});
// x => [3, 5]
```
```js
// With optional context
var obj = {foo:'bar'};
ls.indicesIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-foreach'></a>
### List#forEach( [context,] iterator )
Iterates over the items in the list, invoking the passed `iterator` function
for each item. Returns the list instance.

```js
var ls = List(['Taco', 'Burrito', 'Fajita']);
var x = ls.forEach(function(item, index, list) {
  console.log('%d : %s', index, item);
});
// Console output:
//  0 : Taco
//  1 : Burrito
//  2 : Fajita
x === ls; // true
```
```js
// With optional context
var obj = {foo:'bar'};
ls.forEach(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-some'></a>
### List#some( [context,] iterator )
Returns `true` if at least one item in the list passes the `iterator` function.
Otherwise `false` is returned.

```js
var ls = List([2,4,6,9,10]);
var x = ls.some(function(item, index, list) {
  return item % 2 !== 0;
});
// x => true

x = ls.some(function(item, index, list) {
  return item > 50;
});
// x => false
```
```js
// With optional context
var obj = {foo:'bar'};
ls.some(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-every'></a>
### List#every( [context,] iterator )
Returns `true` if every item in the list passes the `iterator` test.
Otherwise `false` is returned.

```js
var ls = List([2,4,6,9,10]);
var x = ls.every(function(item, index, list) {
  return item <= 10;
});
// x => true

x = ls.every(function(item, index, list) {
  return item % 2 === 0;
});
// x => false
```
```js
// With optional context
var obj = {foo:'bar'};
ls.every(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-reduce'></a>
### List#reduce( [initval,] iterator )
Reduces the list into a single accumulated value.
Left to right.

```js
var ls = List([1,2,3]);
var sum = ls.reduce(function(a, b, index, list) {
  return a + b;
});
// sum => 6
```
```js
var ls = List([3,8,2,5]);
var max = ls.reduce(function(a, b, index, list) {
  return a >= b ? a : b;
});
// max => 8
```
```js
// With optional initval
var ls = List([1,2,3]);
var x = ls.reduce([], function(arr, b, index, list) {
  arr.push(b * 10);
  return arr;
});
// x => [10, 20, 30]
```

<a name='list-reduceright'></a>
### List#reduceRight( [initval,] iterator )
Reduces the list into a single accumulated value.
Right to left.

```js
var ls = List('abc');
var x = ls.reduceRight(function(a, b, index, list) {
  return a + b;
});
// x => 'cba'
```
```js
// With optional initval
var ls = List('abc');
var x = ls.reduceRight('---', function(str, b, index, list) {
  return str + b;
});
// x => '---cba'
```


[List]:               #list

[List.range]:         #list_range

[List Constructor]:   #list-constructor

[List#length]:        #list-length

[List#get]:           #list-get
[List#set]:           #list-set
[List#add]:           #list-add
[List#addRange]:      #list-addrange
[List#insert]:        #list-insert
[List#insertRange]:   #list-insertrange
[List#remove]:        #list-remove
[List#removeFirst]:   #list-removefirst
[List#removeLast]:    #list-removelast
[List#removeIf]:      #list-removeif
[List#removeAll]:     #list-removeall
[List#removeAt]:      #list-removeat
[List#clear]:         #list-clear

[List#slice]:         #list-slice
[List#concat]:        #list-concat
[List#join]:          #list-join
[List#count]:         #list-count
[List#countIf]:       #list-countif
[List#contains]:      #list-contains
[List#find]:          #list-find
[List#findLast]:      #list-findlast
[List#findAll]:       #list-findall
[List#first]:         #list-first
[List#last]:          #list-last
[List#unique]:        #list-unique
[List#clean]:         #list-clean

[List#clone]:         #list-clone
[List#toArray]:       #list-toarray

[List#intersect]:     #list-intersect
[List#max]:           #list-max
[List#min]:           #list-min

[List#take]:          #list-take
[List#takeWhile]:     #list-takewhile
[List#drop]:          #list-drop
[List#dropWhile]:     #list-dropwhile
[List#group]:         #list-group
[List#partition]:     #list-partition

[List#indexOf]:       #list-indexof
[List#lastIndexOf]:   #list-lastindexof
[List#indexIf]:       #list-indexif
[List#lastIndexIf]:   #list-lastindexif
[List#indicesOf]:     #list-indicesof
[List#indicesIf]:     #list-indicesif

[List#forEach]:       #list-foreach
[List#some]:          #list-some
[List#every]:         #list-every
[List#reduce]:        #list-reduce
[List#reduceRight]:   #list-reduceright

[List#sort]:          #list-sort
[List#reverse]:       #list-reverse

[List#filter]:        #list-filter
[List#reject]:        #list-reject
[List#map]:           #list-map
[List#intersperse]:   #list-intersperse


[Array#sort]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort



<a name='dict'></a>
Dict
====
A simple key/value collection, where keys are `Strings` and values can be any
type or object. Keys are unique within the collection.


<a name='dict-constructor'></a>
Dict Constructor
----------------
`new` is optional

```js
var d1 = new Dict;
var d2 = Dict();

d1 instanceof Dict; // true
d2 instanceof Dict; // true
```

Accepts an object literal to initially populate the dict.

```js
var d = Dict({a:10, b:20});
// d => {a:10, b:20}
```

Dict Instance Properties
------------------------

<a name='dict-length'></a>
### Dict#length
The number of items in the dict.

```js
var d = Dict({a:2, b:4, c:6});
// d.length => 3
```

<a name='dict-keys'></a>
### Dict#keys
An array of the dict's keys. Order is arbitrary.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
// d.keys => ['name', 'age', 'town']
```

<a name='dict-values'></a>
### Dict#values
An array of the dict's values. Order is arbitrary.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
// d.values => ['Fred', 5000, 'Bedrock']
```

Dict Instance Functions
-----------------------

<a name='dict-haskey'></a>
### Dict#haskey( key )
Returns `true` if `key` exists within the dict. Otherwise `false` is returned.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
d.hasKey('town');    // true
d.hasKey('address'); // false
```

<a name='dict-get'></a>
### Dict#get( key [, \_default] )
Returns the value for `key`.
If an optional `_default` value is passed, that will be returned in cases
where the `key` does not exist within the dict.
If `key` does not exist within the dict and `_default` is not passed,
a `ReferenceError` is thrown.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
var x = d.get('town');
// x => 'Bedrock'

x = d.get('occupation', 'excavator');
// x => 'excavator'

d.get('occupation'); // throws ReferenceError
```

<a name='dict-set'></a>
### Dict#set( key, value )
Set value `value` for key `key`. If the key already exists in the dict
then it's value will be overwritten. If the `key` does not exist, then it
will be added. Returns the instance.

```js
var d = Dict();
var x = d.set('volume', .92);
// d => {volume: .92}
x === d; // true

d.set('volume', .85);
// d => {volume: .85}
```

<a name='dict-add'></a>
### Dict#add( hash [, hash*N*] )
Adds one or more key/value pairs to the dict.
Returns the instance.

```js
var d = Dict();
d.add({a:'alpha', b:'bravo'});
d.add({c:'charlie'}, {d:'delta', e:'echo'}, {f:'foxtrot'});
// d => {
//  a:'alpha', b:'bravo', c:'charlie', d:'delta', e:'echo', f:'foxtrot'
// }
```

<a name='dict-remove'></a>
### Dict#remove( key )
Removes a key/value pair from the collection by `key` and returns the
removed value.
If `key` does not exist within the dict a `ReferenceError` is thrown.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
var x = d.remove('town');
// x => 'Bedrock'
// d => {name:'Fred', age:5000}

d.remove('occupation'); // throws ReferenceError
```

<a name='dict-clear'></a>
### Dict#clear()
Removes all key/value pairs from the dict. Returns the instance.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
var x = d.clear();
// d => {}
x === d; // true
```

<a name='dict-foreach'></a>
### Dict#forEach( [context,] iterator )
Iterates over the dict, calling the `iterator` function for
each key/value pair. Returns the instance.

```js
var d = Dict({name:'Fred', age:5000, town:'Bedrock'});
var x = d.forEach(function(key, value, dict) {
  console.log('Key: %s, Val: %s', key, value);
});
// Output:
//  Key: name, Val: Fred
//  Key: age, Val: 5000
//  Key: town, Val: Bedrock
x === d; // true
```
```js
// With optional context
var obj = {foo:'bar'};
d.forEach(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='dict-some'></a>
### Dict#some( [context,] iterator )
Returns `true` if at least one key/value pair in the dict passes the
`iterator` function.
Otherwise `false` is returned.

```js
var d = Dict();
d.set('Creep',            {year:1993, album:'Pablo Honey'});
d.set('Paranoid Android', {year:1997, album:'OK Computer'});
d.set('Karma Police',     {year:1997, album:'OK Computer'});
var x = d.some(function(key, value, dict) {
  return value.year > 1996;
});
// x => true
```
```js
// With optional context
var obj = {foo:'bar'};
d.some(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='dict-every'></a>
### Dict#every( [context,] iterator )
Returns `true` if every key/value pair in the dict passes the
`iterator` function.
Otherwise `false` is returned.

```js
var d = Dict();
d.set('Creep',            {year:1993, album:'Pablo Honey'});
d.set('Paranoid Android', {year:1997, album:'OK Computer'});
d.set('Karma Police',     {year:1997, album:'OK Computer'});
var x = d.every(function(key, value, dict) {
  return value.album === 'OK Computer';
});
// x => false
```
```js
// With optional context
var obj = {foo:'bar'};
d.every(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='dict-filter'></a>
### Dict#filter( [context,] iterator )
Returns a new `Dict` composed of key/value pairs that pass the
`iterator` function.

```js
var d = Dict();
d.set('Creep',            {year:1993, album:'Pablo Honey'});
d.set('Paranoid Android', {year:1997, album:'OK Computer'});
d.set('Karma Police',     {year:1997, album:'OK Computer'});
var x = d.filter(function(key, value, dict) {
  return value.album === 'OK Computer';
});
// x => {
//  'Paranoid Android' : {year:1997, album:'OK Computer'},
//  'Karma Police'     : {year:1997, album:'OK Computer'}
// }
```
```js
// With optional context
var obj = {foo:'bar'};
d.filter(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='dict-reject'></a>
### Dict#reject( [context,] iterator )
Returns a new `Dict` composed of key/value pairs that fail the
`iterator` function.

```js
var d = Dict();
d.set('Creep',            {year:1993, album:'Pablo Honey'});
d.set('Paranoid Android', {year:1997, album:'OK Computer'});
d.set('Karma Police',     {year:1997, album:'OK Computer'});
var x = d.reject(function(key, value, dict) {
  return value.album === 'OK Computer';
});
// x => {
//  'Creep' : {year:1993, album:'Pablo Honey'},
// }
```
```js
// With optional context
var obj = {foo:'bar'};
d.reject(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='dict-clone'></a>
### Dict#clone()
Returns a copy of the dict in a new instance.

```js
var d = Dict({a:2, b:4});
var x = d.clone();
// x => {a:2, b:4}
// d => {a:2, b:4}
x instanceof Dict; // true
x === d;           // false
```

<a name='dict-toliteral'></a>
### Dict#toLiteral( [serializer] )
Returns the key/value pairs of the dict as an object literal.
If the optional `serializer` function is passed, that will be used to
determine the key.


```js
var d = Dict({a:10, b:20, c:30});
var obj = d.toLiteral();
// obj => {a:10, b:20, c:30}
for (var key in obj) {
  console.log('%s : %s', key, obj[key]);
}
// Output:
//  a : 10
//  b : 20
//  c : 30
```
```js
// With optional serializer
var d = Dict({a:10, b:20, c:30});
var obj = d.toLiteral(function(key, value) {
  return key.toUpperCase();
});
// obj => {A:10, B:20, C:30}
```

<a name='dict-toarray'></a>
### Dict#toArray()
Returns the dict's key/value pairs in an array of 'tuples'.

```js
var d = Dict({a:10, b:20, c:30});
var x = d.toArray();
// x => [['a', 10], ['b', 20], ['c', 30]]
```


[Dict]:               #dict
[Dict Constructor]:   #dict-constructor

[Dict#length]:        #dict-length
[Dict#keys]:          #dict-keys
[Dict#values]:        #dict-values

[Dict#hasKey]:        #dict-haskey

[Dict#get]:           #dict-get
[Dict#set]:           #dict-set
[Dict#add]:           #dict-add
[Dict#remove]:        #dict-remove
[Dict#clear]:         #dict-clear

[Dict#forEach]:       #dict-foreach
[Dict#some]:          #dict-some
[Dict#every]:         #dict-every
[Dict#filter]:        #dict-filter
[Dict#reject]:        #dict-reject

[Dict#clone]:        #dict-clone
[Dict#toLiteral]:    #dict-toliteral
[Dict#toArray]:      #dict-toarray





<a name='map'></a>
Map
===
A key/value collection, where both keys and values can be any object or type.
Keys are unique within the collection by strict equality.


<a name='map-constructor'></a>
Map Constructor
---------------
`new` is optional

```js
var m1 = new Map;
var m2 = Map();

m1 instanceof Map; // true
m2 instanceof Map; // true
```

Accepts an array of key/value pairs ('tuples') to initially populate the map.

```js
var m = Map([['a', 10], [/foo/i, 20]]);
// m => {
//  'a'    => 10,
//  /foo/i => 20
// }
```

Map Instance Properties
-----------------------

<a name='map-length'></a>
### Map#length
The number of items in the map.

```js
var m = Map([['a', 10], [/foo/i, 20]]);
// m.length => 2
```

<a name='map-keys'></a>
### Map#keys
An array of the map's keys. Order is arbitrary.

```js
var m = Map([[{a:1}, 'dog'], [{b:2}, 'cat'], [23.389, 'rock']]);
// m.keys => [{a:1}, {b:2}, 23.389]
```

<a name='map-values'></a>
### Map#values
An array of the dict's values. Order is arbitrary.

```js
var m = Map([[{a:1}, 'dog'], [{b:2}, 'cat'], [23.389, 'rock']]);
// m.values => ['dog', 'cat', 'rock']
```

Map Instance Functions
----------------------

<a name='map-haskey'></a>
### Map#haskey( key )
Returns `true` if `key` exists within the map. Otherwise `false` is returned.
Keys are determined and are unique by strict equality.

```js
var m = Map();
var key1 = {a:1};
var key2 = /foo/i;
m.set(key1, 'a');
m.set(key2, 'b');
m.set(9999, 'c');

m.hasKey(key1);   // true
m.hasKey({a:1});  // false
m.hasKey(key2);   // true
m.hasKey(/foo/i); // false
m.hasKey(9999);   // true
```

<a name='map-get'></a>
### Map#get( key [, \_default] )
Returns the value for `key`.
If an optional `_default` value is passed, that will be returned in cases
where the `key` does not exist within the map.
If `key` does not exist within the map and `_default` is not passed,
a `ReferenceError` is thrown.
Keys are determined and are unique by strict equality.

```js
var m = Map();
var key1 = /foo/gi;
m.set(key1, 'stuff');
m.set(23.89, 'thing');

var x = m.get(key1);
// x => 'stuff'
x = m.get(23.89);
// x => 'thing'

x = m.get(/bar/gi, 'nada');
// x => 'nada'

m.get(77.11);   // throws ReferenceError
m.get(/foo/gi); // throws ReferenceError
```

<a name='map-set'></a>
### Map#set( key, value )
Set value `value` for key `key`. If the key already exists in the map
then it's value will be overwritten. If the `key` does not exist, then it
will be added. Returns the instance.

```js
var m = Map();
var x = m.set('volume', .92);
// m => {
//  'volume' => .92
// }
x === d; // true

d.set('volume', .85);
// m => {
//  'volume' => .85
// }
```

<a name='map-remove'></a>
### Map#remove( key )
Removes a key/value pair from the collection by `key` and returns the
removed value.
If `key` does not exist within the map a `ReferenceError` is thrown.

```js
var m = Map();
var key1 = {name:'Jen'};
var key2 = {name:'Tim'};
m.set(key1, 83.234);
m.set(key2, 72.183);
m.set('yo', 14.384);

var x = m.remove(key2);
// x => 72.183
// m => {
//  {name:'Jen'} => 83.234,
//  'yo'         => 14.384
// }

m.remove('hi');         // throws ReferenceError
m.remove({name:'Jen'}); // throws ReferenceError
```

<a name='map-clear'></a>
### Map#clear()
Removes all key/value pairs from the map. Returns the instance.

```js
var m = Map([[/yo/, 'joe'], [new Date, 123]]);
var x = m.clear();
// m => {}
x === m; // true
```

<a name='map-foreach'></a>
### Map#forEach( [context,] iterator )
Iterates over the map, calling the `iterator` function for
each key/value pair. Returns the instance.

```js
var m = Map();
m.set(new Date(2012, 4, 5),  'Cinco de Mayo');
m.set(new Date(2012, 3, 17), 'Taxes!!');
m.set(new Date(2012, 9, 31), 'Halloween');

var x = m.forEach(function(key, value, map) {
  console.log('Key: %s, Val: %s', key.toDateString(), value);
});
// Output:
//  Key: Sat May 05 2012, Val: Cinco de Mayo
//  Key: Tue Apr 17 2012, Val: Taxes!!
//  Key: Wed Oct 31 2012, Val: Halloween
x === m; // true
```
```js
// With optional context
var obj = {foo:'bar'};
m.forEach(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='map-some'></a>
### Map#some( [context,] iterator )
Returns `true` if at least one key/value pair in the map passes the
`iterator` function.
Otherwise `false` is returned.

```js
var m = Map();
m.set(new Date(2011, 9, 31), 'Halloween');
m.set(new Date(2012, 4, 5),  'Cinco de Mayo');
m.set(new Date(2012, 3, 17), 'Taxes!!');
m.set(new Date(2012, 9, 31), 'Halloween');

var x = m.some(function(key, value, dict) {
  return value !== 'Halloween' && key.getFullYear() === 2012;
});
// x => true
```
```js
// With optional context
var obj = {foo:'bar'};
m.some(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='map-every'></a>
### Map#every( [context,] iterator )
Returns `true` if every key/value pair in the map passes the
`iterator` function.
Otherwise `false` is returned.

```js
var m = Map();
m.set(new Date(2011, 9, 31), 'Halloween');
m.set(new Date(2012, 4, 5),  'Cinco de Mayo');
m.set(new Date(2012, 3, 17), 'Taxes!!');
m.set(new Date(2012, 9, 31), 'Halloween');

var x = m.every(function(key, value, dict) {
  return key.getFullYear() === 2012;
});
// x => false

x = m.every(function(key, value, dict) {
  return key.getFullYear() > 2010;
});
// x => true
```
```js
// With optional context
var obj = {foo:'bar'};
m.every(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='map-filter'></a>
### Map#filter( [context,] iterator )
Returns a new `Map` composed of key/value pairs that pass the
`iterator` function.

```js
var m = Map();
m.set(new Date(2011, 9, 31), 'Halloween');
m.set(new Date(2012, 0, 1),  'New Years');
m.set(new Date(2012, 4, 5),  'Cinco de Mayo');
m.set(new Date(2012, 3, 17), 'Taxes!!');
m.set(new Date(2012, 9, 31), 'Halloween');

var x = m.filter(function(key, value, dict) {
  return key.getMonth() >= 3 && value !== 'Taxes!!';
});
// x => {
//  Mon Oct 31 2011 => 'Halloween',
//  Sat May 05 2012 => 'Cinco de Mayo',
//  Wed Oct 31 2012 => 'Halloween'
// }
```
```js
// With optional context
var obj = {foo:'bar'};
m.filter(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='map-reject'></a>
### Map#reject( [context,] iterator )
Returns a new `Map` composed of key/value pairs that fail the
`iterator` function.

```js
var m = Map();
m.set(new Date(2011, 9, 31), 'Halloween');
m.set(new Date(2012, 0, 1),  'New Years');
m.set(new Date(2012, 4, 5),  'Cinco de Mayo');
m.set(new Date(2012, 3, 17), 'Taxes!!');
m.set(new Date(2012, 9, 31), 'Halloween');

var x = m.reject(function(key, value, dict) {
  return key.getMonth() > 3;
});
// x => {
//  Sun Jan 01 2012 => 'New Years'
//  Tue Apr 17 2012 => 'Taxes!!'
// }
```
```js
// With optional context
var obj = {foo:'bar'};
m.reject(obj, function(key, value, dict) {
  // this => {foo:'bar'}
});
```

<a name='map-clone'></a>
### Map#clone()
Returns a copy of the map in a new instance.

```js
var m = Map([[{a:1}, 11], [{b:2}, 22]]);
var x = m.clone();

// x => {
//  {a:1} => 11,
//  {b:2} => 22
// }
// m => {
//  {a:1} => 11,
//  {b:2} => 22
// }
x instanceof Map; // true
x === m;          // false
```

<a name='map-toliteral'></a>
### Map#toLiteral( [serializer] )
Returns the key/value pairs of the map as an object literal.
If the optional `serializer` function is passed, that will be used to
determine the key.

If your map keys are not strings, numbers, or anything that would not
automatically convert (`toString()`) to a unique key string, it is highly
recommended that you provide a `serializer` function. Otherwise you will
risk losing key/value pairs due to key collision and/or the keys produced
may not be that descriptive.

```js
var m = Map();
var key1 = {position:'rb', team:'Vikings'};
var key2 = {position:'wr', team:'Cardinals'};
var key3 = {position:'ss', team:'Steelers'};
m.set(key1, 'Peterson');
m.set(key2, 'Fitz');
m.set(key3, 'Polamalu');

var x = m.toLiteral(function(key, val) {
  return key.team + ':' + key.position;
});
// x => {
//  'Vikings:rb':   'Peterson',
//  'Cardinals:wr': 'Fitz',
//  'Steelers:ss':  'Polamalu'
// }
for (var key in x) {
  console.log('%s : %s', key, x[key]);
}
// Output:
//  Vikings:rb : Peterson
//  Cardinals:wr : Fitz
//  Steelers:ss : Polamalu

// Without serializer function
x = m.toLiteral();
// x => {'[object Object]': 'Polamalu'}
```

<a name='map-toarray'></a>
### Map#toArray()
Returns the map's key/value pairs in an array of 'tuples'.

```js
var m = Map();
var key1 = {position:'rb', team:'Vikings'};
var key2 = {position:'wr', team:'Cardinals'};
var key3 = {position:'ss', team:'Steelers'};
m.set(key1, 'Peterson');
m.set(key2, 'Fitz');
m.set(key3, 'Polamalu');

var x = m.toArray();
// x => [
//  [{position:'rb', team:'Vikings'},   'Peterson'],
//  [{position:'wr', team:'Cardinals'}, 'Fitz'],
//  [{position:'ss', team:'Steelers'},  'Polamalu']
// ]
```


[Map]:                #map
[Map Constructor]:    #map-constructor

[Map#length]:         #map-length
[Map#keys]:           #map-keys
[Map#values]:         #map-values

[Map#hasKey]:         #map-haskey

[Map#get]:            #map-get
[Map#set]:            #map-set
[Map#remove]:         #map-remove
[Map#clear]:          #map-clear

[Map#forEach]:        #map-foreach
[Map#some]:           #map-some
[Map#every]:          #map-every
[Map#filter]:         #map-filter
[Map#reject]:         #map-reject

[Map#clone]:          #map-clone
[Map#toLiteral]:      #map-toliteral
[Map#toArray]:        #map-toarray

