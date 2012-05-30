
expect = require 'expect.js'

util = require '../lib/util'


describe 'util function', ->

  describe 'determineSearchIndex()', ->
    it '''should return the passed index if that index is within the
      range of zero to length''', ->
      x = util.determineSearchIndex 3, 8
      expect(x).to.be 3

    it '''should return zero if index is null or undefined''', ->
      x = util.determineSearchIndex null, 8
      expect(x).to.be 0
      x = util.determineSearchIndex undefined, 8
      expect(x).to.be 0

    it '''should return an offset index from the end of the list if the
      index is negative''', ->
      x = util.determineSearchIndex -2, 8
      expect(x).to.be 6

    it '''should return an index of zero if the computed
      index is less than zero''', ->
      x = util.determineSearchIndex -12, 8
      expect(x).to.be 0


  describe 'determineLastSearchIndex()', ->
    it '''should return the passed index (+1) if that index is within the
      range of zero to length''', ->
      x = util.determineLastSearchIndex 5, 8
      expect(x).to.be 6

    it '''should return the length if index is null or undefined''', ->
      x = util.determineLastSearchIndex null, 8
      expect(x).to.be 8
      x = util.determineLastSearchIndex undefined, 8
      expect(x).to.be 8

    it '''should return the length if index is greater than
      or equal to length''', ->
      x = util.determineLastSearchIndex 8, 8
      expect(x).to.be 8
      x = util.determineLastSearchIndex 12, 8
      expect(x).to.be 8

    it '''should return an offset index (+1) from the end of the list if the
      index is negative''', ->
      x = util.determineLastSearchIndex -2, 8
      expect(x).to.be 7

    it '''should return an index of zero if the computed
      index is less than zero''', ->
      x = util.determineLastSearchIndex -12, 8
      expect(x).to.be 0


  describe 'isType()', ->
    it 'should test to see if the passed object is of the passed type', ->
      expect( util.isType 'Number', 4).to.be true
      expect( util.isType Number, new Number).to.be true
      expect( util.isType 'Number', 'z').to.be false
      expect( util.isType 'RegExp', /foo/).to.be true

      class Foo
      class Bar extends Foo
      class Zzz extends Array

      expect( util.isType Foo, new Foo).to.be true
      expect( util.isType Foo, new Bar).to.be true
      expect( util.isType Zzz, new Foo).to.be false


  describe 'isTypeEvery()', ->
    it 'should test if every type in the passed array is of the passed type', ->
      expect( util.isTypeEvery 'Number', [2,3,4] ).to.be true
      expect( util.isTypeEvery 'Number', [2,'a',4] ).to.be false

    it 'should only type check items after the optional index, if passed', ->
      expect( util.isTypeEvery 'Number', [2,'a',4,6], 2 ).to.be true
      expect( util.isTypeEvery 'Number', [2,3,'a',6], 2 ).to.be false




