
expect = require 'expect.js'

{List} = require('../lib/coll')

describe 'List Sub-List Methods', ->

  describe '#take', ->
    l1 = l2 =null

    beforeEach ->
      l1 = List 'hello world'
      l2 = List [1,2,3,4,5]

    it 'should return a new list of the first `howMany` items', ->
      x = l1.take 6
      expect(x.join '').to.be 'hello '
      expect(x).to.be.a List

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
      l1 = List 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list of contiguous items from the beginning
      of the list until the iterator function returns false''', ->
      x = l1.takeWhile (val) -> val != ' '
      expect(x.join '').to.be 'hello'
      expect(x).to.be.a List

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

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      l1.takeWhile obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        false

    it 'should not mutate the instance list', ->
      x = l1.takeWhile (val) -> val != ' '
      expect(l1.join '').to.be 'hello world'


  describe '#drop', ->
    l1 = l2 =null

    beforeEach ->
      l1 = List 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list, dropping the first `howMany` items
      from the instance list''', ->
      x = l1.drop 5
      expect(x.join '').to.be ' world'
      expect(x).to.be.a List

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
      l1 = List 'hello world'
      l2 = List [1,2,3,4,5]

    it '''should return a new list, dropping the contiguous items from the
      beginning of the list that pass the iterator test''', ->
      x = l1.dropWhile (val) -> val != ' '
      expect(x.join '').to.be ' world'
      expect(x).to.be.a List

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

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      l1.dropWhile obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        false

    it 'should not mutate the instance list', ->
      x = l1.dropWhile (val) -> val != ' '
      expect(l1.join '').to.be 'hello world'


  describe '#group', ->
    l1 = l2 = null

    beforeEach ->
      l1 = List [1,2,1,3,2,6]
      l2 = List ['#fff', '#3366ee', 'magenta', '#ccc', 'red']

    it '''should return a hash of lists; each list is composed of matching
      items within the instance list and keys are representative
      of those items''', ->
      x = l1.group()
      expect(x).to.only.have.keys '1','2','3','6'
      expect(x['1']).to.be.a List
      expect(x['2']).to.be.a List
      expect(x['3']).to.be.a List
      expect(x['6']).to.be.a List

      expect(x['1'].length).to.be 2
      expect(x['1'].every (v) -> v == 1).to.be true
      expect(x['2'].length).to.be 2
      expect(x['2'].every (v) -> v == 2).to.be true
      expect(x['3'].length).to.be 1
      expect(x['3'].every (v) -> v == 3).to.be true
      expect(x['6'].length).to.be 1
      expect(x['6'].every (v) -> v == 6).to.be true

    it '''should use the optional iterator function parameter to
      determine the groups''', ->
      regex = /^#[abcdef0-9]{3,6}$/i
      x = l2.group (val) ->
        if regex.test val
          'hex'
        else
          'named'

      expect(x).to.only.have.keys 'hex', 'named'
      expect(x['hex']).to.be.a List
      expect(x['named']).to.be.a List
      expect(x['hex'].length).to.be 3
      expect(x['named'].length).to.be 2
      expect(x['hex']).to.contain '#fff'
      expect(x['hex']).to.contain '#3366ee'
      expect(x['hex']).to.contain '#ccc'
      expect(x['named']).to.contain 'magenta'
      expect(x['named']).to.contain 'red'

    it '''should pass 3 values to the iterator function:
      current value, index, the list''', ->
      i = 0
      l1.group ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be l1[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be l1
        ++i
        'foo'

    it 'should accept a context object for the callback as an
      optional second parameter', ->
      obj = foo: 'bar'
      l1.group obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        v




