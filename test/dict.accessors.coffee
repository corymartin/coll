
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Dict / Map Accessor Methods', ->
  map = dict = null

  beforeEach ->
    map = Map()
    map.set 'foo', 10
    map.set 'bar', 33

    dict = Dict {name:'Fred', age:4000}

  describe '#get', ->
    it 'should get the value for the given key', ->
      expect(map.get('foo')).to.be 10
      expect(map.get('bar')).to.be 33

      expect(dict.get('name')).to.be 'Fred'
      expect(dict.get('age')).to.be 4000

  describe '#set', ->
    it 'should add a new key/value pair to the dictionary', ->
      map.set 'zzz', 21
      expect(map.length).to.be 3
      expect(map.get('zzz')).to.be 21

      dict.set 'kid', 'bambam'
      expect(dict.length).to.be 3
      expect(dict.get('kid')).to.be 'bambam'

    it 'should change the value of an existing key', ->
      map.set 'foo', 99
      expect(map.length).to.be 2
      expect(map.get('foo')).to.be 99

      dict.set 'name', 'Barney'
      expect(dict.length).to.be 2
      expect(dict.get('name')).to.be 'Barney'

  describe 'Map#set', ->
    it 'should be able to use objects as keys', ->
      class Foo
      f1 = new Foo
      f2 = new Foo
      f3 = new Foo

      m = Map Foo, 'String'
      m.set f1, 'aaa'
      m.set f2, 'bbb'
      m.set f3, 'ccc'

      expect(m.get(f1)).to.be 'aaa'
      expect(m.get(f2)).to.be 'bbb'
      expect(m.get(f3)).to.be 'ccc'


