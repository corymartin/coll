
expect = require 'expect.js'

{List} = require '../lib/coll'


describe 'List Transformation Methods', ->

  describe '#filter', ->
    l1 = null

    beforeEach ->
      l1 = List [1,2,3,4]

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
      l1.filter obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.filter (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#reject', ->
    l1 = null

    beforeEach ->
      l1 = List [1,2,3,4]

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

    it '''should accept a context object for the callback as an
      optional second parameter''', ->
      obj = foo: 'bar'
      l1.reject obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it '''should pass 3 parameters to the callback test:
      current value, index, the list''', ->
      ls = List ['foo']
      ls.reject (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#map', ->
    l1 = null

    beforeEach ->
      l1 = List [1,2,3,4]

    it '''should return a new list composed of the results returned
      by the iterator''', ->
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

    it '''should accept a context object for the callback as an
      optional second parameter''', ->
      obj = foo: 'bar'
      l1.map obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        v

    it '''should pass 3 parameters to the callback test:
      current value, index, the list''', ->
      ls = List ['foo']
      ls.map (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        val


  describe '#intersperse', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List [1,2,3]
      l2 = List ['a', new Date, [1,2], true]

    it '''should return a new list with the passed item inserted between
      every item in the original list''', ->
      x = l1.intersperse 0
      expect(x).to.be.a List
      expect(x.length).to.be 5
      expect(x[0]).to.be 1
      expect(x[1]).to.be 0
      expect(x[2]).to.be 2
      expect(x[3]).to.be 0
      expect(x[4]).to.be 3

      regex = /foo/
      x = l2.intersperse regex
      expect(x).to.be.a List
      expect(x.length).to.be 7
      expect(x[0]).to.be 'a'
      expect(x[1]).to.be regex
      expect(x[2]).to.be.a Date
      expect(x[3]).to.be regex
      expect(x[4]).to.eql [1,2]
      expect(x[5]).to.be regex
      expect(x[6]).to.be true


    it 'should not modify the instance list', ->
      l1.intersperse 0
      l2.intersperse '-'
      expect(l1.length).to.be 3
      expect(l2.length).to.be 4


