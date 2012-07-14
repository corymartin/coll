
expect = require 'expect.js'

{Map, Dict} = require('../lib/coll').coll

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

    it 'should throw a `ReferenceError` if the key does not exist', ->
      expect(-> map.get('zzz')).to.throwError (e) ->
        expect(e).to.be.a ReferenceError

      expect(-> dict.get('zzz')).to.throwError (e) ->
        expect(e).to.be.a ReferenceError

    it '''should return the optional default value if the key does not
      exist and the default is passed''', ->
      expect(map.get('zzz', 999)).to.be 999

      expect(dict.get('zzz', 999)).to.be 999


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


  describe '#hasKey', ->
    it 'should return `true` if the key exists', ->
      expect(map.hasKey 'foo').to.be true
      objkey = {yo:'yo'}
      map.set objkey, 'asdf'
      expect(map.hasKey objkey).to.be true

      expect(dict.hasKey 'age').to.be. true

    it 'should return `false` if the key does not exist', ->
      expect(map.hasKey 'zzz').to.be false
      objkey = {yo:'yo'}
      expect(map.hasKey objkey).to.be false

      expect(dict.hasKey 'zoozoo').to.be. false


