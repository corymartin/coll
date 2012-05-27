
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
      l1 = TypedList 'String', 'abcd'
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


  describe '#intersect', ->
    l1 = l2 = null

    beforeEach ->
      l1 = TypedList 'String', 'abcabcd'
      l2 = TypedList 'String', 'zxczxaab'

    it 'should return a new list containing items found in both lists', ->
      x = l1.intersect l2
      expect(x).to.be.a TypedList
      expect(x).not.to.be l1
      expect(x).not.to.be l2
      expect(x.length).to.be 3
      expect(x).to.contain 'a'
      expect(x).to.contain 'b'
      expect(x).to.contain 'c'

    it 'should not modify either the instance list or the passed list', ->
      x = l1.intersect l2
      expect(l1).to.be.a TypedList
      expect(l2).to.be.a TypedList
      expect(l1.length).to.be 7
      expect(l2.length).to.be 8


  describe '#intersperse', ->
    l1 = l2 = null

    beforeEach ->
      l1 = TypedList 'Number', [1,2,3]
      l2 = List ['a', new Date, [1,2], true]

    it '''should return a new list with the passed item inserted between
      every item in the original list''', ->
      x = l1.intersperse 0
      expect(x).to.be.a TypedList
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


  describe '#take', ->
    l1 = l2 =null

    beforeEach ->
      l1 = TypedList 'String', 'hello world'
      l2 = List [1,2,3,4,5]

    it 'should return a new list of the first `howMany` items', ->
      x = l1.take 6
      expect(x.join '').to.be 'hello '
      expect(x).to.be.a TypedList

      x = l2.take 2
      expect(x.length).to.be 2
      expect(x[0]).to.be 1
      expect(x[1]).to.be 2
      expect(x).to.be.a List

    it '''should return a copy of the entire list if `howMany` is greater than
      or equal to the length of the list''', ->
      x = l1.take 99
      expect(x.join '').to.be 'hello world'

      x = l1.take 11
      expect(x.join '').to.be 'hello world'

    it 'should return an empty list if `howMany` is less than or equal to zero', ->
      x = l1.take -1
      expect(x.length).to.be 0

      x = l2.take 0
      expect(x.length).to.be 0

    it 'should throw a `TypeError` if `howMany` is not passed', ->
      expect(-> l1.take()).to.throwError (e) ->
        expect(e).to.be.a TypeError

    it 'should throw a `TypeError` if `howMany` is not a number', ->
      expect(-> l1.take('foo')).to.throwError (e) ->
        expect(e).to.be.a TypeError

    it 'should not mutate the instance list', ->
      x = l1.take 3
      expect(l1.join '').to.be 'hello world'


  describe '#takeWhile', ->
    l1 = l2 =null

    beforeEach ->
      l1 = TypedList 'String', 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list of contiguous items from the beginning
      of the list until the iterator function returns false''', ->
      x = l1.takeWhile (val) -> val != ' '
      expect(x.join '').to.be 'hello'
      expect(x).to.be.a TypedList

      x = l2.takeWhile (val) -> val < 4
      expect(x.length).to.be 3
      expect(x[0]).to.be 1
      expect(x[1]).to.be 2
      expect(x[2]).to.be 3
      expect(x).to.be.a List

    it '''should return an empty list if the first item does not pass
      the iterator test''', ->
      x = l2.takeWhile (val) -> val < 0
      expect(x.length).to.be 0

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      l1.takeWhile ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be l1[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be l1
        false

    it 'should not mutate the instance list', ->
      x = l1.takeWhile (val) -> val != ' '
      expect(l1.join '').to.be 'hello world'


  describe '#drop', ->
    l1 = l2 =null

    beforeEach ->
      l1 = TypedList 'String', 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list, dropping the first `howMany` items
      from the instance list''', ->
      x = l1.drop 5
      expect(x.join '').to.be ' world'
      expect(x).to.be.a TypedList

      x = l2.drop 3
      expect(x.length).to.be 2
      expect(x[0]).to.be 4
      expect(x[1]).to.be 5
      expect(x).to.be.a List

    it '''should return a copy of the entire list if `howMany` is less than
      or equal to zero''', ->
      x = l1.drop 0
      expect(x.join '').to.be 'hello world'

      x = l1.drop -1
      expect(x.join '').to.be 'hello world'

    it '''should return an empty list if `howMany` is greater than or equal
      to the length of the list''', ->
      x = l1.drop 11
      expect(x.length).to.be 0

      x = l2.drop 99
      expect(x.length).to.be 0

    it 'should throw a `TypeError` if `howMany` is not passed', ->
      expect(-> l1.drop()).to.throwError (e) ->
        expect(e).to.be.a TypeError

    it 'should throw a `TypeError` if `howMany` is not a number', ->
      expect(-> l1.drop('foo')).to.throwError (e) ->
        expect(e).to.be.a TypeError

    it 'should not mutate the instance list', ->
      x = l1.drop 3
      expect(l1.join '').to.be 'hello world'


  describe '#dropWhile', ->
    l1 = l2 =null

    beforeEach ->
      l1 = TypedList 'String', 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list, dropping the contiguous items from the
      beginning of the list that pass the iterator test''', ->
      x = l1.dropWhile (val) -> val != ' '
      expect(x.join '').to.be ' world'
      expect(x).to.be.a TypedList

      x = l2.dropWhile (val) -> val < 4
      expect(x.length).to.be 2
      expect(x[0]).to.be 4
      expect(x[1]).to.be 5
      expect(x).to.be.a List

    it '''should return a copy of the entire list if the first item does
      not pass the iterator test''', ->
      x = l2.dropWhile (val) -> val < 0
      expect(x.length).to.be 5

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      l1.dropWhile ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be l1[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be l1
        false

    it 'should not mutate the instance list', ->
      x = l1.dropWhile (val) -> val != ' '
      expect(l1.join '').to.be 'hello world'



