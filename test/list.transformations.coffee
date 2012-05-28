
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List Transformation Methods', ->

  describe '#filter', ->
    l1 = null

    beforeEach ->
      l1 = TypedList 'Number', [1,2,3,4]

    it 'should return a new list containing only the elements that pass the iterator test', ->
      evens = l1.filter (v) -> v % 2 == 0
      expect(evens.length).to.be 2
      expect(evens[0]).to.be 2
      expect(evens[1]).to.be 4

    it 'should not modify the instance list', ->
      l1.filter (v) -> v % 2 == 0
      expect(l1.length).to.be 4
      expect(l1[0]).to.be 1
      expect(l1[1]).to.be 2

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      l1.filter ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.filter (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#reject', ->
    l1 = null

    beforeEach ->
      l1 = TypedList 'Number', [1,2,3,4]

    it 'should return a new list containing only the elements that fail the iterator test', ->
      evens = l1.reject (v) -> v % 2 == 0
      expect(evens.length).to.be 2
      expect(evens[0]).to.be 1
      expect(evens[1]).to.be 3

    it 'should not modify the instance list', ->
      l1.reject (v) -> v % 2 == 0
      expect(l1.length).to.be 4
      expect(l1[0]).to.be 1
      expect(l1[1]).to.be 2

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      l1.reject ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.reject (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#map', ->
    l1 = null

    beforeEach ->
      l1 = TypedList 'Number', [1,2,3,4]

    it 'should return a new list composed of the results returned by the iterator', ->
      x = l1.map (v) -> v * 10
      expect(x[0]).to.be 10
      expect(x[1]).to.be 20
      expect(x[2]).to.be 30
      expect(x[3]).to.be 40

    it 'should not modify the instance list', ->
      x = l1.map (v) -> v * 10
      expect(l1[0]).to.be 1
      expect(l1[1]).to.be 2
      expect(l1[2]).to.be 3
      expect(l1[3]).to.be 4

    it 'should return a list with the same type as the instance list', ->
      x = l1.map (v) -> v * 10
      expect(x.type).to.be 'Number'

    it 'should return a list of a new type if the optional type paramater is used (TypedList only)', ->
      x = l1.map ((v) -> "_#{v}_"), null, 'String'
      expect(x.type).to.be 'String'

      l = List [1,2,3,4]
      x = l.map ((v) -> v), null, 'String'
      expect(x.type).to.be 'Any'

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      l1.map ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        v
      ), obj

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = TypedList 'String', ['foo']
      ls.map (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        val


