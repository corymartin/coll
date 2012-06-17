coll.js
=======

JavaScript Collection Classes.

- [List]
  - [List Constructor]
  - [List#length]
  - [List#get]
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
  - [List#slice]
  - [List#concat]
  - [List#join]
  - [List#count]
  - [List#countIf]
  - [List#contains]
  - [List#find]
  - [List#findLast]
  - [List#findAll]
  - [List#first]
  - [List#last]
  - [List#unique]
  - [List#clean]
  - [List#clone]
  - [List#toArray]
  - [List#intersect]
  - [List#max]
  - [List#min]
  - [List#take]
  - [List#takeWhile]
  - [List#drop]
  - [List#dropWhile]
  - [List#group]
  - [List#partition]
  - [List#indexOf]
  - [List#lastIndexOf]
  - [List#indexIf]
  - [List#lastIndexIf]
  - [List#indicesOf]
  - [List#indicesIf]
  - [List#forEach]
  - [List#some]
  - [List#every]
  - [List#reduce]
  - [List#reduceRight]
  - [List#sort]
  - [List#reverse]
  - [List#filter]
  - [List#reject]
  - [List#map]
  - [List#intersperse]



<a name='list'></a>
List
====
An indexed list of items with functions for manipulating, iterating,
searching, indexing, transforming, and inspecting.


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


<a name='list-length'></a>
List#length
-----------
Number of items in the list.

```js
var ls = List([2,4,6]);
// ls.length => 3
```


<a name='list-get'></a>
List#get( index )
-----------------
Returns the item at the specifed index.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.get(2);
// x => 'pear'
```

<a name='list-set'></a>
List#set( index, obj )
----------------------
Set the list item at `index` to `obj`.

```js
var ls = List([1,2,3]);
ls.set(1, 99);
// ls => [1, 99, 3]
```

<a name='list-add'></a>
List#add( item [, item*N*] )
----------------------------
Appends one or more items to the end of the list.
Returns the list instance.

```js
var ls = List('abc');
ls.add('d');
ls.add('e', 'f');
// ls => ['a', 'b', 'c', 'd', 'e', 'f']
```

<a name='list-addrange'></a>
List#addRange( iterable )
-------------------------
Appends a range of new items to the end of the list.
Returns the list instance.

```js
var ls = List();
ls.addRange([2,4,6]);
ls.addRange('abc');
// ls => [2, 4, 6, 'a', 'b', 'c']
```

<a name='list-insert'></a>
List#insert( index, item )
--------------------------
Inserts a new item at the specified index.
Returns the list instance.

```js
var ls = List('abd');
ls.insert(2, 'c');
// ls => ['a', 'b', 'c', 'd']
```

<a name='list-insertrange'></a>
List#insertRange( index, iterable )
-----------------------------------
Inserts a range of new items starting at the specifed index.
Returns the list instance.

```js
var ls = List([10,20,30]);
ls.insertRange(1, [12,14]);
// ls => [10, 12, 14, 20, 30]
```

<a name='list-remove'></a>
List#remove( item [, index] )
-----------------------------
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
List#removeFirst()
------------------
Removes and returns the first item in the list.

```js
var ls = List(['some', 'text', 'and', 'stuff']);
var x = ls.removeFirst();
// x  => 'some'
// ls => ['text', 'and', 'stuff']
```

<a name='list-removelast'></a>
List#removeLast()
-----------------
Removes and returns the last item in the list.

```js
var ls = List(['some', 'text', 'and', 'stuff']);
var x = ls.removeLast();
// x  => 'stuff'
// ls => ['some', 'text', 'and']
```

<a name='list-removeif'></a>
List#removeIf( [context,] iterator )
-------------------------------------
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
List#removeAll( [context,] iterator )
--------------------------------------
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
List#removeAt( index [, howmany] )
----------------------------------
Removes the item at the given index.
Returns the removed item.
If the optional `howmany` parameter is passed, a range of items is removed
starting at the index. A new `List` of the removed items will then be returned.

```js
var ls = List('abcdef');
var x = removeAt(2);
// x  => 'c'
// ls => ['a', 'b', 'd' 'e', 'f']

// With `howmany` parameter
var ls = List('abcdef');
var x = removeAt(2, 3);
// x  => ['c', 'd', 'e']
// ls => ['a', 'b', 'f']
```

<a name='list-clear'></a>
List#clear()
------------
Removes all items from the list.

```js
var ls = List([1,2,3]);
var x = ls.clear();
// ls => []
x === ls; // true
```


<a name='list-slice'></a>
List#slice( [beginindex [, endindex]] )
---------------------------------------
Functions the same as `Array#slice` function except this version returns
an instance of `List`.

```js
var ls = List('abcde');
var x = ls.slice(2, 4);
// x  => ['c', 'd']
// ls => ['a', 'b', 'c', 'd', 'e']
```

<a name='list-concat'></a>
List#concat( iterable [, iterable*N*] )
---------------------------------------
Returns a new `List` composed of the instance list concatenated to one or more
passed iterables.

```js
var ls = List([2, true]);
var x = ls.concat('abc', List([0,1,2]), [12.99]);
// x  => [2, true, 'a', 'b', 'c', 0, 1, 2, 12.99]
// ls => [2, true]
```

<a name='list-join'></a>
List#join( [separator] )
------------------------
Borrowed from `Array#join`.

```js
var ls = List('abc');
var x = ls.join();
// x => 'a,b,c'

x = ls.join(' | ');
// x => 'a | b | c'
```

<a name='list-count'></a>
List#count( [item] )
--------------------
Returns the number of occurences of `item` within the list.
If no argument is passed, the list's length is returned.

```js
var ls = List([2,4,2,7,2,8]);
var x = ls.count(2);
// x => 3
```

<a name='list-countif'></a>
List#countIf( [context,] iterator )
------------------------------------
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

<a name='list-contains'></a>
List#contains( item )
---------------------
Determines if the passed item is in the list.

```js
var ls = List(['top', 'bottom', 'left']);
ls.contains('left');  // true
ls.contains('right'); // false
```

<a name='list-find'></a>
List#find( [context,] iterator )
---------------------------------
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
List#findLast( [context,] iterator )
-------------------------------------
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
List#findAll( [context,] iterator )
------------------------------------
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

<a name='list-first'></a>
List#first()
------------
Returns the first item in the list.
If the list is empty, `undefined` is returned.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.first();
// x => 'apple'
```

<a name='list-last'></a>
List#last()
------------
Returns the last item in the list.
If the list is empty, `undefined` is returned.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.last();
// x => 'grape'
```

<a name='list-unique'></a>
List#unique()
-------------
Returns a new `List` of non-duplicate items found within the instance list.
Duplicates are determines with strict equality.

```js
var ls = List('abcddcba');
var x = ls.unique();
// x => ['a', 'b', 'c', 'd']
```

<a name='list-clean'></a>
List#clean()
------------
Returns a copy of the list with all occurences of `undefined`, `null`, and
`NaN` removed.

```js
var ls = List(['a', null, 0, false, undefined, +'foo', 'bar']);
var x = ls.clean();
// x => ['a', 0, false, 'bar']
```

<a name='list-clone'></a>
List#clone()
------------
Returns a copy of the list in a new instance.

```js
var ls = List([2,4]);
var x = ls.clone();
// x  => [2, 4]
// ls => [2, 4]
x instanceof List; // true
x === ls; // false
```

<a name='list-toarray'></a>
List#toArray()
--------------
Returns a copy of the list's items in an `Array`.

<a name='list-intersect'></a>
List#intersect( iterable )
--------------------------
Returns a new `List` of items present in both the instance list and in the
passes iterable.

```js
var ls = List(['apple', 'orange', 'pear', 'grape']);
var x = ls.intersect(['peach', 'pear', 'plum', 'apple', 'mango']);
// x  => ['apple', 'pear']
```

<a name='list-max'></a>
List#max( [comparer] )
----------------------
Returns the item with the maximum value from the list.
If the optional `comparer` function is passed, that will be used to determine
the maximum value. It works like the comparer function in `Array#sort`.

```js
var ls = List([4,2,8,5]);
var x = ls.max();
// x => 8

var ls2 = List(['aaa', 'bb', 'ccccccc', 'dddd']);
x = ls2.max(function(a, b) {
  return a.length - b.length;
});
// x => 'ccccccc'
```

<a name='list-min'></a>
List#min( [comparer] )
----------------------
Returns the item with the minimum value from the list.
If the optional `comparer` function is passed, that will be used to determine
the minimum value. It works like the comparer function in `Array#sort`.

```js
var ls = List([4,2,8,5]);
var x = ls.min();
// x => 2

var ls2 = List(['aaa', 'bb', 'ccccccc', 'dddd']);
x = ls2.min(function(a, b) {
  return a.length - b.length;
});
// x => 'bb'
```

<a name='list-take'></a>
List#take( howmany )
--------------------
Returns a new `List` of the first `howmany` contiguous items from the
instance list.

```js
var ls = List('abcdefg');
var x = ls.take(3);
// x => ['a', 'b', 'c']
```

<a name='list-takewhile'></a>
List#takeWhile( [context,] iterator )
--------------------------------------
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
List#drop( howmany )
--------------------
Returns a new `List` of contiguous items, dropping the first `howmany` items
from the instance list.

```js
var ls = List('abcdefg');
var x = ls.drop(3);
// x => ['d', 'e', 'f', 'g']
```

<a name='list-dropwhile'></a>
List#dropWhile( [context,] iterator )
--------------------------------------
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
List#group( [[context,] iterator] )
----------------------------------
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

var ls = List(['#fff', '#3366ee', 'magenta', '#ccc', 'red'])
var regexHexColor = /^#[abcdef0-9]{3,6}$/i;
var x = ls.group(function(item, index, list) {
  return regexHexColor.test(item)
    ? 'hex'
    : 'named';
});
// x => {
//  hex   : ['#fff', '#3366ee', '#ccc'],
//  named : ['magenta', 'red']
// }
```

<a name='list-partition'></a>
List#partition( [context,] iterator )
--------------------------------------
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
Array.isArray(x); // true
x[0] instanceof List; // true
x[1] instanceof List; // true

// With optional context
var obj = {foo:'bar'};
ls.partition(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-indexof'></a>
List#indexOf( item [, index] )
--------------------
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
List#lastIndexOf( item [, index] )
----------------------------------
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
List#indexIf( [index, [context,]] iterator )
--------------------------------------------
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

// With optional start index
ls = List([2,3,6,4,7,4,6]);
x = ls.indexIf(2, function(item, index, list) {
  return item % 2 !== 0;
});
// x => 4

// With optional context
var obj = {foo:'bar'};
ls.indexIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-lastindexif'></a>
List#lastIndexIf( [index, [context,]] iterator )
------------------------------------------------
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

// With optional start index
ls = List([2,3,6,4,7,4,6]);
x = ls.lastIndexIf(3, function(item, index, list) {
  return item % 2 !== 0;
});
// x => 1

// With optional context
var obj = {foo:'bar'};
ls.lastIndexIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-indicesof'></a>
List#indicesOf( item [, index] )
--------------------------------
Returns the indices of every item in the list matching `item`.

```js
var ls = List('abcaegaatf');
var x = ls.indicesOf('a');
// x => [0, 3, 6, 7]

// With optional index
x = ls.indicesOf('a', 2);
// x => [3, 6, 7]
```

<a name='list-indicesif'></a>
List#indicesIf( [index, [context,]] iterator )
----------------------------------------------
Returns the indices of every item in the list that passes the `iterator
function.

```js
var ls = List([1,2,3,4,5,6,7]);
var x = ls.indicesIf(function(item, index, list) {
  return item % 2 === 0;
});
// x => [1, 3, 5]

// With optional start index
x = ls.indicesIf(2, function(item, index, list) {
  return item % 2 === 0;
});
// x => [3, 5]

// With optional context
var obj = {foo:'bar'};
ls.indicesIf(null, obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-foreach'></a>
List#forEach( [context,] iterator )
------------------------------------
Iterates over the items in the list, invoking the passed `iterator` function
for each item. Returns the list instance.

```js
var ls = List(['Taco', 'Burrito', 'Fajita']);
var x = ls.forEach(function(item, index, list) {
  console.log(item);
});
// Console output:
//  Taco
//  Burrito
//  Fajita
// x === ls => true

// With optional context
var obj = {foo:'bar'};
ls.forEach(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-some'></a>
List#some( [context,] iterator )
---------------------------------
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

// With optional context
var obj = {foo:'bar'};
ls.some(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-every'></a>
List#every( [context,] iterator )
---------------------------------
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

// With optional context
var obj = {foo:'bar'};
ls.every(obj, function(item, index, list) {
  // this => {foo:'bar'}
});
```

<a name='list-reduce'></a>
List#reduce( [initval,] iterator )
-----------------------------------
Reduces the list into a single accumulated value.
Left to right.

```js
var ls = List([1,2,3]);
var x = ls.reduce(function(a, b, index, list) {
  return a + b;
});
// x => 6

x = ls.reduce(function(a, b, index, list) {
  return a >= b ? a : b;
});
// x => 3

// With optional initval
x = ls.reduce([], function(arr, b, index, list) {
  arr.push(b * 10);
  return arr;
});
// x => [10, 20, 30]
```

<a name='list-reduceright'></a>
List#reduceRight( [initval,] iterator )
-----------------------------------
Reduces the list into a single accumulated value.
Right to left.

```js
var ls = List('abc');
var x = ls.reduceRight(function(a, b, index, list) {
  return a + b;
});
// x => 'cba'

// With optional initval
x = ls.reduceRight('---', function(a, b, index, list) {
  return a + b;
});
// x => '---cba'
```

<a name='list-sort'></a>
List#sort( [comparer] )
-----------------------
Sorts the list and returns itself.
Numeric items (numbers, dates) are sorted numerically.
Other types are sorted lixicographically.
If the `comparer` function is passed, this is used to determine sort order.

```js
var ls = List([33, 4, 77, 5, 2, 8]);
var x = ls.sort();
// x => ls => [2, 4, 5, 8, 33, 77]

x = ls.sort(function(a, b) {
  return b - a;
});
// x => ls => [77, 33, 8, 5, 4, 2]
```

<a name='list-reverse'></a>
List#reverse()
--------------
Reverses the order of the items in the list and returns itself.

```js
var ls = List('abc');
var x = ls.reverse();
// x => ls => ['c', 'b', 'a']
```

<a name='list-filter'></a>
List#filter( [context,] iterator )
----------------------------------
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
List#reject( [context,] iterator )
----------------------------------
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

<a name='list-map'></a>
List#map( [context,] iterator )
----------------------------------
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
List#intersperse( obj )
-----------------------
Returns a new `List` with `obj` inserted between every item in the list.

```js
var ls = List([1,2,3,4,5]);
var x = ls.intersperse('|');
// x => [
//  1, '|', 2, '|', 3, '|', 4, '|', 5
// ]
```






[List]:               #list
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


