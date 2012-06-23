
expect = require 'expect.js'

{List} = require '../lib/coll'


describe 'List', ->

  describe 'Instance Properties', ->
    describe 'length', ->
      ls = null

      beforeEach ->
        ls = List()

      it 'should have an initial value of zero', ->
        expect(ls.length).to.be 0

      it 'should not be configurable', ->
        delete ls.length
        expect(ls).to.have.property 'length'


  describe 'Unmodified methods borrowed from Array prototype', ->
    expect(List::join).to.be.a Function


  describe 'Static Functions', ->
    describe 'range()', ->
      it '''should return a range of numbers from `start`
        up to and including `end`''', ->
        ls = List.range 4, 8
        expect(ls.length).to.be 5
        expect(ls[0]).to.be 4
        expect(ls[1]).to.be 5
        expect(ls[2]).to.be 6
        expect(ls[3]).to.be 7
        expect(ls[4]).to.be 8

      it '''should return a list form `0` to `start`
        if only `start` is passed''', ->
        ls = List.range 4
        expect(ls.length).to.be 5
        expect(ls[0]).to.be 0
        expect(ls[1]).to.be 1
        expect(ls[2]).to.be 2
        expect(ls[3]).to.be 3
        expect(ls[4]).to.be 4

      it 'should increment by `step` if it is passed', ->
        ls = List.range 0, 10, 2
        expect(ls.length).to.be 6
        expect(ls[0]).to.be 0
        expect(ls[1]).to.be 2
        expect(ls[2]).to.be 4
        expect(ls[3]).to.be 6
        expect(ls[4]).to.be 8
        expect(ls[5]).to.be 10

      it 'should throw a `TypeError` if `step` is not greater than zero', ->
        expect(-> List.range 0, 5, 0).to.throwError (e) ->
          expect(e).to.be.a TypeError

