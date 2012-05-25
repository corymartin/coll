
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List Mutator Methods', ->

  describe '#push', ->
    it 'adds one or more items to the end of the list', ->
      ls = TypedList 'String'
      ls.push 'a'
      ls.push 'b', 'c'
      expect(ls.length).to.be 3
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'c'

    it 'type checks the values it adds', ->
      lsS = TypedList 'String'
      expect(-> lsS.push 'a', 'b', 34).to.throwError /Expected String/
      expect(-> lsS.push 'a', 'b', 'a').not.to.throwError()

      lsN = TypedList 'Number'
      expect(-> lsN.push 1, 'b', 3).to.throwError /Expected Number/
      expect(-> lsN.push 1, 2, 3).not.to.throwError()

      class Foo
      class Bar

      lsO = TypedList Foo
      expect(-> lsO.push new Foo, 34, new Foo).to.throwError()
      expect(-> lsO.push new Foo, new Bar, new Foo).to.throwError()
      expect(-> lsO.push new Foo, new Foo, new Foo).not.to.throwError()

    it 'it returns the new length of the list', ->
      ls = TypedList 'Number', [2, 4]
      expect(ls.push 6).to.be 3
      expect(ls.push 8, 10).to.be 5

    it 'does not alter list to another type', ->
      ls = TypedList 'Number', [2, 4]
      ls.push 4, 6
      expect(ls instanceof TypedList).to.be true
      expect(ls.type == 'Number').to.be true


  #XXX
  describe '#unshift', ->
    it 'add one or more items to the beginning of the list', ->
      ls = TypedList 'String', ['a', 'b', 'c']

      ls.unshift 'd'
      ls.unshift 'e', 'f'

      expect(ls.length).to.be 6

      expect(ls[0]).to.be 'e'
      expect(ls[1]).to.be 'f'
      expect(ls[2]).to.be 'd'
      expect(ls[3]).to.be 'a'
      expect(ls[4]).to.be 'b'
      expect(ls[5]).to.be 'c'

    it 'type checks the values it adds', ->
      lsS = TypedList 'String'

      expect(-> lsS.unshift 'a', 'b', 34).to.throwError /Expected String/
      expect(-> lsS.unshift 'a', 'b', 'a').not.to.throwError()

      lsN = TypedList 'Number'

      expect(-> lsN.unshift 1, 'b', 3).to.throwError /Expected Number/
      expect(-> lsN.unshift 1, 2, 3).not.to.throwError()

      class Foo
      class Bar

      lsO = TypedList Foo

      expect(-> lsO.unshift new Foo, 34, new Foo).to.throwError()
      expect(-> lsO.unshift new Foo, new Bar, new Foo).to.throwError()
      expect(-> lsO.unshift new Foo, new Foo, new Foo).not.to.throwError()

    it 'it returns the new length of the list', ->
      ls = TypedList 'Number', [2, 4]

      expect(ls.unshift 6).to.be 3
      expect(ls.unshift 8, 10).to.be 5

    it 'does not alter list to another type', ->
      ls = TypedList 'Number', [2, 4]
      ls.unshift 4, 6

      expect(ls instanceof TypedList).to.be true
      expect(ls.type == 'Number').to.be true


  describe '#splice', ->
    ls1 = ls2 = ls3 = null

    beforeEach ->
      ls1 = TypedList 'String', ['a', 'b', 'c']
      ls2 = TypedList 'Number', [2, 4, 6, 8]
      ls3 = TypedList 'String', ['aa', 'bb', 'cc', 'dd', 'ee']

    it 'adds items to the list at specified index', ->
      ls1.splice 3, 0, 'x', 'y', 'z'

      expect(ls1.length).to.be 6
      expect(ls1[3]).to.be 'x'

    it 'adds items to the list and removes a specified number items', ->
      ls1.splice 2, 1, 'x', 'y', 'z'

      expect(ls1.length).to.be 5
      expect(ls1[0]).to.be 'a'
      expect(ls1[1]).to.be 'b'
      expect(ls1[2]).to.be 'x'
      expect(ls1[3]).to.be 'y'
      expect(ls1[4]).to.be 'z'

    it 'removes items from the list after a specified index', ->
      ls2.splice 1

      expect(ls2.length).to.be 1
      expect(ls2[0]).to.be 2

    it 'removes a specified number of items from the list at a specified index', ->
      ls2.splice 1, 2

      expect(ls2.length).to.be 2
      expect(ls2[0]).to.be 2
      expect(ls2[1]).to.be 8

    it 'does not change the list to an array', ->
      ls1.splice 3, 0, 'x', 'y', 'z'

      expect(ls1 instanceof TypedList).to.be true

    it 'returns a list of the elements removed', ->
      lsNew = ls1.splice 1, 2, 'x', 'y', 'z'

      expect(lsNew instanceof TypedList).to.be true
      expect(lsNew.length).to.be 2
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'

      lsNew2 = ls2.splice 0, 2

      expect(lsNew2 instanceof TypedList).to.be true
      expect(lsNew2.length).to.be 2
      expect(lsNew2[0]).to.be 2
      expect(lsNew2[1]).to.be 4

      lsNew3 = ls3.splice 2

      expect(lsNew3 instanceof TypedList).to.be true
      expect(lsNew3.length).to.be 3
      expect(lsNew3[0]).to.be 'cc'
      expect(lsNew3[1]).to.be 'dd'
      expect(lsNew3[2]).to.be 'ee'

    it 'checks the type of items added to the list', ->
      expect(-> ls2.splice 1, 0, 'a').to.throwError /Expected Number/
      expect(-> ls2.splice 1, 0, 20, 'a').to.throwError /Expected Number/
      expect(-> ls2.splice 1, 0, 40, 60).not.to.throwError()


  describe '#sort', ->
    it 'sorts Numbers numerically', ->
      ls = TypedList 'Number', [2, 33, 4, 77, 8]
      ls.sort()
      expect(ls[0]).to.be 2
      expect(ls[1]).to.be 4
      expect(ls[2]).to.be 8
      expect(ls[3]).to.be 33
      expect(ls[4]).to.be 77

      ls2 = TypedList 'Number', [2.0001, 33.0001, 4.0001, 77.0001, 8.0001]
      ls2.sort()
      expect(ls2[0]).to.be 2.0001
      expect(ls2[1]).to.be 4.0001
      expect(ls2[2]).to.be 8.0001
      expect(ls2[3]).to.be 33.0001
      expect(ls2[4]).to.be 77.0001

      ls3 = TypedList Number, [new Number(5), new Number(2), new Number(7), new Number(3)]
      ls3.sort()
      expect(ls3[0].toString()).to.be '2'
      expect(ls3[1].toString()).to.be '3'
      expect(ls3[2].toString()).to.be '5'
      expect(ls3[3].toString()).to.be '7'

    it 'sorts Dates chronologically', ->
      a = new Date '4/5/2012'
      b = new Date '12/9/2011'
      c = new Date '4/4/2012'
      d = new Date '1/26/2012'

      ls = TypedList 'Date', [a, b, c, d]
      ls.sort()
      expect(ls[0]).to.be b
      expect(ls[1]).to.be d
      expect(ls[2]).to.be c
      expect(ls[3]).to.be a

      ls2 = TypedList Date, [a, b, c, d]
      ls2.sort()
      expect(ls2[0]).to.be b
      expect(ls2[1]).to.be d
      expect(ls2[2]).to.be c
      expect(ls2[3]).to.be a

    it 'uses Array::sort lexicographic order for other types', ->
      a = /mmm/
      b = /zzz/
      c = /aaa/
      d = /vvv/

      ls = TypedList 'RegExp', [a, b, c, d]
      ls.sort()
      expect(ls[0]).to.be c
      expect(ls[1]).to.be a
      expect(ls[2]).to.be d
      expect(ls[3]).to.be b

      ls2 = TypedList 'Boolean', [true, false]
      ls2.sort()
      expect(ls2[0]).to.be false
      expect(ls2[1]).to.be true

    it 'should return the sorted instance for chaining', ->
      ls1 = TypedList 'Number', [2, 33, 4, 77, 8]
      ls2 = TypedList 'Date', [new Date, new Date('1/1/1980')]
      ls3 = TypedList 'Boolean', [true, false, true, false]

      expect(ls1.sort()).to.be ls1
      expect(ls2.sort()).to.be ls2
      expect(ls3.sort()).to.be ls3
      expect(ls1.sort (a, b) -> a < b).to.be ls1


  describe '#add', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String'

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

    it 'should check the type of the item added', ->
      expect(-> ls.add 99).to.throwError /Expected String/

    it 'should do nothing if no item is passed', ->
      ls.add()
      expect(ls.length).to.be 0

    it 'should return the instance for chaining', ->
      ls = TypedList 'Number'
      expect(ls.add 1).to.be ls


  describe '#addRange', ->
    it 'should add one or more items to the end of the list', ->
      ls = TypedList 'Number'
      ls.addRange [1,2]
      expect(ls[0]).to.be 1
      expect(ls[1]).to.be 2

    it 'should increment the length property', ->
      ls = TypedList 'Number'
      ls.addRange [1,2]
      expect(ls.length).to.be 2

    it 'should check the type of each item to be added', ->
      ls = TypedList 'Number'
      expect(-> ls.addRange ['a']).to.throwError (e) ->
        expect(e).to.be.a TypeError
        expect(e.message).to.be 'Expected Number'

    it 'should accept an "iterable" as it\'s parameter', ->
      ls = TypedList 'Number'
      ls.addRange [1,2]
      expect(ls.length).to.be 2

      ls = TypedList 'String'
      ls.addRange 'as'
      expect(ls.length).to.be 2

      ls = TypedList 'String'
      ls.addRange List 'as'
      expect(ls.length).to.be 2

      ls = TypedList 'String'
      foo = ->
        ls.addRange arguments
        expect(ls.length).to.be 2
      foo 'a', 'b'

    it 'should do nothing if no item is passed', ->
      ls = TypedList 'String'
      ls.addRange()
      expect(ls.length).to.be 0

    it 'should return the instance for chaining', ->
      ls = TypedList 'Number'
      expect(ls.addRange [1,2]).to.be ls


  describe '#insert', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aaaa'

    it 'should insert an item at the given index', ->
      ls.insert 1, 'b'
      expect(ls.length).to.be 5
      expect(ls[1]).to.be 'b'

    it 'should do nothing if no item is passed', ->
      ls.insert 2
      expect(ls.length).to.be 4

    it 'should add the item to the end of the list if the index is out of range', ->
      ls.insert 99, 'b'
      expect(ls[4]).to.be 'b'
      ls.insert -99, 'c'
      expect(ls[5]).to.be 'b'

    it 'should return the instance for chaining', ->
      expect(ls.insert 2, 'b').to.be ls


  describe '#insertRange', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aaaa'

    it 'should insert a range of items at the given index', ->
      ls.insertRange 1, ['b', 'b']
      expect(ls.length).to.be 6
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'

    it 'should do nothing if no items are passed', ->
      ls.insertRange 2
      expect(ls.length).to.be 4

    it 'should add the item to the end of the list if the index is out of range', ->
      ls.insertRange 99, ['b']
      expect(ls[4]).to.be 'b'
      ls.insertRange -99, ['c']
      expect(ls[5]).to.be 'b'

    it 'should accept an "iterable" as it\'s items parameter', ->
      ls = TypedList 'Number', [1,1]
      ls.insertRange 1, [2,2]
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 1
      expect(ls[1]).to.be 2
      expect(ls[2]).to.be 2
      expect(ls[3]).to.be 1

      ls = TypedList 'String', 'aa'
      ls.insertRange 1, 'bb'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls = TypedList 'String', 'aa'
      ls.insertRange 1, List 'bb'
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'b'
      expect(ls[3]).to.be 'a'

      ls = TypedList 'String', 'aa'
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
      ls = TypedList 'String', 'asdf'

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
      ls = TypedList 'String', 'aaa'

    it 'should set a new value for the item at the given index', ->
      ls.set 1, 'b'
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'

    it 'should return `false` if the new item is not passed', ->
      x = ls.set 1
      expect(x).to.be false

    it 'should not mutate the list if the new item is not passed', ->
      ls.set 1
      expect(ls.every (v) -> v == 'a').to.be true

    it 'should return `false` if the passed index is not in the list', ->
      x = ls.set 99, 'b'
      expect(x).to.be false

    it 'should check the type of the new item', ->
      expect(-> ls.set 1, 5).to.throwError /Expected String/

    it 'should return `true` if the item is successfully set', ->
      x = ls.set 1, 'b'
      expect(x).to.be true


  describe '#removeAt', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'ababa'

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

    it 'should return the number of items removed from the list', ->
      x = ls.removeAt 1
      expect(x).to.be 1

      x = ls.removeAt 1, 2
      expect(x).to.be 2

    it 'should not remove any items if the index is >= the list length', ->
      x = ls.removeAt 99
      expect(x).to.be 0

    it 'should use an offset from the end of the list if the index is negative', ->
      x = ls.removeAt -2
      expect(ls.length).to.be 4
      expect(ls[0]).to.be 'a'
      expect(ls[1]).to.be 'b'
      expect(ls[2]).to.be 'a'
      expect(ls[3]).to.be 'a'

    it 'should not remove anything if the calculated index is less than zero', ->
      x = ls.removeAt -99
      expect(x).to.be 0

    it 'should return `0` if the list is empty', ->
      ls = TypedList 'String'
      x = ls.removeAt 1
      expect(x).to.be 0


  describe '#remove', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'ababa'

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

    it 'should return `true` if the item was successfully removed', ->
      x = ls.remove 'b'
      expect(x).to.be true

    it 'should return `false` if the item was was not removed', ->
      x = ls.remove 'z'
      expect(x).to.be false

    it 'should return `false` if the list is empty', ->
      ls = TypedList 'String'
      x = ls.remove 'a'
      expect(x).to.be false


  describe '#removeIf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'ababa'

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

    it 'should return `true` if the item was successfully removed', ->
      x = ls.removeIf (val) -> val == 'b'
      expect(x).to.be true

    it 'should return `false` if the item was was not removed', ->
      x = ls.removeIf (val) -> val == 'z'
      expect(x).to.be false

    it 'should return `false` if the list is empty', ->
      ls = TypedList 'String'
      x = ls.removeIf (val) -> val == 'a'
      expect(x).to.be false


  describe '#removeAll', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'ababa'

    it 'should remove every item from the list that passes the iterator test', ->
      ls.removeAll (val) -> val == 'a'
      expect(ls.length).to.be 2
      expect(ls[0]).to.be 'b'
      expect(ls[1]).to.be 'b'

    it 'should return the number of items removed from the list', ->
      x = ls.removeAll (val) -> val == 'b'
      expect(x).to.be 2

    it 'should return `0` if no items are removed', ->
      x = ls.removeAll (val) -> val == 'z'
      expect(x).to.be 0

    it 'should return `0` if the list is empty', ->
      ls = TypedList 'String'
      x = ls.removeAll (val) -> val == 'a'
      expect(x).to.be 0

    it 'should accept a context object for the callback as an optional second parameter', ->
      ls = TypedList 'String', 'a'
      obj = foo: 'bar'
      ls.removeAll ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.removeAll (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true




