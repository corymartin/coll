
expect = require 'expect.js'

{List} = require '../lib/coll'


describe 'List Mutator Methods', ->

  describe '#sort', ->
    it 'should sort numbers numerically', ->
      ls = List [33, 4, 77, 5, 2, 8]
      ls.sort()
      expect(ls[0]).to.be 2
      expect(ls[1]).to.be 4
      expect(ls[2]).to.be 5
      expect(ls[3]).to.be 8
      expect(ls[4]).to.be 33
      expect(ls[5]).to.be 77

      ls = List [1,2,3,2,4,5,2,6,7,8,9]
      ls.sort()
      expect(ls[0]).to.be 1
      expect(ls[1]).to.be 2
      expect(ls[2]).to.be 2
      expect(ls[3]).to.be 2
      expect(ls[4]).to.be 3
      expect(ls[5]).to.be 4
      expect(ls[6]).to.be 5
      expect(ls[7]).to.be 6
      expect(ls[8]).to.be 7
      expect(ls[9]).to.be 8
      expect(ls[10]).to.be 9

      ls2 = List [2.0001, 33.0001, 4.0001, 77.0001, 8.0001]
      ls2.sort()
      expect(ls2[0]).to.be 2.0001
      expect(ls2[1]).to.be 4.0001
      expect(ls2[2]).to.be 8.0001
      expect(ls2[3]).to.be 33.0001
      expect(ls2[4]).to.be 77.0001

      ls3 = List [new Number(5), new Number(2), new Number(7), new Number(3)]
      ls3.sort()
      expect(ls3[0].toString()).to.be '2'
      expect(ls3[1].toString()).to.be '3'
      expect(ls3[2].toString()).to.be '5'
      expect(ls3[3].toString()).to.be '7'

    it 'should sort Dates chronologically', ->
      a = new Date '4/5/2012'
      b = new Date '12/9/2011'
      c = new Date '4/4/2012'
      d = new Date '1/26/2012'

      ls = List [a, b, c, d]
      ls.sort()
      expect(ls[0]).to.be b
      expect(ls[1]).to.be d
      expect(ls[2]).to.be c
      expect(ls[3]).to.be a

      ls2 = List [a, b, c, d]
      ls2.sort()
      expect(ls2[0]).to.be b
      expect(ls2[1]).to.be d
      expect(ls2[2]).to.be c
      expect(ls2[3]).to.be a

    it 'should use Array#sort lexicographic order for other types', ->
      a = /mmm/
      b = /zzz/
      c = /aaa/
      d = /vvv/

      ls = List [a, b, c, d]
      ls.sort()
      expect(ls[0]).to.be c
      expect(ls[1]).to.be a
      expect(ls[2]).to.be d
      expect(ls[3]).to.be b

      ls2 = List [true, false]
      ls2.sort()
      expect(ls2[0]).to.be false
      expect(ls2[1]).to.be true

    it 'should return the sorted instance for chaining', ->
      ls1 = List [2, 33, 4, 77, 8]
      ls2 = List [new Date, new Date('1/1/1980')]
      ls3 = List [true, false, true, false]

      expect(ls1.sort()).to.be ls1
      expect(ls2.sort()).to.be ls2
      expect(ls3.sort()).to.be ls3
      expect(ls1.sort (a, b) -> a < b).to.be ls1


  describe '#add', ->
    ls = null

    beforeEach ->
      ls = List()

    it 'should add a single item to the end of the list', ->
      ls.add 'a'
      expect(ls[0]).to.be 'a'
      ls.add 'b'
      expect(ls[1]).to.be 'b'

    it 'should increment the instance length property', ->
      ls.add 'a'
      expect(ls.length).to.be 1
      ls.add 'b'
      expect(ls.length).to.be 2

    it 'should do nothing if no item is passed', ->
      ls.add()
      expect(ls.length).to.be 0

    it 'should return the instance for chaining', ->
      ls = List()
      expect(ls.add 1).to.be ls

    it 'should add one or more items to the end of the list', ->
      ls = List()
      ls.add 'a', 'b', 'c'
      expect(ls.length).to.be 3
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'c'


  describe '#addRange', ->
    it 'should add one or more items to the end of the list', ->
      ls = List()
      ls.addRange [1,2]
      expect(ls[0]).to.be 1
      expect(ls[1]).to.be 2

    it 'should increment the length property', ->
      ls = List()
      ls.addRange [1,2]
      expect(ls.length).to.be 2

    it 'should accept an "iterable" as it\'s parameter', ->
      ls = List()
      ls.addRange [1,2]
      expect(ls.length).to.be 2

      ls = List()
      ls.addRange 'as'
      expect(ls.length).to.be 2

      ls = List()
      ls.addRange List 'as'
      expect(ls.length).to.be 2

      ls = List()
      foo = ->
        ls.addRange arguments
        expect(ls.length).to.be 2
      foo 'a', 'b'

    it 'should do nothing if no item is passed', ->
      ls = List()
      ls.addRange()
      expect(ls.length).to.be 0

    it 'should return the instance for chaining', ->
      ls = List()
      expect(ls.addRange [1,2]).to.be ls


  describe '#insert', ->
    ls = null

    beforeEach ->
      ls = List 'aaaa'

    it 'should insert an item at the given index', ->
      ls.insert 1, 'b'
      expect(ls.length).to.be 5
      expect(ls[1]).to.be 'b'

    it 'should do nothing if no item is passed', ->
      ls.insert 2
      expect(ls.length).to.be 4

    it 'should throw a `RangeError` if the index is not in the list', ->
      expect(-> ls.insert 99, 'b').to.throwError (e) ->
        expect(e).to.be.a RangeError
      expect(-> ls.insert -99, 'b').to.throwError (e) ->
        expect(e).to.be.a RangeError

    it 'should return the instance for chaining', ->
      expect(ls.insert 2, 'b').to.be ls


  describe '#insertRange', ->
    ls = null

    beforeEach ->
      ls = List 'aaaa'

    it 'should insert a range of items at the given index', ->
      ls.insertRange 1, ['b', 'b']
      expect(ls.length).to.be 6
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'

    it 'should do nothing if no items are passed', ->
      ls.insertRange 2
      expect(ls.length).to.be 4

    it 'should throw a `RangeError` if the index is not in the list', ->
      expect(-> ls.insertRange 99, ['b']).to.throwError (e) ->
        expect(e).to.be.a RangeError
      expect(-> ls.insertRange -99, ['b']).to.throwError (e) ->
        expect(e).to.be.a RangeError

    it 'should accept an "iterable" as it\'s items parameter', ->
      ls = List [1,1]
      ls.insertRange 1, [2,2]
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 1
      expect(ls[1]).to.be 2
      expect(ls[2]).to.be 2
      expect(ls[3]).to.be 1

      ls = List 'aa'
      ls.insertRange 1, 'bb'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls = List 'aa'
      ls.insertRange 1, List 'bb'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls = List 'aa'
      foo = ->
        ls.insertRange 1, arguments
        expect(ls.length).to.be 4
        expect(ls[0]).to.be 'a'
        expect(ls[1]).to.be 'b'
        expect(ls[2]).to.be 'b'
        expect(ls[3]).to.be 'a'
      foo 'b', 'b'

    it 'should return the instance for chaining', ->
      expect(ls.insertRange 2, 'bb').to.be ls


  describe '#clear', ->
    ls = null

    beforeEach ->
      ls = List 'asdf'

    it 'should remove all items from this instance', ->
      ls.clear()
      expect(ls.length).to.be 0
      expect(ls[0]).to.be undefined

    it 'should return the instance for chaining', ->
      x = ls.clear()
      expect(x).to.be ls


  describe '#set', ->
    ls = null

    beforeEach ->
      ls = List 'aaa'

    it 'should set a new value for the item at the given index', ->
      ls.set 1, 'b'
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'

    it 'should throw a `RangeError` if the passed index is not in the list', ->
      expect(-> ls.set 99, 'b').to.throwError (e) ->
        expect(e).to.be.a RangeError

    it 'should return the instance for chaining', ->
      x = ls.set 1, 'b'
      expect(x).to.be ls

    it 'should do nothing if no item is passed', ->
      ls.set 1
      expect(ls.every (v) -> v == 'a').to.be true


  describe '#removeAt', ->
    ls = null

    beforeEach ->
      ls = List 'ababa'

    it 'should remove the item at the passed index', ->
      ls.removeAt 1
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'a'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

    it 'should remove a range of items if the `howMany` parameter is passed', ->
      ls.removeAt 2, 2
      expect(ls.length).to.be 3
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'

    it 'should return the item removed from the list', ->
      x = ls.removeAt 1
      expect(x).to.eql 'b'

    it 'should return a list of removed items if there is more than one', ->
      x = ls.removeAt 1, 2
      expect(x).to.be.a List
      expect(x.length).to.be 2
      expect(x[0]).to.be 'b'
      expect(x[1]).to.be 'a'

    it 'should use an offset from the end of the list if index is negative', ->
      x = ls.removeAt -2
      expect(x).to.be 'b'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'
      expect(ls[3]).to.be 'a'

    it 'should throw a `RangeError` if the index is not in the list', ->
      expect(-> ls.removeAt 9).to.throwError (e) ->
        expect(e).to.be.a RangeError
      expect(-> ls.removeAt -9).to.throwError (e) ->
        expect(e).to.be.a RangeError
      ls = List()
      expect(-> ls.removeAt 0).to.throwError (e) ->
        expect(e).to.be.a RangeError



  describe '#remove', ->
    ls = null

    beforeEach ->
      ls = List 'ababa'

    it 'should remove the first occurence of the passed item from the list', ->
      ls.remove 'b'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'a'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls.remove 'a'
      expect(ls.length).to.be 3
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'

    it 'should return the removed item', ->
      x = ls.remove 'b'
      expect(x).to.be 'b'

    it 'should return `undefined` if the item was was not removed', ->
      x = ls.remove 'z'
      expect(x).to.be undefined

    it 'should return `undefined` if the list is empty', ->
      ls = List()
      x = ls.remove 'a'
      expect(x).to.be undefined


  describe '#removeIf', ->
    ls = null

    beforeEach ->
      ls = List 'ababa'

    it 'should remove the first item to pass the iterator test', ->
      ls.removeIf (val) -> val == 'b'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'a'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls.removeIf (val) -> val == 'a'
      expect(ls.length).to.be 3
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'

    it 'should return the item removed', ->
      x = ls.removeIf (val) -> val == 'b'
      expect(x).to.be 'b'

    it 'should return `undefined` if the item was was not removed', ->
      x = ls.removeIf (val) -> val == 'z'
      expect(x).to.be undefined

    it 'should return `undefined` if the list is empty', ->
      ls = List()
      x = ls.removeIf (val) -> val == 'a'
      expect(x).to.be undefined

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      ls.removeIf (v) ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be ls[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be ls
        i++

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.removeIf obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true


  describe '#removeAll', ->
    ls = null

    beforeEach ->
      ls = List 'ababa'

    it 'should remove every item from the list that passes the iterator test', ->
      ls.removeAll (val) -> val == 'a'
      expect(ls.length).to.be 2
      expect(ls[0]).to.be 'b'
      expect(ls[1]).to.be 'b'

    it 'should return a list of the items removed from the list', ->
      x = ls.removeAll (val) -> val == 'b'
      expect(x).to.be.a List
      expect(x.length).to.be 2
      expect(x[0]).to.be 'b'
      expect(x[1]).to.be 'b'

    it 'should return an empty List if no items are removed', ->
      x = ls.removeAll (val) -> val == 'z'
      expect(x).to.be.a List
      expect(x.length).to.be 0

    it 'should return `[]` if the list is empty', ->
      ls = List()
      x = ls.removeAll (val) -> val == 'a'
      expect(x).to.be.a List
      expect(x.length).to.be 0

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.removeAll obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.removeAll (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true


  describe '#replaceAt', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcd'
      l2 = List 'abcd'

    it 'should replace the item at the given index', ->
      l1.replaceAt(2, 'z')
      expect(l1.length).to.be 4
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'b'
      expect(l1[2]).to.be 'z'
      expect(l1[3]).to.be 'd'

      l2.replaceAt(3, 'z')
      expect(l2.length).to.be 4
      expect(l2[0]).to.be 'a'
      expect(l2[1]).to.be 'b'
      expect(l2[2]).to.be 'c'
      expect(l2[3]).to.be 'z'

    it 'should return the replaced item', ->
      x = l1.replaceAt(2, 'z')
      expect(x).to.be 'c'
      x = l2.replaceAt(2, 'z')
      expect(x).to.be 'c'

    it 'should use an offset from the end of the list if index is negative', ->
      x = l1.replaceAt -2, 'z'
      expect(l1[2]).to.be 'z'

    it 'should throw a `RangeError` if the index is not in the list', ->
      expect(-> l1.replaceAt 9, 'z').to.throwError (e) ->
        expect(e).to.be.a RangeError
      expect(-> l2.replaceAt -9, 'z').to.throwError (e) ->
        expect(e).to.be.a RangeError
      ls = List()
      expect(-> ls.replaceAt 0, 'z').to.throwError (e) ->
        expect(e).to.be.a RangeError


  describe '#replace', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcbd'
      l2 = List 'abcbd'

    it 'should replace the first occurence of `olditem` with `newitem`', ->
      l1.replace 'b', 'z'
      expect(l1.length).to.be 5
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'z'
      expect(l1[2]).to.be 'c'
      expect(l1[3]).to.be 'b'
      expect(l1[4]).to.be 'd'

    it 'should return the replaced item', ->
      x = l1.replace 'd', 'z'
      expect(x).to.be 'd'

    it 'should return `undefined` if the value is not replaced', ->
      x = l2.replace 'x', 'z'
      expect(x).to.be undefined


  describe '#replaceIf', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcbd'
      l2 = List 'abcbd'

    it 'should replace the first item to pass the iterator test with `newitem`', ->
      l1.replaceIf 'z', (v) -> v == 'b'
      expect(l1.length).to.be 5
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'z'
      expect(l1[2]).to.be 'c'
      expect(l1[3]).to.be 'b'
      expect(l1[4]).to.be 'd'

    it 'should return the replaced item', ->
      x = l1.replaceIf 'z', (v) -> v == 'd'
      expect(x).to.be 'd'

    it 'should return `undefined` if the value is not replaced', ->
      x = l2.replaceIf 'z', (v) -> v == 'x'
      expect(x).to.be undefined

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      l1.replaceIf 'z', (v) ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be l1[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be l1
        i++

    it '''should accept a context object for the callback as an optional
      second parameter''', ->
      obj = foo: 'bar'
      l2.replaceIf 'z', obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true


  describe '#replaceAll', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcbd'
      l2 = List 'abcbd'

    it '''should replace all items from the list passing the iterator test
      with `newitem`''', ->
      l1.replaceAll 'z', (v) -> v == 'b'
      expect(l1.length).to.be 5
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'z'
      expect(l1[2]).to.be 'c'
      expect(l1[3]).to.be 'z'
      expect(l1[4]).to.be 'd'

    it 'should return a list of the replaced items', ->
      x = l1.replaceAll 'z', (v) -> v == 'b'
      expect(x).to.be.a List
      expect(x.length).to.be 2
      expect(x[0]).to.be 'b'
      expect(x[1]).to.be 'b'

      x = l2.replaceAll 'z', (v) -> v == 'x'
      expect(x).to.be.a List
      expect(x.length).to.be 0

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      l1.replaceAll 'z', (v) ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be l1[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be l1
        i++

    it '''should accept a context object for the callback as an optional
      second parameter''', ->
      obj = foo: 'bar'
      l2.replaceAll 'z', obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true


  describe '#removeFirst', ->
    it 'should remove the first item from the list', ->
      ls = List 'abc'
      x = ls.removeFirst()
      expect(x).to.be 'a'
      expect(ls.length).to.be 2
      expect(ls[0]).to.be 'b'
      expect(ls[1]).to.be 'c'

    it 'should return `undefined` on an empty list', ->
      ls = List()
      x = ls.removeFirst()
      expect(x).to.be undefined


  describe '#removeLast', ->
    it 'should remove the last item from the list', ->
      ls = List 'abc'
      x = ls.removeLast()
      expect(x).to.be 'c'
      expect(ls.length).to.be 2
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'

    it 'should return `undefined` on an empty list', ->
      ls = List()
      x = ls.removeLast()
      expect(x).to.be undefined


