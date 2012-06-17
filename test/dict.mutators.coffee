
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

    it 'should `true` if the key/val was successfully removed', ->
      x = map.remove key1
      expect(x).to.be true

      x = dict.remove 'b'
      expect(x).to.be true

    it 'should `false` if the key/val was not removed', ->
      x = map.remove /zzz/
      expect(x).to.be false

      x = dict.remove 'q'
      expect(x).to.be false


