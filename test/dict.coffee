
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


    describe 'Dictionary', ->
      it 'should accept an optional object to initialize the Dictionary', ->
        d = Dictionary {a:2, b:4}
        expect(d.get('a')).to.be 2
        expect(d.get('b')).to.be 4


  describe 'instance properties', ->

    describe 'TypedDictionary', ->
      d1 = null

      beforeEach ->
        d1 = TypedDictionary()

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




