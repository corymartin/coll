
expect = require 'expect.js'

{Map, Dictionary} = require '../lib/coll'


describe 'Dictionary', ->
  describe 'constructor', ->
    it 'should accept an optional object to initialize the Dictionary', ->
      d = Dictionary {a:2, b:4}
      expect(d.get('a')).to.be 2
      expect(d.get('b')).to.be 4

    it 'should create a new instance with or without the `new` keyword', ->
      d1 = new Dictionary
      d2 = Dictionary()
      expect(d1).to.be.a Dictionary
      expect(d2).to.be.a Dictionary
      expect(d1).not.to.be d2


  describe 'instance properties', ->
    d = null

    beforeEach ->
      d = Dictionary {name:'Fred', age:4000, wife:'Wilma'}

    it 'should have a length property', ->
      expect(d.length).to.be 3

