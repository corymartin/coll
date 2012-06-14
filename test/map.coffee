
expect = require 'expect.js'

{Map, Dictionary} = require '../lib/coll'


describe 'Map', ->
  describe 'constructor', ->
    it 'should create a new instance with or without the `new` keyword', ->
      m1 = new Map 'String', 'Number'
      m2 = Map 'String', 'Number'
      expect(m1).to.be.a Map
      expect(m2).to.be.a Map
      expect(m1).not.to.be m2


  describe 'instance properties', ->
    describe 'Map', ->
      m = null

      beforeEach ->
        m = Map()

      it 'should have a `keys` property', ->
        key1 = /foo/
        key2 = /bar/
        m.set key1, new Date
        m.set key2, new Date
        expect(m.keys.length).to.be 2
        expect(m.keys).to.contain key1
        expect(m.keys).to.contain key2

      it 'should not allow the `keys` property to be modifed', ->
        m.set /foo/, new Date
        m.set /bar/, new Date
        m.keys = []
        expect(m.keys.length).to.be 2
        m.keys.splice(0)
        expect(m.keys.length).to.be 2

      it 'should have a length property', ->
        m.set /foo/, new Date
        m.set /bar/, new Date
        expect(m.length).to.be 2

