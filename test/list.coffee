
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
    expect(List::reverse).to.be.a Function
    expect(List::join).to.be.a Function


