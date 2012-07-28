
expect = require 'expect.js'

{Map, Dict} = require('../lib/coll')

describe 'Dict', ->
  describe 'constructor', ->
    it 'should accept an optional object to initialize the Dict', ->
      d = Dict {a:2, b:4}
      expect(d.get('a')).to.be 2
      expect(d.get('b')).to.be 4

    it 'should create a new instance with or without the `new` keyword', ->
      d1 = new Dict
      d2 = Dict()
      expect(d1).to.be.a Dict
      expect(d2).to.be.a Dict
      expect(d1).not.to.be d2


  describe 'instance properties', ->
    d = null

    beforeEach ->
      d = Dict {name:'Fred', age:4000, wife:'Wilma'}

    it 'should have a `keys` property', ->
      expect(d.keys.length).to.be 3
      expect(d.keys).to.contain 'name'
      expect(d.keys).to.contain 'age'
      expect(d.keys).to.contain 'wife'

    it 'should have a `values` property', ->
      expect(d.values.length).to.be 3
      expect(d.values).to.contain 'Fred'
      expect(d.values).to.contain 4000
      expect(d.values).to.contain 'Wilma'

    it 'should not allow the `keys` property to be modifed', ->
      d.keys = []
      expect(d.keys.length).to.be 3
      d.keys.splice(0)
      expect(d.keys.length).to.be 3

    it 'should have a length property', ->
      expect(d.length).to.be 3


  describe '#add', ->
    it 'should add key/value pairs via one or more object literals', ->
      d = Dict()
      d.add {aaa:111, bbb:222}
      d.add {ccc:333}, {ddd:444, eee:555}, {fff:666}
      expect(d.length).to.be 6
      expect(d.keys).to.contain 'aaa'
      expect(d.keys).to.contain 'bbb'
      expect(d.keys).to.contain 'ccc'
      expect(d.keys).to.contain 'ddd'
      expect(d.keys).to.contain 'eee'
      expect(d.keys).to.contain 'fff'
      expect(d.values).to.contain 111
      expect(d.values).to.contain 222
      expect(d.values).to.contain 333
      expect(d.values).to.contain 444
      expect(d.values).to.contain 555
      expect(d.values).to.contain 666

    it 'should return `this` for chaining', ->
      d = Dict()
      x = d.add {foo:'boo'}
      expect(x).to.be d

