
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Map', ->
  describe 'constructor', ->
    it 'should create a new instance with or without the `new` keyword', ->
      m1 = new Map 'String', 'Number'
      m2 = Map 'String', 'Number'
      expect(m1).to.be.a Map
      expect(m2).to.be.a Map
      expect(m1).not.to.be m2


  describe 'instance properties', ->
    m = null
    key1 = key2 = null

    beforeEach ->
      m = Map()
      key1 = /foo/
      key2 = /bar/
      m.set key1, new Date
      m.set key2, new Date

    it 'should have a `keys` property', ->
      expect(m.keys.length).to.be 2
      expect(m.keys).to.contain key1
      expect(m.keys).to.contain key2

    it 'should have a `values` property', ->
      expect(m.values.length).to.be 2
      expect(m.values[0]).to.be.a Date
      expect(m.values[1]).to.be.a Date

    it 'should not allow the `keys` property to be modifed', ->
      m.keys = []
      expect(m.keys.length).to.be 2
      m.keys.splice(0)
      expect(m.keys.length).to.be 2

    it 'should have a length property', ->
      expect(m.length).to.be 2

