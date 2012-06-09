
expect = require 'expect.js'

{TypedDictionary, Dictionary} = require '../lib/coll'


describe 'Dictionary', ->

  describe 'constructor', ->

    describe 'TypedDictionary', ->
      it 'should create a new instance with or without the `new` keyword', ->
        d1 = new TypedDictionary 'String', 'Number'
        d2 = TypedDictionary 'String', 'Number'
        expect(d1).to.be.a TypedDictionary
        expect(d2).to.be.a TypedDictionary
        expect(d1).not.to.be d2

      it 'should require a key and value type', ->
        expect(-> TypedDictionary()).to.throwError (e) ->
          expect(e).to.be.a TypeError
          expect(e.message).to.be 'Parameter `keyType` is required'
        expect(-> TypedDictionary 'String').to.throwError (e) ->
          expect(e).to.be.a TypeError
          expect(e.message).to.be 'Parameter `valType` is required'
        expect(-> TypedDictionary 'String', 'RegExp').to.not.throwError()


    describe 'Dictionary', ->
      it 'should accept an optional object to initialize the Dictionary', ->
        d = Dictionary {a:2, b:4}
        expect(d.get('a')).to.be 2
        expect(d.get('b')).to.be 4


  describe 'instance properties', ->

    describe 'TypedDictionary', ->
      d1 = d2 = null

      beforeEach ->
        d1 = TypedDictionary 'RegExp', Date
        d2 = TypedDictionary Array, 'Number'

      it 'should have a `keyType` property', ->
        expect(d1.keyType).to.be 'RegExp'
        expect(d2.keyType).to.be Array

      it 'should have a `valType` property', ->
        expect(d1.valType).to.be Date
        expect(d2.valType).to.be 'Number'

      it 'should not allow type properties to be overwritten', ->
        d1.keyType = String
        d1.valType = 'Function'
        expect(d1.keyType).to.be 'RegExp'
        expect(d1.valType).to.be Date

      it 'should have a `keys` property', ->
        key1 = /foo/
        key2 = /bar/
        d1.set key1, new Date
        d1.set key2, new Date
        expect(d1.keys.length).to.be 2
        expect(d1.keys).to.contain key1
        expect(d1.keys).to.contain key2

      it 'should not allow the `keys` property to be modifed', ->
        d1.set /foo/, new Date
        d1.set /bar/, new Date
        d1.keys = []
        expect(d1.keys.length).to.be 2
        d1.keys.splice(0)
        expect(d1.keys.length).to.be 2

      it 'should have a length property', ->
        d1.set /foo/, new Date
        d1.set /bar/, new Date
        expect(d1.length).to.be 2

    describe 'Dictionary', ->
      d1 = null

      beforeEach ->
        d1 = Dictionary {name:'Fred', age:4000, wife:'Wilma'}

      it 'should have a length property', ->
        expect(d1.length).to.be 3




