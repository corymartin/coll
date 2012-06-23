
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


  describe '#sort', ->
    it 'should sort numbers numerically', ->
      ls = List [33, 4, 77, 5, 2, 8]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be 2
      expect(x[1]).to.be 4
      expect(x[2]).to.be 5
      expect(x[3]).to.be 8
      expect(x[4]).to.be 33
      expect(x[5]).to.be 77

      ls = List [1,2,3,2,4,5,2,6,7,8,9]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be 1
      expect(x[1]).to.be 2
      expect(x[2]).to.be 2
      expect(x[3]).to.be 2
      expect(x[4]).to.be 3
      expect(x[5]).to.be 4
      expect(x[6]).to.be 5
      expect(x[7]).to.be 6
      expect(x[8]).to.be 7
      expect(x[9]).to.be 8
      expect(x[10]).to.be 9

      ls = List [2.0001, 33.0001, 4.0001, 77.0001, 8.0001]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be 2.0001
      expect(x[1]).to.be 4.0001
      expect(x[2]).to.be 8.0001
      expect(x[3]).to.be 33.0001
      expect(x[4]).to.be 77.0001

      ls = List [new Number(5), new Number(2), new Number(7), new Number(3)]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0].toString()).to.be '2'
      expect(x[1].toString()).to.be '3'
      expect(x[2].toString()).to.be '5'
      expect(x[3].toString()).to.be '7'

    it 'should take an optional `comparer` function to determine sorting', ->
      ls = List [6, 2, 4, 8]

      desc = ls.sort (a, b) -> b - a
      expect(desc.toArray()).to.eql [8, 6, 4, 2]

      asc = ls.sort (a, b) -> a - b
      expect(asc.toArray()).to.eql [2, 4, 6, 8]


    it 'should sort Dates chronologically', ->
      a = new Date '4/5/2012'
      b = new Date '12/9/2011'
      c = new Date '4/4/2012'
      d = new Date '1/26/2012'

      ls = List [a, b, c, d]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be b
      expect(x[1]).to.be d
      expect(x[2]).to.be c
      expect(x[3]).to.be a

      ls = List [a, b, c, d]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be b
      expect(x[1]).to.be d
      expect(x[2]).to.be c
      expect(x[3]).to.be a

    it 'should use Array#sort lexicographic order for other types', ->
      a = /mmm/
      b = /zzz/
      c = /aaa/
      d = /vvv/

      ls = List [a, b, c, d]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be c
      expect(x[1]).to.be a
      expect(x[2]).to.be d
      expect(x[3]).to.be b

      ls = List [true, false]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x[0]).to.be false
      expect(x[1]).to.be true

    it 'should return a new list', ->
      ls = List [4,2,9]
      x = ls.sort()
      expect(x).to.be.a List
      expect(x).not.to.be ls


  describe '#reverse', ->
    it 'should return a new list of the instances items in reverse order', ->
      ls = List [5,2,9,4]
      x = ls.reverse()
      expect(x).to.be.a List
      expect(x).not.to.be ls
      expect(x[0]).to.be 4
      expect(x[1]).to.be 9
      expect(x[2]).to.be 2
      expect(x[3]).to.be 5

