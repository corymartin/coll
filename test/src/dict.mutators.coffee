
expect = require 'expect.js'

{Map, Dict} = require '../lib/coll'


describe 'Dict / Map Mutators', ->
  map = dict = null
  key1 = /foo/
  key2 = /bar/

  beforeEach ->
    map = Map 'RegExp', 'Number'
    map.set key1, 111
    map.set key2, 222

    dict = Dict {a:1, b:2, c:3}

  describe '#remove', ->
    it 'should remove the key/val for the passed key', ->
      expect(map.hasKey key1).to.be true
      map.remove key1
      expect(map.hasKey key1).to.be false

      expect(dict.hasKey 'b').to.be true
      dict.remove 'b'
      expect(dict.hasKey 'b').to.be false

    it 'should the value of the removed key/val pair', ->
      x = map.remove key1
      expect(x).to.be 111

      x = dict.remove 'b'
      expect(x).to.be 2

    it 'should throw a `ReferenceError` if the key does not exist', ->
      expect(-> map.remove /zzz/).to.throwError (e) ->
        expect(e).to.be.a ReferenceError

      expect(-> dict.remove 'q').to.throwError (e) ->
        expect(e).to.be.a ReferenceError


