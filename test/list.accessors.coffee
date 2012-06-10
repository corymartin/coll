
expect = require 'expect.js'

{List} = require '../lib/coll'


describe 'List Accessor Methods', ->

  describe '#slice', ->
    l1 = null

    beforeEach ->
      l1 = List ['a', 'b', 'c', 'd']

    it '''should return a new copy of the list if
      no parameters are passed''', ->
      lsNew = l1.slice()
      expect(lsNew.length).to.be 4
      expect(lsNew).not.to.be l1

    it '''should return a list of items from the specifed index
      to the specified end index''', ->
      lsNew = l1.slice 1, 3
      expect(lsNew.length).to.be 2
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'

    it '''should return a list of items from the specifed index
      to the end if no second parameter''', ->
      lsNew = l1.slice 1
      expect(lsNew.length).to.be 3
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'
      expect(lsNew[2]).to.be 'd'

    it '''should return a specified number of items from the end of the list
      if only a negative is passed''', ->
      lsNew = l1.slice -3
      expect(lsNew.length).to.be 3
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'
      expect(lsNew[2]).to.be 'd'

    it '''should use the second parameter as an index from the end of the
      list if it is negative''', ->
      lsNew = l1.slice 1, -1
      expect(lsNew.length).to.be 2
      expect(lsNew[0]).to.be 'b'
      expect(lsNew[1]).to.be 'c'

    it 'should not modify the list instance it is being called upon', ->
      lsNew1 = l1.slice()
      lsNew2 = l1.slice 2
      lsNew3 = l1.slice 2, 3

      expect(l1 instanceof List).to.be true
      expect(l1.length).to.be 4
      expect(l1[0]).to.be 'a'
      expect(l1[1]).to.be 'b'
      expect(l1[2]).to.be 'c'
      expect(l1[3]).to.be 'd'

    it 'should return a List instance', ->
      lsNew = l1.slice()
      expect(lsNew instanceof List).to.be true
      lsNew2 = l1.slice 2
      expect(lsNew2 instanceof List).to.be true
      lsNew3 = l1.slice 2, 1
      expect(lsNew3 instanceof List).to.be true


  describe '#concat', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List [1, 2]
      l2 = l1.concat List([3]), List([4,5])

    it 'should merge a list with one or more other iterables', ->
      expect(l2.length).to.be 5
      expect(l2[0]).to.be 1
      expect(l2[1]).to.be 2
      expect(l2[2]).to.be 3
      expect(l2[3]).to.be 4
      expect(l2[4]).to.be 5

      x = l1.concat [3,4]
      expect(x.length).to.be 4

      ls = List 'ab'
      x = ls.concat 'cd'
      expect(x.length).to.be 4
      expect(x[0]).to.be 'a'
      expect(x[1]).to.be 'b'
      expect(x[2]).to.be 'c'
      expect(x[3]).to.be 'd'

    it 'should return a new list of the merged values', ->
      expect(l1).not.to.be l2
      expect(l2 instanceof List).to.be true

    it 'should work on a list of lists', ->
      lsa = List([List(['a', 'b']), List([3, 4])])
      lsb = List([List([new Date])])

      lsc = lsa.concat(lsb)
      expect(lsc.length).to.be 3
      for l in lsc
        expect(l instanceof List).to.be true
      expect(lsc[0].length).to.be 2
      expect(lsc[0]).to.be.a List
      expect(lsc[1].length).to.be 2
      expect(lsc[1]).to.be.a List
      expect(lsc[2].length).to.be 1
      expect(lsc[2]).to.be.a List

    it 'should not modify the instance list', ->
      x = l1.concat(List [3,4])
      expect(l1).to.be.a List
      expect(l1.length).to.be 2


  describe '#count', ->
    ls = null

    beforeEach ->
      ls = List 'aabaaba'

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
      ls = List [2,4,5,8,10,11,14]

    it 'should return the number of occurences that the iterator succeeds', ->
      x = ls.countIf (val) -> val % 2 != 0
      expect(x).to.be 2
      x = ls.countIf (val) -> val % 2 == 0
      expect(x).to.be 5

    it 'should accept a context object for the callback as an
      optional second parameter', ->
      ls = List 'a'
      obj = foo: 'bar'
      ls.countIf ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true
      ), obj

    it 'should pass 3 parameters to the callback test:
      current value, index, the list', ->
      ls = List ['foo']
      ls.countIf (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls


  describe '#contains', ->
    ls = null

    beforeEach ->
      ls = List 'aaba'

    it 'should return true if the passed item is in the list', ->
      result = ls.contains 'b'
      expect(result).to.be true

    it 'should return false if the passed item is not in the list', ->
      result = ls.contains 'z'
      expect(result).to.be false


  describe '#clone', ->
    it 'should return a new list with identical contents', ->
      ls = List 'asdf'
      copy = ls.clone()
      expect(copy.length).to.be ls.length
      expect(copy).not.to.be ls
      expect(copy).to.eql ls


  describe '#toArray', ->
    ls = null

    beforeEach ->
      ls = List 'asd'

    it 'should return an array of the list\'s contents', ->
      arr = ls.toArray()
      expect(arr).to.be.an Array
      expect(arr[0]).to.be 'a'
      expect(arr[1]).to.be 's'
      expect(arr[2]).to.be 'd'

    it 'should not modify the instance list', ->
      ls.toArray()
      expect(ls).to.be.a List
      expect(ls.length).to.be 3


  describe '#get', ->
    it 'should get the item from the list at the specifed index', ->
      ls = List 'asd'
      expect(ls.get 1).to.be 's'

    it 'should return undefined if the list is empty', ->
      ls = List()
      expect(ls.get 0).to.be undefined

    it 'should return undefined if the index is out of range', ->
      ls = List 'asd'
      expect(ls.get 99).to.be undefined
      expect(ls.get -99).to.be undefined


  describe '#first', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcd'
      l2 = List()

    it 'should return the first item from the list', ->
      x = l1.first()
      expect(x).to.be 'a'

    it 'should return `undefined` if the list is empty', ->
      x = l2.first()
      expect(x).to.be undefined


  describe '#last', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcd'
      l2 = List()

    it 'should return the last item from the list', ->
      x = l1.last()
      expect(x).to.be 'd'

    it 'should return `undefined` if the list is empty', ->
      x = l2.last()
      expect(x).to.be undefined


  describe '#unique', ->
    l1 = l2 = l3 = null
    o1 = o2 = null

    beforeEach ->
      o1 = a: 'a', b: 'b'
      o2 = a: 1, b: 2

      l1 = List 'abacbcdd'
      l2 = List [1,2,4,1,3,4,3]
      l3 = List [o1, o2, o1, o2, o2]

    it 'should return a new list of non-duplicate items', ->
      x = l1.unique()
      expect(x).to.be.a List
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
      expect(l3).to.be.a List
      expect(l3.length).to.be 5


  describe '#max', ->
    l1 = l2 = l3 = null
    d1 = new Date 2012, 5, 10, 12, 12, 12
    d2 = new Date 2011, 2, 1, 11, 11, 11
    d3 = new Date 2012, 5, 15, 12, 12, 12
    d4 = new Date 2011, 2, 1, 18, 11, 11

    beforeEach ->
      l1 = List [44,33,4,12,67,33]
      l2 = List [d1, d2, d3, d4]
      l3 = List ['zzzz', 'zzz', 'zzzzzz', 'zzzzz']

    it '''should return the maximum value from the list
      (for ordered types)''', ->
      x = l1.max()
      expect(x).to.be 67
      x = l2.max()
      expect(x).to.be d3

    it '''should use the value returned by the optional iterator function to
      determine the max value''', ->
      x = l3.max (a, b) -> a.length - b.length
      expect(x).to.be 'zzzzzz'

    it 'should accept a context object for the callback as an
      optional second parameter', ->
      obj = foo: 'bar'
      l3.max ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        v.length
      ), obj


  describe '#min', ->
    l1 = l2 = l3 = null
    d1 = new Date 2012, 5, 10, 12, 12, 12
    d2 = new Date 2011, 2, 1, 11, 11, 11
    d3 = new Date 2012, 5, 15, 12, 12, 12
    d4 = new Date 2011, 2, 1, 18, 11, 11

    beforeEach ->
      l1 = List [44,33,4,12,67,33]
      l2 = List [d1, d2, d3, d4]
      l3 = List ['zzzz', 'zzz', 'zzzzzz', 'zzzzz']

    it '''should return the minimum value from the list
      (for ordered types)''', ->
      x = l1.min()
      expect(x).to.be 4
      x = l2.min()
      expect(x).to.be d2

    it '''should use the value returned by the optional iterator function to
      determine the min value''', ->
      x = l3.min (a, b) -> a.length - b.length
      expect(x).to.be 'zzz'

    it 'should accept a context object for the callback as an
      optional second parameter', ->
      obj = foo: 'bar'
      l3.min ((v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        v.length
      ), obj


  describe '#intersect', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List 'abcabcd'
      l2 = List 'zxczxaab'

    it 'should return a new list containing items found in both lists', ->
      x = l1.intersect l2
      expect(x).to.be.a List
      expect(x).not.to.be l1
      expect(x).not.to.be l2
      expect(x.length).to.be 3
      expect(x).to.contain 'a'
      expect(x).to.contain 'b'
      expect(x).to.contain 'c'

    it 'should not modify either the instance list or the passed list', ->
      x = l1.intersect l2
      expect(l1).to.be.a List
      expect(l2).to.be.a List
      expect(l1.length).to.be 7
      expect(l2.length).to.be 8

