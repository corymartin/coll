
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List', ->

  describe 'Instance Properties', ->

    describe 'type', ->
      ls1 = ls2 = null

      beforeEach ->
        ls1 = TypedList 'String', ['a', 'b']
        ls2 = TypedList RegExp

      it 'is the type of the contents in the list', ->
        expect(ls1.type).to.be 'String'
        expect(ls2.type).to.be RegExp

      it 'should not be writable if Object.defineProperty is available', ->
        if Object.defineProperty?
          ls1.type = 'Number'
          ls2.type = Function
          expect(ls1.type).to.be 'String'
          expect(ls2.type).to.be RegExp

      it 'should not be configurable if Object.defineProperty is available', ->
        if Object.defineProperty?
          delete ls1.type
          expect(ls1).to.have.property 'type'


    describe 'length', ->
      ls = null

      beforeEach ->
        ls = TypedList 'String'

      it 'should have an initial value of zero', ->
        expect(ls.length).to.be 0

      it 'should not be configurable', ->
        delete ls.length
        expect(ls).to.have.property 'length'


  describe 'Unmodified methods inherited directly from Array prototype', ->
    expect(TypedList::pop).to.be.a Function
    expect(TypedList::reverse).to.be.a Function
    expect(TypedList::shift).to.be.a Function
    expect(TypedList::join).to.be.a Function


