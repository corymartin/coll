
expect = require 'expect.js'

{TypedList, List} = require '../lib/coll'


describe 'TypedList / List', ->

  describe 'Instance Properties', ->

    describe 'type', ->
      ls1 = ls2 = null

      beforeEach ->
        ls1 = TypedList 'String', ['a', 'b']
        ls2 = TypedList RegExp

      it 'should be the type of the contents in the list', ->
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


  describe 'TypedList#_new', ->
    it 'should return a new, empty list of the same constructor and type', ->
      l1 = TypedList 'RegExp', [/fizz/, /buzz/]
      l1new = l1._new()
      expect(l1new).to.be.a TypedList
      expect(l1new.length).to.be 0
      expect(l1new.type).to.be 'RegExp'

    it 'should accept an additional type parameter to return a new type of list', ->
      l1 = TypedList 'String', 'asdf'
      l1new = l1._new 'Number'
      expect(l1new.type).to.be 'Number'

  describe 'List#_new', ->
    it 'should return a new List', ->
      l2 = List [new Date, 'a']
      l2new = l2._new()
      expect(l2new).to.be.a List
      expect(l2new.length).to.be 0
      expect(l2new.type).to.be 'Any'


  describe 'Unmodified methods inherited directly from Array prototype', ->
    expect(TypedList::pop).to.be.a Function
    expect(TypedList::reverse).to.be.a Function
    expect(TypedList::shift).to.be.a Function
    expect(TypedList::join).to.be.a Function


