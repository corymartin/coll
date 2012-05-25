
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List Accessor Methods', ->

  describe '#slice', ->
    l1 = null

    beforeEach ->
      l1 = TypedList 'String', ['a', 'b', 'c', 'd']

    it 'returns a new copy of the list if no parameters are passed', ->
      lsNew = l1.slice()

      expect(lsNew.length).to.be 4
      expect(lsNew).not.to.be l1

    it 'returns a list of items from the specifed index to the specified end index', ->
      lsNew = l1.slice 1, 3

      expect(lsNew.length).to.be 2
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'

    it 'returns a list of items from the specifed index to the end if no second parameter', ->
      lsNew = l1.slice 1

      expect(lsNew.length).to.be 3
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'
      expect(lsNew[2]).to.be 'd'

    it 'returns a specified number of items from the end of the list if only a negative is passed', ->
      lsNew = l1.slice -3

      expect(lsNew.length).to.be 3
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'
      expect(lsNew[2]).to.be 'd'

    it 'can use the second parameters as an index from the end of the list if it is negative', ->
      lsNew = l1.slice 1, -1

      expect(lsNew.length).to.be 2
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'

    it 'does not modify the list instance it is being called upon', ->
      lsNew1 = l1.slice()
      lsNew2 = l1.slice 2
      lsNew3 = l1.slice 2, 3

      expect(l1 instanceof TypedList).to.be true
      expect(l1.length).to.be 4
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'b'
      expect(l1[2]).to.be 'c'
      expect(l1[3]).to.be 'd'

    it 'returns a TypedList instance', ->
      lsNew = l1.slice()
      expect(lsNew instanceof TypedList).to.be true

      lsNew2 = l1.slice 2
      expect(lsNew2 instanceof TypedList).to.be true

      lsNew3 = l1.slice 2, 1
      expect(lsNew3 instanceof TypedList).to.be true


  describe '#concat', ->
    l1 = l2 = null

    beforeEach ->
      l1 = TypedList 'Number', [1, 2]
      l2 = l1.concat TypedList('Number', [3]), TypedList('Number', [4,5])

    it 'merges a list with one or more other iterables', ->
      expect(l2.length).to.be 5

      expect(l2[0]).to.be 1
      expect(l2[1]).to.be 2
      expect(l2[2]).to.be 3
      expect(l2[3]).to.be 4
      expect(l2[4]).to.be 5

      x = l1.concat [3,4]
      expect(x.length).to.be 4

      ls = TypedList 'String', 'ab'
      x = ls.concat 'cd'
      expect(x.length).to.be 4
      expect(x[0]).to.be 'a'
      expect(x[1]).to.be 'b'
      expect(x[2]).to.be 'c'
      expect(x[3]).to.be 'd'

    it 'returns a new list of the merged values', ->
      expect(l1).not.to.be l2
      expect(l2 instanceof TypedList).to.be true

    it 'works on a list of lists', ->
      lsa = TypedList(TypedList, [TypedList('String', ['a', 'b']), TypedList('Number', [3, 4])])
      lsb = TypedList(TypedList, [TypedList('Date', [new Date])])

      lsc = lsa.concat(lsb)
      expect(lsc.length).to.be 3
      for l in lsc
        expect(l instanceof TypedList).to.be true
      expect(lsc[0].length).to.be 2
      expect(lsc[0].type).to.be 'String'
      expect(lsc[1].length).to.be 2
      expect(lsc[1].type).to.be 'Number'
      expect(lsc[2].length).to.be 1
      expect(lsc[2].type).to.be 'Date'

    it 'should not modify the instance list', ->
      x = l1.concat(TypedList 'Number', [3,4])
      expect(l1).to.be.a TypedList
      expect(l1.length).to.be 2


  describe '#indexOf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', ['a', 'a', 'b', 'a']

    it 'should return the index of the first item matching the passed item', ->
      index = ls.indexOf 'a'
      expect(index).to.be 0
      index = ls.indexOf 'b'
      expect(index).to.be 2

    it 'should accept a start index as an optional second parameter', ->
      index = ls.indexOf 'a', 0
      expect(index).to.be 0
      index = ls.indexOf 'a', 2
      expect(index).to.be 3

    it 'should return -1 if the start index is >= to the list length', ->
      index = ls.indexOf 'a', 4
      expect(index).to.be -1
      index = ls.indexOf 'a', 99
      expect(index).to.be -1

    it 'should use an offset from the end of the list if the start index is negative', ->
      index = ls.indexOf 'a', -1
      expect(index).to.be 3
      index = ls.indexOf 'a', -3
      expect(index).to.be 1

    it 'should search the entire list if the calculated index is less than zero', ->
      index = ls.indexOf 'a', -7
      expect(index).to.be 0
      index = ls.indexOf 'b', -7
      expect(index).to.be 2

    it 'should return -1 if the item is not found', ->
      index = ls.indexOf 'z'
      expect(index).to.be -1


  describe '#lastIndexOf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', ['a', 'a', 'b', 'a']

    it 'should return the index of the last item in the list matching the passed item', ->
      index = ls.lastIndexOf 'a'
      expect(index).to.be 3
      index = ls.lastIndexOf 'b'
      expect(index).to.be 2

    it 'should accept an index to search backwards from as an optional second parameter', ->
      index = ls.lastIndexOf 'a', 2
      expect(index).to.be 1
      index = ls.lastIndexOf 'a', 3
      expect(index).to.be 3
      index = ls.lastIndexOf 'a', 0
      expect(index).to.be 0

    it 'should search the entire list if the index is >= to the list length', ->
      index = ls.lastIndexOf 'a', 4
      expect(index).to.be 3
      index = ls.lastIndexOf 'a', 99
      expect(index).to.be 3

    it 'should use an offset from the end of the list if the index is negative', ->
      index = ls.lastIndexOf 'a', -1
      expect(index).to.be 3
      index = ls.lastIndexOf 'a', -2
      expect(index).to.be 1

    it 'should return -1 if the calculated index is less than zero', ->
      index = ls.lastIndexOf 'a', -99
      expect(index).to.be -1
      index = ls.lastIndexOf 'b', -99
      expect(index).to.be -1

    it 'should return -1 if the item is not found', ->
      index = ls.lastIndexOf 'z'
      expect(index).to.be -1


  describe '#indicesOf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aabab'

    it 'should return an array of all indexes matching the passed item', ->
      indexes = ls.indicesOf 'a'
      expect(indexes).to.be.an Array
      expect(indexes.length).to.be 3
      expect(indexes[0]).to.be 0
      expect(indexes[1]).to.be 1
      expect(indexes[2]).to.be 3

    it 'should accept a start index as an optional second parameter', ->
      indexes = ls.indicesOf 'a', 0
      expect(indexes.length).to.be 3
      indexes = ls.indicesOf 'a', 1
      expect(indexes.length).to.be 2
      indexes = ls.indicesOf 'a', 2
      expect(indexes.length).to.be 1

    it 'should return an empty array if the start index is >= to the list length', ->
      indexes = ls.indicesOf 'a', 5
      expect(indexes.length).to.be 0
      indexes = ls.indicesOf 'a', 99
      expect(indexes.length).to.be 0

    it 'should use an offset from the end of the list if the index is negative', ->
      indexes = ls.indicesOf 'a', -3
      expect(indexes.length).to.be 1
      indexes = ls.indicesOf 'a', -4
      expect(indexes.length).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      indexes = ls.indicesOf 'a', -7
      expect(indexes.length).to.be 3

    it 'should return an empty array if no occurences of the item is found', ->
      indexes = ls.indicesOf 'z'
      expect(indexes).to.be.an Array
      expect(indexes.length).to.be 0


  describe '#indexIf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'Number', [1, 5, 9, 14, 17]

    it 'should return the index of the first item passing the callback test', ->
      index = ls.indexIf (val) -> val % 2 == 0
      expect(index).to.be 3
      index = ls.indexIf (val) -> val % 5 == 0
      expect(index).to.be 1

    it 'should throw an error if the callback is not passed', ->
      expect(-> ls.indexIf()).to.throwError()
      expect(-> ls.indexIf('foo')).to.throwError()

    it 'should accept a starting index as an optional second parameter', ->
      index = ls.indexIf ((val) -> val % 2 == 0), 0
      expect(index).to.be 3
      index = ls.indexIf ((val) -> val % 2 != 0), 1
      expect(index).to.be 1
      index = ls.indexIf ((val) -> val % 2 != 0), 3
      expect(index).to.be 4

    it 'should return -1 if the start index is >= to the list length', ->
      index = ls.indexIf ((val) -> val == 17), 5
      expect(index).to.be -1
      index = ls.indexIf ((val) -> val == 17), 99
      expect(index).to.be -1

    it 'should use an offset from the end of the list if the start index is negative', ->
      index = ls.indexIf ((val) -> val % 2 != 0), -1
      expect(index).to.be 4
      index = ls.indexIf ((val) -> val % 2 != 0), -3
      expect(index).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      index = ls.indexIf ((val) -> val % 2 != 0), -99
      expect(index).to.be 0
      index = ls.indexIf ((val) -> val % 2 == 0), -99
      expect(index).to.be 3

    it 'should accept a context object for the callback as an optional third parameter', ->
      obj = foo: 'bar'
      index = ls.indexIf(
        ((val) ->
          expect(this).to.be obj
          expect(this.foo).to.be 'bar'
          false
        ),
        0,
        obj
      )

    it 'should return -1 if the item is not found', ->
      index = ls.indexIf (val) -> val == 999
      expect(index).to.be -1

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.indexIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#lastIndexIf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', ['a', 'a', 'b', 'a']

    it 'should return the index of the last item passing the callback test', ->
      index = ls.lastIndexIf (val) -> val == 'a'
      expect(index).to.be 3
      index = ls.lastIndexIf (val) -> val == 'b'
      expect(index).to.be 2

    it 'should throw an error if the callback is not passed', ->
      expect(-> ls.lastIndexIf()).to.throwError()
      expect(-> ls.lastIndexIf('foo')).to.throwError()

    it 'should accept an index to search backwards from as an optional second parameter', ->
      index = ls.lastIndexIf ((val) -> val == 'a'), 2
      expect(index).to.be 1
      index = ls.lastIndexIf ((val) -> val == 'a'), 3
      expect(index).to.be 3
      index = ls.lastIndexIf ((val) -> val == 'a'), 0
      expect(index).to.be 0

    it 'should search the entire list if the index is >= to the list length', ->
      index = ls.lastIndexIf ((val) -> val == 'a'), 4
      expect(index).to.be 3
      index = ls.lastIndexIf ((val) -> val == 'a'), 99
      expect(index).to.be 3

    it 'should use an offset from the end of the list if the index is negative', ->
      index = ls.lastIndexIf ((val) -> val == 'a'), -1
      expect(index).to.be 3
      index = ls.lastIndexIf ((val) -> val == 'a'), -2
      expect(index).to.be 1

    it 'should return -1 if the calculated index is less than zero', ->
      index = ls.lastIndexIf ((val) -> val == 'a'), -99
      expect(index).to.be -1
      index = ls.lastIndexIf ((val) -> val == 'b'), -99
      expect(index).to.be -1

    it 'should accept a context object for the callback as an optional third parameter', ->
      obj = foo: 'bar'
      index = ls.lastIndexIf(
        ((val) ->
          expect(this).to.be obj
          expect(this.foo).to.be 'bar'
          false
        ),
        0,
        obj
      )

    it 'should return -1 if the item is not found', ->
      index = ls.lastIndexIf (val) -> val == 'z'
      expect(index).to.be -1

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.lastIndexIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#indicesIf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aabab'

    it 'should return an array of all indexes matching the passed item', ->
      indexes = ls.indicesIf (v) -> v == 'a'
      expect(indexes).to.be.an Array
      expect(indexes.length).to.be 3
      expect(indexes[0]).to.be 0
      expect(indexes[1]).to.be 1
      expect(indexes[2]).to.be 3

    it 'should accept a start index as an optional second parameter', ->
      indexes = ls.indicesIf ((v) -> v == 'a'), 0
      expect(indexes.length).to.be 3
      indexes = ls.indicesIf ((v) -> v == 'a'), 1
      expect(indexes.length).to.be 2
      indexes = ls.indicesIf ((v) -> v == 'a'), 2
      expect(indexes.length).to.be 1

    it 'should return an empty array if the start index is >= to the list length', ->
      indexes = ls.indicesIf ((v) -> v == 'a'), 5
      expect(indexes.length).to.be 0
      indexes = ls.indicesIf ((v) -> v == 'a'), 99
      expect(indexes.length).to.be 0

    it 'should use an offset from the end of the list if the index is negative', ->
      indexes = ls.indicesIf ((v) -> v == 'a'), -3
      expect(indexes.length).to.be 1
      indexes = ls.indicesIf ((v) -> v == 'a'), -4
      expect(indexes.length).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      indexes = ls.indicesIf ((v) -> v == 'a'), -7
      expect(indexes.length).to.be 3

    it 'should return an empty array if no occurences of the item is found', ->
      indexes = ls.indicesIf (v) -> v == 'z'
      expect(indexes).to.be.an Array
      expect(indexes.length).to.be 0

    it 'should accept a context object for the callback as an optional third parameter', ->
      ls = TypedList 'String', 'a'
      obj = foo: 'bar'
      ls.indicesIf ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), 0, obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.indicesIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#count', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aabaaba'

    it 'should return the number of occurences of the passed item', ->
      x = ls.count 'b'
      expect(x).to.be 2
      x = ls.count 'a'
      expect(x).to.be 5
      x = ls.count 'z'
      expect(x).to.be 0

    it 'should return the length of the list if not item is passed', ->
      x = ls.count()
      expect(x).to.be 7


  describe '#countIf', ->
    ls = null

    beforeEach ->
      ls = TypedList 'Number', [2,4,5,8,10,11,14]

    it 'should return the number of occurences that the iterator succeeds', ->
      x = ls.countIf (val) -> val % 2 != 0
      expect(x).to.be 2
      x = ls.countIf (val) -> val % 2 == 0
      expect(x).to.be 5

    it 'should accept a context object for the callback as an optional second parameter', ->
      ls = TypedList 'String', 'a'
      obj = foo: 'bar'
      ls.countIf ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.countIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#contains', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'aaba'

    it 'should return true if the passed item is in the list', ->
      result = ls.contains 'b'
      expect(result).to.be true

    it 'should return false if the passed item is not in the list', ->
      result = ls.contains 'z'
      expect(result).to.be false


  describe '#clone', ->
    it 'should return a new list with identical contents', ->
      ls = TypedList 'String', 'asdf'
      copy = ls.clone()
      expect(copy.length).to.be ls.length
      expect(copy).not.to.be ls
      expect(copy).to.eql ls


  describe '#toArray', ->
    ls = null

    beforeEach ->
      ls = TypedList 'String', 'asd'

    it 'should return an array of the list\'s contents', ->
      arr = ls.toArray()
      expect(arr).to.be.an Array
      expect(arr[0]).to.be 'a'
      expect(arr[1]).to.be 's'
      expect(arr[2]).to.be 'd'

    it 'should not modify the instance list', ->
      ls.toArray()
      expect(ls).to.be.a TypedList
      expect(ls.length).to.be 3


  describe '#get', ->
    it 'should get the item from the list at the specifed index', ->
      ls = TypedList 'String', 'asd'
      expect(ls.get 1).to.be 's'

    it 'should return undefined if the list is empty', ->
      ls = TypedList 'String'
      expect(ls.get 0).to.be undefined

    it 'should return undefined if the index is out of range', ->
      ls = TypedList 'String', 'asd'
      expect(ls.get 99).to.be undefined
      expect(ls.get -99).to.be undefined


  describe '#first', ->
    l1 = l2 = null

    beforeEach ->
      l1 = TypedList 'String', 'abcd'
      l2 = TypedList 'String'

    it 'should return the first item from the list', ->
      x = l1.first()
      expect(x).to.be 'a'

    it 'should return `undefined` if the list is empty', ->
      x = l2.first()
      expect(x).to.be undefined

    it '''should return a list of the first "howMany" items
      if the `howMany` param is passed''', ->
      x = l1.first 2
      expect(x).to.be.a TypedList
      expect(x.length).to.be 2
      expect(x[0]).to.be 'a'
      expect(x[1]).to.be 'b'

    it 'should return an empty list if `howMany` is passed and the list is empty', ->
      x = l2.first 2
      expect(x).to.be.a TypedList
      expect(x.length).to.be 0

    it 'should not modify the instance list', ->
      l1.first()
      l1.first 2
      expect(l1).to.be.a TypedList
      expect(l1.length).to.be 4


  describe '#last', ->
    l1 = l2 = null

    beforeEach ->
      l1 = TypedList 'String', 'abcd'
      l2 = TypedList 'String'

    it 'should return the last item from the list', ->
      x = l1.last()
      expect(x).to.be 'd'

    it 'should return `undefined` if the list is empty', ->
      x = l2.last()
      expect(x).to.be undefined

    it '''should return a list of the last "howMany" items
      if the `howMany` param is passed''', ->
      x = l1.last 2
      expect(x).to.be.a TypedList
      expect(x.length).to.be 2
      expect(x[0]).to.be 'c'
      expect(x[1]).to.be 'd'

    it '''should return an empty list if `howMany` is passed
      and the list is empty''', ->
      x = l2.last 2
      expect(x).to.be.a TypedList
      expect(x.length).to.be 0

    it 'should not modify the instance list', ->
      l1.last()
      l1.last 2
      expect(l1).to.be.a TypedList
      expect(l1.length).to.be 4


  describe '#unique', ->
    l1 = l2 = l3 = null
    o1 = o2 = null

    beforeEach ->
      o1 = a: 'a', b: 'b'
      o2 = a: 1, b: 2

      l1 = TypedList 'String', 'abacbcdd'
      l2 = TypedList 'Number', [1,2,4,1,3,4,3]
      l3 = TypedList 'Object', [o1, o2, o1, o2, o2]

    it 'should return a new list of non-duplicate items', ->
      x = l1.unique()
      expect(x).to.be.a TypedList
      expect(x.length).to.be 4
      expect(x).to.contain 'a'
      expect(x).to.contain 'b'
      expect(x).to.contain 'c'
      expect(x).to.contain 'd'

      x = l2.unique()
      expect(x.length).to.be 4
      expect(x).to.contain 1
      expect(x).to.contain 2
      expect(x).to.contain 3
      expect(x).to.contain 4

      x = l3.unique()
      expect(x.length).to.be 2
      expect(x).to.contain o1
      expect(x).to.contain o2

    it 'should not modify the instance list', ->
      l3.unique()
      expect(l3).to.be.a TypedList
      expect(l3.length).to.be 5




