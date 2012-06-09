
expect = require 'expect.js'

{TypedDictionary, Dictionary} = require '../lib/coll'


describe 'Dictionary Mutators', ->
  d1 = d2 = null
  key1 = /foo/
  key2 = /bar/

  beforeEach ->
    d1 = TypedDictionary 'RegExp', 'Number'
    d1.set key1, 111
    d1.set key2, 222

    d2 = Dictionary {a:1, b:2, c:3}

  describe '#remove', ->
    it 'should remove the key/val for the passed key', ->
      d1.remove key1
      expect(d1.get key1).to.be undefined

      d2.remove 'b'
      expect(d2.get 'b').to.be undefined

    it 'should `true` if the key/val was successfully removed', ->
      x = d1.remove key1
      expect(x).to.be true

      x = d2.remove 'b'
      expect(x).to.be true

    it 'should `false` if the key/val was not removed', ->
      x = d1.remove /zzz/
      expect(x).to.be false

      x = d2.remove 'q'
      expect(x).to.be false




