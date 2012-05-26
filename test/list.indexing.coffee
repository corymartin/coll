
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List Indexing Methods', ->

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

