
expect = require 'expect.js'

{List} = require('../lib/coll').coll

describe 'List Indexing Methods', ->

  describe '#indexOf', ->
    ls = null

    beforeEach ->
      ls = List ['a', 'a', 'b', 'a']

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

    it 'should find a NaN value', ->
      ls = List [3, 'foo', NaN, /asdf/, NaN, 92]
      index = ls.indexOf NaN
      expect(index).to.be 2


  describe '#lastIndexOf', ->
    ls = null

    beforeEach ->
      ls = List ['a', 'a', 'b', 'a']

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

    it 'should find a NaN value', ->
      ls = List [3, 'foo', NaN, /asdf/, NaN, 92]
      index = ls.lastIndexOf NaN
      expect(index).to.be 4


  describe '#indicesOf', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'aabab'
      l2 = List ['a', 5, 5, 0, 5, false, 'fish', 5, 5, 'bar']

    it 'should return a list of all indexes matching the passed item', ->
      indexes = l1.indicesOf 'a'
      expect(indexes).to.be.a List
      expect(indexes.length).to.be 3
      expect(indexes[0]).to.be 0
      expect(indexes[1]).to.be 1
      expect(indexes[2]).to.be 3

      indexes = l2.indicesOf 5
      expect(indexes.length).to.be 5
      expect(indexes[0]).to.be 1
      expect(indexes[1]).to.be 2
      expect(indexes[2]).to.be 4
      expect(indexes[3]).to.be 7
      expect(indexes[4]).to.be 8

    it 'should accept a start index as an optional second parameter', ->
      indexes = l1.indicesOf 'a', 0
      expect(indexes.length).to.be 3
      indexes = l1.indicesOf 'a', 1
      expect(indexes.length).to.be 2
      indexes = l1.indicesOf 'a', 2
      expect(indexes.length).to.be 1

    it 'should return an empty list if the start index is >= to the list length', ->
      indexes = l1.indicesOf 'a', 5
      expect(indexes.length).to.be 0
      indexes = l1.indicesOf 'a', 99
      expect(indexes.length).to.be 0

    it 'should use an offset from the end of the list if the index is negative', ->
      indexes = l1.indicesOf 'a', -3
      expect(indexes.length).to.be 1
      indexes = l1.indicesOf 'a', -4
      expect(indexes.length).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      indexes = l1.indicesOf 'a', -7
      expect(indexes.length).to.be 3

    it 'should return an empty list if no occurences of the item is found', ->
      indexes = l1.indicesOf 'z'
      expect(indexes).to.be.a List
      expect(indexes.length).to.be 0


  describe '#indexIf', ->
    ls = null

    beforeEach ->
      ls = List [1, 5, 9, 14, 17]

    it 'should return the index of the first item passing the callback test', ->
      index = ls.indexIf (val) -> val % 2 == 0
      expect(index).to.be 3
      index = ls.indexIf (val) -> val % 5 == 0
      expect(index).to.be 1

    it 'should throw an error if the callback is not passed', ->
      expect(-> ls.indexIf()).to.throwError()
      expect(-> ls.indexIf('foo')).to.throwError()

    it 'should accept a starting index as an optional second parameter', ->
      index = ls.indexIf 0, (val) -> val % 2 == 0
      expect(index).to.be 3
      index = ls.indexIf 1, (val) -> val % 2 != 0
      expect(index).to.be 1
      index = ls.indexIf 3, (val) -> val % 2 != 0
      expect(index).to.be 4

    it 'should return -1 if the start index is >= to the list length', ->
      index = ls.indexIf 5, (val) -> val == 17
      expect(index).to.be -1
      index = ls.indexIf 99, (val) -> val == 17
      expect(index).to.be -1

    it 'should use an offset from the end of the list if the start index is negative', ->
      index = ls.indexIf -1, (val) -> val % 2 != 0
      expect(index).to.be 4
      index = ls.indexIf -3, (val) -> val % 2 != 0
      expect(index).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      index = ls.indexIf -99, (val) -> val % 2 != 0
      expect(index).to.be 0
      index = ls.indexIf -99, (val) -> val % 2 == 0
      expect(index).to.be 3

    it 'should accept a context object for the callback as an optional third parameter', ->
      obj = foo: 'bar'
      index = ls.indexIf null, obj, (val) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        false

    it 'should return -1 if the item is not found', ->
      index = ls.indexIf (val) -> val == 999
      expect(index).to.be -1

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.indexIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#lastIndexIf', ->
    ls = null

    beforeEach ->
      ls = List ['a', 'a', 'b', 'a']

    it 'should return the index of the last item passing the callback test', ->
      index = ls.lastIndexIf (val) -> val == 'a'
      expect(index).to.be 3
      index = ls.lastIndexIf (val) -> val == 'b'
      expect(index).to.be 2

    it 'should throw an error if the callback is not passed', ->
      expect(-> ls.lastIndexIf()).to.throwError()
      expect(-> ls.lastIndexIf('foo')).to.throwError()

    it 'should accept an index to search backwards from as an optional second parameter', ->
      index = ls.lastIndexIf 2, (val) -> val == 'a'
      expect(index).to.be 1
      index = ls.lastIndexIf 3, (val) -> val == 'a'
      expect(index).to.be 3
      index = ls.lastIndexIf 0, (val) -> val == 'a'
      expect(index).to.be 0

    it 'should search the entire list if the index is >= to the list length', ->
      index = ls.lastIndexIf 4, (val) -> val == 'a'
      expect(index).to.be 3
      index = ls.lastIndexIf 99, (val) -> val == 'a'
      expect(index).to.be 3

    it 'should use an offset from the end of the list if the index is negative', ->
      index = ls.lastIndexIf -1, (val) -> val == 'a'
      expect(index).to.be 3
      index = ls.lastIndexIf -2, (val) -> val == 'a'
      expect(index).to.be 1

    it 'should return -1 if the calculated index is less than zero', ->
      index = ls.lastIndexIf -99, (val) -> val == 'a'
      expect(index).to.be -1

    it 'should accept a context object for the callback as an optional third parameter', ->
      obj = foo: 'bar'
      index = ls.lastIndexIf null, obj, (val) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        false

    it 'should return -1 if the item is not found', ->
      index = ls.lastIndexIf (val) -> val == 'z'
      expect(index).to.be -1

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.lastIndexIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#indicesIf', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'aabab'
      l2 = List ['a', NaN, null, 0, 5, 'fish', undefined, NaN, 'bar']

    it 'should return a list of all indexes matching the passed item', ->
      indexes = l1.indicesIf (v) -> v == 'a'
      expect(indexes).to.be.a List
      expect(indexes.length).to.be 3
      expect(indexes[0]).to.be 0
      expect(indexes[1]).to.be 1
      expect(indexes[2]).to.be 3

      indexes = l2.indicesIf (v) -> !v
      expect(indexes.length).to.be 5
      expect(indexes[0]).to.be 1
      expect(indexes[1]).to.be 2
      expect(indexes[2]).to.be 3
      expect(indexes[3]).to.be 6
      expect(indexes[4]).to.be 7

    it 'should accept a start index as an optional second parameter', ->
      indexes = l1.indicesIf 0, (v) -> v == 'a'
      expect(indexes.length).to.be 3
      indexes = l1.indicesIf 1, (v) -> v == 'a'
      expect(indexes.length).to.be 2
      indexes = l1.indicesIf 2, (v) -> v == 'a'
      expect(indexes.length).to.be 1

    it 'should return an empty list if the start index is >= to the list length', ->
      indexes = l1.indicesIf 5, (v) -> v == 'a'
      expect(indexes.length).to.be 0
      indexes = l1.indicesIf 99, (v) -> v == 'a'
      expect(indexes.length).to.be 0

    it 'should use an offset from the end of the list if the index is negative', ->
      indexes = l1.indicesIf -3, (v) -> v == 'a'
      expect(indexes.length).to.be 1
      indexes = l1.indicesIf -4, (v) -> v == 'a'
      expect(indexes.length).to.be 2

    it 'should search the entire list if the calculated index is less than zero', ->
      indexes = l1.indicesIf -7, (v) -> v == 'a'
      expect(indexes.length).to.be 3

    it 'should return an empty list if no occurences of the item is found', ->
      indexes = l1.indicesIf (v) -> v == 'z'
      expect(indexes).to.be.a List
      expect(indexes.length).to.be 0

    it 'should accept a context object for the callback as an optional third parameter', ->
      l1 = List 'a'
      obj = foo: 'bar'
      l1.indicesIf null, obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      l1 = List ['foo']
      l1.indicesIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be l1

