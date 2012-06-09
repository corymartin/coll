
expect = require 'expect.js'

{TypedDictionary, Dictionary} = require '../lib/coll'



describe 'Dictionary Accessor Methods', ->
  d1 = d2 = null

  beforeEach ->
    d1 = TypedDictionary 'String', 'Number'
    d1.set 'foo', 10
    d1.set 'bar', 33

    d2 = Dictionary {name:'Fred', age:4000}

  describe '#get', ->
    it 'should get the value for the given key', ->
      expect(d1.get('foo')).to.be 10
      expect(d1.get('bar')).to.be 33

      expect(d2.get('name')).to.be 'Fred'
      expect(d2.get('age')).to.be 4000

  describe '#set', ->
    it 'should add a new key/value pair to the dictionary', ->
      d1.set 'zzz', 21
      expect(d1.length).to.be 3
      expect(d1.get('zzz')).to.be 21

      d2.set 'kid', 'bambam'
      expect(d2.length).to.be 3
      expect(d2.get('kid')).to.be 'bambam'

    it 'should change the value of an existing key', ->
      d1.set 'foo', 99
      expect(d1.length).to.be 2
      expect(d1.get('foo')).to.be 99

      d2.set 'name', 'Barney'
      expect(d2.length).to.be 2
      expect(d2.get('name')).to.be 'Barney'

  describe 'TypedDictionary#set', ->
    it 'should type check the key', ->
      expect(-> d1.set /foo/, 55).to.throwError (e) ->
        expect(e.message).to.be 'Expected String'
        expect(e).to.be.a TypeError

    it 'should type check the value', ->
      expect(-> d1.set 'yyy', /vvv/).to.throwError (e) ->
        expect(e.message).to.be 'Expected Number'
        expect(e).to.be.a TypeError

    it 'should be able to use objects as keys', ->
      class Foo
      f1 = new Foo
      f2 = new Foo
      f3 = new Foo

      d = TypedDictionary Foo, 'String'
      d.set f1, 'aaa'
      d.set f2, 'bbb'
      d.set f3, 'ccc'

      expect(d.get(f1)).to.be 'aaa'
      expect(d.get(f2)).to.be 'bbb'
      expect(d.get(f3)).to.be 'ccc'




