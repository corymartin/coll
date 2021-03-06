
expect = require 'expect.js'

{List} = require('../lib/coll')

describe 'List Iteration Methods', ->

  describe 'reduction functions', ->
    ls0items = ls1items = ls3items = null

    beforeEach ->
      ls0items = List()
      ls1items = List ['a']
      ls3items = List ['a', 'b', 'c']

    describe '#reduce', ->
      it 'accumulates each value in the list (L to R) applying a function to them, resulting in a single value', ->
        result = ls3items.reduce (a, b) -> a + b
        expect(result).to.be 'abc'

      it 'returns the only item in the list if there is only one item in the list', ->
        result = ls1items.reduce (a, b) -> a + b
        expect(result).to.be 'a'

      it 'throws an error if there are no items in the list (no init val passed)', ->
        expect(-> ls0items.reduce (a, b) -> a + b).to.throwError /Reduce of empty List with no initial value/

      it 'does not throw an error on an empty list if an initial value is passed', ->
        expect(-> ls0items.reduce 'a', (a, b) -> a + b).not.to.throwError()

      it 'takes an initial value as a parameter', ->
        result = ls3items.reduce 'z', (a, b) -> a + b
        expect(result).to.be 'zabc'
        result = ls1items.reduce 'z', (a, b) -> a + b
        expect(result).to.be 'za'

      it 'returns the initial value parameter if that is passed and the list is empty', ->
        result = ls0items.reduce 'z', (a, b) -> a + b
        expect(result).to.be 'z'

      it 'should pass 4 parameters to the callback: accumulator, current value, index, the list', ->
        ls = List ['foo']
        ls.reduce (acc, val, index, list) ->
          expect(acc).to.be 'foo'
          expect(val).to.be 'foo'
          expect(index).to.be 0
          expect(list).to.be ls


    describe '#reduceRight', ->
      it 'accumulates each value in the list (R to L) applying a function to them, resulting in a single value', ->
        result = ls3items.reduceRight (a, b) -> a + b
        expect(result).to.be 'cba'

      it 'returns the only item in the list if there is only one item in the list', ->
        result = ls1items.reduceRight (a, b) -> a + b
        expect(result).to.be 'a'

      it 'throws an error if there are no items in the list (no init val passed)', ->
        expect(-> ls0items.reduceRight (a, b) -> a + b).to.throwError /Reduce of empty List with no initial value/

      it 'does not throw an error on an empty list if an initial value is passed', ->
        expect(-> ls0items.reduceRight 'a', (a, b) -> a + b).not.to.throwError()

      it 'takes an initial value as a parameter', ->
        result = ls3items.reduceRight 'z', (a, b) -> a + b
        expect(result).to.be 'zcba'
        result = ls1items.reduceRight 'z', (a, b) -> a + b
        expect(result).to.be 'za'

      it 'returns the initial value parameter if that is passed and the list is empty', ->
        result = ls0items.reduceRight 'z', (a, b) -> a + b
        expect(result).to.be 'z'

      it 'should pass 4 parameters to the callback: accumulator, current value, index, the list', ->
        ls = List ['foo']
        ls.reduceRight (acc, val, index, list) ->
          expect(acc).to.be 'foo'
          expect(val).to.be 'foo'
          expect(index).to.be 0
          expect(list).to.be ls


  describe '#forEach', ->
    ls = null

    beforeEach ->
      ls = List ['a', 'b', 'c', 'd']

    it 'should iterate once for each item in list', ->
      cnt = 0
      ls.forEach -> cnt++
      expect(cnt).to.be 4

    it 'should pass 3 values to the iterator function: current value, index, the list', ->
      i = 0
      ls.forEach ->
        expect(arguments.length).to.be 3
        expect(arguments[0]).to.be ls[i]
        expect(arguments[1]).to.be i
        expect(arguments[2]).to.be ls
        i++

    it 'takes an optional context argument as a second parameter', ->
      ls.forEach foo: 'bar', -> expect(this.foo).to.be 'bar'

    it 'should return the instance for chaining', ->
      retval = ls.forEach ->
      expect(retval).to.be ls


  describe '#every', ->
    ls = null

    beforeEach ->
      ls = List [2, 4, 6, 8]

    it 'should return true if every item in the list passes the iterator test', ->
      result = ls.every (val) -> val % 2 == 0
      expect(result).to.be true

    it 'should return false if every item in the list does not pass the iterator test', ->
      ls.insert 2, 7
      result = ls.every (val) -> val % 2 == 0
      expect(result).to.be false

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.every obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.every (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true

    it 'should stop iterating through the list after the iterator test returns false', ->
      ls.insert 2, 7
      cnt = 0
      ls.every (val) ->
        ++cnt
        val % 2 == 0
      expect(cnt).to.be 3


  describe '#some', ->
    ls = null

    beforeEach ->
      ls = List [2, 4, 6, 8]

    it 'should return true if at least one item in the list passes the iterator test', ->
      result = ls.some (val) -> val % 2 == 0
      expect(result).to.be true

    it 'should return false if none of the items in the list pass the iterator test', ->
      result = ls.every (val) -> val % 2 != 0
      expect(result).to.be false

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.some obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.some (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true

    it 'should stop iterating through the list after the iterator test returns true', ->
      ls.insert 2, 7
      cnt = 0
      ls.some (val) ->
        ++cnt
        val % 2 != 0
      expect(cnt).to.be 3


  describe '#find', ->
    ls = null

    beforeEach ->
      ls = List 'aababa'

    it 'should return the first item to pass the iterator test', ->
      result = ls.find (val) -> val == 'b'
      expect(result).to.be 'b'

    it 'should return `undefined` if no items pass the iterator test', ->
      result = ls.find (val) -> val == 'z'
      expect(result).to.be undefined

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.find obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.find (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true

    it 'should stop iterating through the list after the iterator test returns true', ->
      index = null
      cnt = 0
      ls.find (val, i) ->
        index = i
        ++cnt
        val == 'b'
      expect(index).to.be 2
      expect(cnt).to.be 3


  describe '#findLast', ->
    ls = null

    beforeEach ->
      ls = List 'aababa'

    it 'should return the first item from the end of the list to pass the iterator test', ->
      result = ls.findLast (val) -> val == 'b'
      expect(result).to.be 'b'

    it 'should return `undefined` if no items pass the iterator test', ->
      result = ls.findLast (val) -> val == 'z'
      expect(result).to.be undefined

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.findLast obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.findLast (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true

    it 'should stop iterating through the list after the iterator test returns true', ->
      index = null
      cnt = 0
      ls.findLast (val, i) ->
        index = i
        ++cnt
        val == 'b'
      expect(index).to.be 4
      expect(cnt).to.be 2


  describe '#findAll', ->
    ls = null

    beforeEach ->
      ls = List 'aababa'

    it 'should return a new list of all items to pass the iterator test', ->
      result = ls.findAll (val) -> val == 'b'
      expect(result).to.be.a List
      expect(result.length).to.be 2
      expect(result.every (v) -> v == 'b').to.be true

    it 'should return an empty list if no items pass the iterator test', ->
      result = ls.findAll (val) -> val == 'z'
      expect(result.length).to.be 0

    it 'should accept a context object for the callback as an optional second parameter', ->
      obj = foo: 'bar'
      ls.findAll obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it 'should pass 3 parameters to the callback test: current value, index, the list', ->
      ls = List ['foo']
      ls.findAll (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true


  describe '#partition', ->
    it '''should return an array of two lists, the first composed of items
      passing the iterator test, the second those that failed''', ->
      ls = List [1,2,3,4]
      p = ls.partition (val) -> val % 2 == 0
      expect(p).to.be.an Array
      expect(p.length).to.be 2
      pass = p[0]
      fail = p[1]
      expect(pass).to.be.a List
      expect(fail).to.be.a List
      expect(pass[0]).to.be 2
      expect(pass[1]).to.be 4
      expect(fail[0]).to.be 1
      expect(fail[1]).to.be 3

    it '''should accept a context object for the callback as
      an optional second parameter''', ->
      ls = List 'a'
      obj = foo: 'bar'
      ls.partition obj, (v) ->
        expect(this).to.be obj
        expect(this.foo).to.be 'bar'
        true

    it '''should pass 3 parameters to the callback test:
      current value, index, the list''', ->
      ls = List ['foo']
      ls.partition (val, index, list) ->
        expect(val).to.be 'foo'
        expect(index).to.be 0
        expect(list).to.be ls
        true


